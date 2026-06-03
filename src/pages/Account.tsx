import { useState } from "react";
import type { FormEvent } from "react";
import Shell from "@/components/Shell";
import { openBillingPortal } from "@/lib/api";

export default function Account() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await openBillingPortal(email.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <Shell>
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-3 text-center">Manage your subscription</h1>
        <p className="text-[#9aa1b8] mb-8 text-center">
          Enter the email you used at checkout. We'll open Stripe's secure billing portal where you can update
          payment, switch plan, or cancel.
        </p>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-[#212433] border border-[#313547] rounded-xl px-4 py-3 text-white placeholder-[#646b82] outline-none focus:border-[#a78bfa] transition-colors"
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-[#a78bfa] text-[#13151f] py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {busy ? "Opening…" : "Open billing portal"}
          </button>
        </form>
        {error && <p className="mt-4 text-sm text-[#fb7185] text-center">{error}</p>}
        <p className="mt-8 text-center text-xs text-[#646b82]">
          Lost your key? It's tied to your email — confirm your subscription here, then check the original
          license email.
        </p>
      </div>
    </Shell>
  );
}
