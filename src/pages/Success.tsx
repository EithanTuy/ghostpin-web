import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Shell from "@/components/Shell";
import { getCheckoutStatus, DOWNLOAD_URL } from "@/lib/api";

type State = "loading" | "ready" | "pending" | "error";

export default function Success() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id") ?? "";
  const [key, setKey] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [state, setState] = useState<State>(sessionId ? "loading" : "error");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    let tries = 0;
    let timer = 0;
    const poll = async () => {
      try {
        const s = await getCheckoutStatus(sessionId);
        if (cancelled) return;
        if (s.email) setEmail(s.email);
        if (s.key) {
          setKey(s.key);
          setState("ready");
          return;
        }
        tries += 1;
        if (tries > 20) {
          setState("pending");
          return;
        }
        timer = window.setTimeout(poll, 2000);
      } catch {
        if (cancelled) return;
        tries += 1;
        if (tries > 20) {
          setState("error");
          return;
        }
        timer = window.setTimeout(poll, 2000);
      }
    };
    void poll();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [sessionId]);

  const copy = useCallback(() => {
    if (!key) return;
    void navigator.clipboard.writeText(key).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  }, [key]);

  return (
    <Shell>
      <div className="w-full max-w-xl text-center">
        <div className="text-5xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-white mb-3">You're in — thanks for subscribing!</h1>
        <p className="text-[#a6adc8] mb-8">
          {email ? (
            <>
              A copy of your license key is on its way to <span className="text-[#cdd6f4]">{email}</span>.
            </>
          ) : (
            "Your license key has been emailed to you."
          )}
        </p>

        <div className="bg-[#181825] border border-[#313244] rounded-2xl p-6 text-left">
          <div className="text-[10px] tracking-[1.5px] text-[#7f849c] font-bold mb-3">YOUR LICENSE KEY</div>
          {state === "ready" && key ? (
            <>
              <code className="block text-[#89b4fa] font-mono text-sm break-all mb-4">{key}</code>
              <button
                onClick={copy}
                className="bg-[#a6e3a1] text-[#1e1e2e] px-5 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                {copied ? "Copied ✓" : "Copy key"}
              </button>
            </>
          ) : state === "error" ? (
            <p className="text-[#f38ba8] text-sm">
              We couldn't load your key here, but it's been emailed to you — check your inbox (and spam).
            </p>
          ) : state === "pending" ? (
            <p className="text-[#a6adc8] text-sm">
              Your key is being generated and emailed right now — check your inbox in a moment.
            </p>
          ) : (
            <p className="text-[#a6adc8] text-sm animate-pulse">Generating your key…</p>
          )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={DOWNLOAD_URL}
            className="bg-[#a6e3a1] text-[#1e1e2e] px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Download GhostPin
          </a>
          <a
            href="/activate"
            className="border-2 border-[#313244] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#313244] transition-colors"
          >
            How to activate
          </a>
        </div>
      </div>
    </Shell>
  );
}
