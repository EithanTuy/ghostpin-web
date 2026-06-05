import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import StripeBuyButton, {
  BUY_BUTTON_YEARLY,
  BUY_BUTTON_MONTHLY,
} from "@/components/StripeBuyButton";

export default function Plans() {
  const [params] = useSearchParams();
  const [tab, setTab] = useState<"yearly" | "monthly">(
    params.get("plan") === "monthly" ? "monthly" : "yearly"
  );

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#111", background: "#fff", minHeight: "100vh" }}>

      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #e5e5e5", position: "sticky", top: 0, background: "#fff", zIndex: 100 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ fontWeight: 700, fontSize: "17px", textDecoration: "none", color: "#111" }}>GhostPin</Link>
          <Link to="/" style={{ fontSize: "14px", color: "#555", textDecoration: "none" }}>← Back</Link>
        </div>
      </nav>

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "64px 24px 80px", textAlign: "center" }}>

        <h1 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, margin: "0 0 8px" }}>Start your free trial</h1>
        <p style={{ fontSize: "15px", color: "#555", margin: "0 0 36px", lineHeight: 1.6 }}>
          24-hour free trial included. Cancel anytime before it ends and you won't be charged.
        </p>

        {/* Tab toggle */}
        <div style={{ display: "inline-flex", border: "1px solid #e5e5e5", borderRadius: 8, overflow: "hidden", marginBottom: 28 }}>
          <button
            onClick={() => setTab("yearly")}
            style={{
              padding: "9px 28px",
              fontSize: "14px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              background: tab === "yearly" ? "#0071e3" : "#fff",
              color: tab === "yearly" ? "#fff" : "#555",
            }}
          >
            Yearly
          </button>
          <button
            onClick={() => setTab("monthly")}
            style={{
              padding: "9px 28px",
              fontSize: "14px",
              fontWeight: 600,
              border: "none",
              borderLeft: "1px solid #e5e5e5",
              cursor: "pointer",
              background: tab === "monthly" ? "#0071e3" : "#fff",
              color: tab === "monthly" ? "#fff" : "#555",
            }}
          >
            Monthly
          </button>
        </div>

        {/* Yearly card */}
        {tab === "yearly" && (
          <div style={{ border: "2px solid #0071e3", borderRadius: 10, padding: "32px 28px", textAlign: "left", position: "relative" }}>
            <span style={{ position: "absolute", top: 16, right: 16, background: "#0071e3", color: "#fff", fontSize: "11px", fontWeight: 700, padding: "3px 9px", borderRadius: 4 }}>
              Best value
            </span>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#666", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Annual plan</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "0 0 4px" }}>
              <span style={{ fontSize: "44px", fontWeight: 700, lineHeight: 1 }}>$6.60</span>
              <span style={{ fontSize: "15px", color: "#888" }}>/mo</span>
            </div>
            <p style={{ fontSize: "13px", color: "#888", margin: "0 0 4px" }}>$79.99 billed once per year</p>
            <p style={{ fontSize: "12px", color: "#aaa", margin: "0 0 28px" }}>Save 17% compared to monthly</p>
            <ul style={{ margin: "0 0 28px", padding: "0 0 0 18px", fontSize: "14px", color: "#444", lineHeight: 2.0 }}>
              <li>24-hour free trial</li>
              <li>Unlimited location changes</li>
              <li>Up to 2 devices</li>
              <li>All future updates</li>
              <li>Cancel anytime</li>
            </ul>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <StripeBuyButton buyButtonId={BUY_BUTTON_YEARLY} />
            </div>
          </div>
        )}

        {/* Monthly card */}
        {tab === "monthly" && (
          <div style={{ border: "1px solid #e5e5e5", borderRadius: 10, padding: "32px 28px", textAlign: "left" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#666", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Monthly plan</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "0 0 4px" }}>
              <span style={{ fontSize: "44px", fontWeight: 700, lineHeight: 1 }}>$7.99</span>
              <span style={{ fontSize: "15px", color: "#888" }}>/mo</span>
            </div>
            <p style={{ fontSize: "13px", color: "#888", margin: "0 0 4px" }}>Billed monthly</p>
            <p style={{ fontSize: "12px", color: "#aaa", margin: "0 0 28px" }}>Cancel anytime</p>
            <ul style={{ margin: "0 0 28px", padding: "0 0 0 18px", fontSize: "14px", color: "#444", lineHeight: 2.0 }}>
              <li>24-hour free trial</li>
              <li>Unlimited location changes</li>
              <li>Up to 2 devices</li>
              <li>All future updates</li>
              <li>Cancel anytime</li>
            </ul>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <StripeBuyButton buyButtonId={BUY_BUTTON_MONTHLY} />
            </div>
          </div>
        )}

        <p style={{ marginTop: 20, fontSize: "13px", color: "#999" }}>
          Secure checkout via Stripe · After you start your trial you'll get your license key by email and a download link
        </p>

      </div>

      <footer style={{ borderTop: "1px solid #e5e5e5", background: "#fafafa", padding: "28px 24px" }}>
        <p style={{ maxWidth: 480, margin: "0 auto", fontSize: "12px", color: "#aaa", textAlign: "center" }}>
          © {new Date().getFullYear()} GhostPin ·{" "}
          <Link to="/terms" style={{ color: "#aaa" }}>Terms</Link> ·{" "}
          <Link to="/privacy" style={{ color: "#aaa" }}>Privacy</Link> ·{" "}
          <Link to="/refund" style={{ color: "#aaa" }}>Refunds</Link>
        </p>
      </footer>

    </div>
  );
}
