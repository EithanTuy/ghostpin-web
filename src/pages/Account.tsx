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
        <h1 className="text-3xl font-bold text-[#1d1d1f] mb-3 text-center">Manage your subscription</h1>
        <p className="text-[#6e6e73] mb-8 text-center">
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
            className="w-full bg-[#e8e8ed] border border-[#d2d2d7] rounded-xl px-4 py-3 text-[#1d1d1f] placeholder-[#86868b] outline-none focus:border-[#0071e3] transition-colors"
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-[#0071e3] text-[#f5f5f7] py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {busy ? "Opening…" : "Open billing portal"}
          </button>
        </form>
        {error && <p className="mt-4 text-sm text-[#ff3b30] text-center">{error}</p>}
        <p className="mt-8 text-center text-xs text-[#86868b]">
          Lost your key? It's tied to your email — confirm your subscription here, then check the original
          license email.
        </p>
      </div>
    </Shell>
  );
}
