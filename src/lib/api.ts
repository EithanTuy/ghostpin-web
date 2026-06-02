// Calls to the GhostPin licensing/Stripe backend (Vercel project: ghostpin-backend).
// Base URL is configurable so previews can point at a different backend.
const API_BASE = (import.meta.env.VITE_API_BASE ?? "https://ghostpin-backend.vercel.app").replace(/\/+$/, "");

// Where the "Download" buttons point. Set VITE_DOWNLOAD_URL to your GitHub
// Releases "latest" link or a hosted Setup.exe.
export const DOWNLOAD_URL: string =
  import.meta.env.VITE_DOWNLOAD_URL ?? "https://github.com/ghostpin/ghostpin/releases/latest";

export type Plan = "monthly" | "yearly";

export interface CheckoutStatus {
  paid: boolean;
  email: string | null;
  key: string | null;
  pending: boolean;
}

async function parse(res: Response): Promise<Record<string, unknown>> {
  try {
    return (await res.json()) as Record<string, unknown>;
  } catch {
    return {};
  }
}

/** Create a Checkout Session for the chosen plan and redirect to Stripe. */
export async function startCheckout(plan: Plan): Promise<void> {
  const res = await fetch(`${API_BASE}/api/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan }),
  });
  const data = await parse(res);
  const url = data.url as string | undefined;
  if (!res.ok || !url) {
    throw new Error((data.error as string) || "Couldn't start checkout. Please try again.");
  }
  window.location.href = url;
}

/** Poll a completed checkout for its license key (to show on the success page). */
export async function getCheckoutStatus(sessionId: string): Promise<CheckoutStatus> {
  const res = await fetch(`${API_BASE}/api/checkout-status?session_id=${encodeURIComponent(sessionId)}`);
  const data = await parse(res);
  if (!res.ok) throw new Error((data.error as string) || "Couldn't check your order status.");
  return {
    paid: Boolean(data.paid),
    email: (data.email as string) ?? null,
    key: (data.key as string) ?? null,
    pending: Boolean(data.pending),
  };
}

/** Open Stripe's billing portal for the customer with this email. */
export async function openBillingPortal(email: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/create-portal-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await parse(res);
  const url = data.url as string | undefined;
  if (!res.ok || !url) throw new Error((data.error as string) || "Couldn't open the billing portal.");
  window.location.href = url;
}
