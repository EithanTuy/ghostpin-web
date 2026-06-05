import { useEffect } from "react";

// Stripe Buy Button — embeds Stripe-hosted checkout with the built-in free
// trial ("Start trial"). The publishable key is public by design.
const SCRIPT_SRC = "https://js.stripe.com/v3/buy-button.js";
const PUBLISHABLE_KEY =
  "pk_live_51REs3UFEYDd6YWFuULgD9rs2zfJE5yrZ9giBOC0PeZVR4Y3V7rswj4labV0UQGVoxCALI47fO0jc6IhzAdQGJpFc00qltCIivl";

// Buy Button IDs from the Stripe Dashboard.
export const BUY_BUTTON_YEARLY = "buy_btn_1Tf0y3FEYDd6YWFuMUCV90Qe";
export const BUY_BUTTON_MONTHLY = "buy_btn_1Tf0wKFEYDd6YWFuiTvEUH6a";

// React 19 moved the JSX namespace into the "react" module — augment it there
// so <stripe-buy-button> type-checks as a valid custom element.
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-buy-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          "buy-button-id": string;
          "publishable-key": string;
        },
        HTMLElement
      >;
    }
  }
}

export default function StripeBuyButton({ buyButtonId }: { buyButtonId: string }) {
  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    document.head.appendChild(s);
  }, []);

  return (
    <stripe-buy-button
      buy-button-id={buyButtonId}
      publishable-key={PUBLISHABLE_KEY}
    />
  );
}
