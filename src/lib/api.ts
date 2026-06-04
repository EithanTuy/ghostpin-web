// Calls to the GhostPin licensing/Stripe backend (Vercel project: ghostpin-backend).
// Base URL is configurable so previews can point at a different backend.
const API_BASE = (import.meta.env.VITE_API_BASE ?? "https://ghostpin-backend.vercel.app").replace(/\/+$/, "");

// Download URLs route through the Vercel backend proxy so the GitHub repo can
// stay private. The proxy uses GITHUB_TOKEN server-side to get a signed S3 URL
// and redirects the browser there — no GitHub auth required by the end user.
const _DL = `${API_BASE}/api/download`;

export const DOWNLOAD_WIN_INSTALLER: string =
  import.meta.env.VITE_DOWNLOAD_WIN_INSTALLER ?? `${_DL}?platform=windows&type=installer`;

export const DOWNLOAD_WIN_PORTABLE: string =
  import.meta.env.VITE_DOWNLOAD_WIN_PORTABLE ?? `${_DL}?platform=windows&type=portable`;

export const DOWNLOAD_MAC_APP: string =
  import.meta.env.VITE_DOWNLOAD_MAC_APP ?? `${_DL}?platform=macos&type=app`;

export const DOWNLOAD_MAC_PORTABLE: string =
  import.meta.env.VITE_DOWNLOAD_MAC_PORTABLE ?? `${_DL}?platform=macos&type=portable`;

// Back-compat aliases used elsewhere in the site.
export const DOWNLOAD_URL     = DOWNLOAD_WIN_INSTALLER;
export const DOWNLOAD_URL_MAC = DOWNLOAD_MAC_APP;

export type Plan = "monthly" | "yearly" | "test";

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
