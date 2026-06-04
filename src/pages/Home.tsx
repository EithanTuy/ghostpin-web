import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { startCheckout, type Plan } from "@/lib/api";

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "Does it need a jailbreak?",
    a: "No. GhostPin uses Apple's official developer protocol over USB — the same channel Xcode uses. No jailbreak, no sideloading.",
  },
  {
    q: "What iOS version is required?",
    a: "iOS 17 or later. Developer Mode must be enabled on the device (Settings → Privacy & Security → Developer Mode).",
  },
  {
    q: "Does it work on iPhone and iPad?",
    a: "Yes, any iPhone or iPad running iOS 17 or later with Developer Mode enabled.",
  },
  {
    q: "Do I need iTunes or Xcode installed?",
    a: "No. GhostPin installs all required Apple drivers automatically on first run.",
  },
  {
    q: "What happens to my GPS when I close the app?",
    a: "Your real GPS is restored automatically the moment GhostPin closes. No permanent changes are made to your device.",
  },
  {
    q: "Windows shows a SmartScreen warning — is that normal?",
    a: "Yes. GhostPin isn't code-signed yet, so Windows shows a one-time warning. Click 'More info' then 'Run anyway'. This only appears on first launch.",
  },
  {
    q: "Is there a macOS version?",
    a: "Yes but it's secondary. The Windows build is the primary supported version. macOS builds are available but may lag behind on updates.",
  },
  {
    q: "What happens after the 24-hour trial ends?",
    a: "The app stops letting you change your GPS location. Your history and settings stay intact. Subscribe to unlock unlimited use.",
  },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #e5e5e5" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "16px",
        }}
      >
        <span style={{ fontWeight: 600, fontSize: "15px", color: "#111" }}>{q}</span>
        <span style={{ color: "#888", fontSize: "20px", flexShrink: 0, lineHeight: 1 }}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <p style={{ margin: "0 0 18px", fontSize: "14px", lineHeight: 1.7, color: "#555" }}>{a}</p>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  // plan toggle state (display only on home — actual checkout is on /plans)
  const [plan, setPlan] = useState<"yearly" | "monthly">("yearly");

  // test purchase only
  const [busy, setBusy] = useState<Plan | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // Reset "Redirecting…" after 5 s in case navigation stalls
  useEffect(() => {
    if (!busy) return;
    const t = setTimeout(() => setBusy(null), 5000);
    return () => clearTimeout(t);
  }, [busy]);

  async function buy(p: Plan) {
    setErr(null);
    setBusy(p);
    try {
      await startCheckout(p);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
      setBusy(null);
    }
  }

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#111", background: "#fff" }}>

      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #e5e5e5", position: "sticky", top: 0, background: "#fff", zIndex: 100 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 700, fontSize: "17px" }}>GhostPin</div>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href="#features" style={navLink}>Features</a>
            <a href="#pricing" style={navLink}>Pricing</a>
            <a href="#faq" style={navLink}>FAQ</a>
            <Link to="/download" style={{ ...navLink, fontWeight: 600, color: "#0071e3", textDecoration: "none" }}>Download</Link>
          </div>
        </div>
      </nav>

      {/* Windows-only banner */}
      <div style={{ background: "#fffbf0", borderBottom: "1px solid #f0e6c0", padding: "10px 24px", textAlign: "center" }}>
        <p style={{ margin: 0, fontSize: "13px", color: "#7a5c00" }}>
          <strong>Windows only.</strong> GhostPin is a Windows desktop application. macOS builds are available but experimental. &nbsp;
          <Link to="/download" style={{ color: "#7a5c00", fontWeight: 600 }}>Download →</Link>
        </p>
      </div>

      {/* Hero */}
      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "72px 24px 64px" }}>
        <p style={{ fontSize: "13px", fontWeight: 600, color: "#0071e3", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          iPhone GPS simulator for Windows
        </p>
        <h1 style={{ fontSize: "clamp(34px, 5.5vw, 58px)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 20px", maxWidth: 620 }}>
          Fake your iPhone's location from your PC.
        </h1>
        <p style={{ fontSize: "17px", lineHeight: 1.65, color: "#555", maxWidth: 500, margin: "0 0 12px" }}>
          Click anywhere on the map and your iPhone's GPS updates instantly. Requires iOS 17 or later. No jailbreak.
        </p>
        <p style={{ fontSize: "14px", color: "#888", margin: "0 0 32px" }}>
          Works with iPhone and iPad · Developer Mode required · USB connection
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link to="/plans" style={btnPrimary}>
            Get started — $6.60/mo
          </Link>
          <Link to="/download" style={btnSecondary}>
            Free 24-hour trial
          </Link>
        </div>
        <p style={{ marginTop: 14, fontSize: "13px", color: "#999" }}>
          $79.99/year · 24-hour free trial · no account needed · cancel anytime
        </p>
      </section>

      {/* Screenshot */}
      <div style={{ background: "#f6f6f6", borderTop: "1px solid #e5e5e5", borderBottom: "1px solid #e5e5e5", padding: "40px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", borderRadius: 8, overflow: "hidden", border: "1px solid #ddd", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <img src="/screenshot.webp" alt="GhostPin app" style={{ width: "100%", display: "block" }} />
        </div>
      </div>

      {/* Features */}
      <section id="features" style={{ maxWidth: 1080, margin: "0 auto", padding: "72px 24px" }}>
        <h2 style={sectionTitle}>Features</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {[
            { title: "Click-to-teleport", body: "Click anywhere on the map and your iPhone's GPS updates in real time. Every app on your phone sees the new location immediately." },
            { title: "Route simulation", body: "Draw a multi-point route and play it back at walking, cycling, or driving speed. Pause and resume mid-route." },
            { title: "GPX import", body: "Import any .gpx file from Google Maps, Strava, or other mapping tools and replay it at any speed." },
            { title: "GPS joystick", body: "Nudge your position 1m, 10m, 100m, or 1km in any direction using the directional pad in the sidebar." },
            { title: "Auto-reset on close", body: "Your real GPS is restored the moment GhostPin closes. No lingering changes to your device." },
            { title: "Auto-updates", body: "New versions download and install silently. You're always on the latest build." },
          ].map(({ title, body }) => (
            <div key={title} style={{ border: "1px solid #e5e5e5", borderRadius: 8, padding: "24px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 600, margin: "0 0 8px" }}>{title}</h3>
              <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#555", margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: "#f6f6f6", borderTop: "1px solid #e5e5e5", borderBottom: "1px solid #e5e5e5" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "72px 24px" }}>
          <h2 style={sectionTitle}>How it works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
            {[
              { n: "1", title: "Connect via USB", body: "Plug your iPhone into your Windows PC. GhostPin handles Apple drivers automatically on first run." },
              { n: "2", title: "Enable Developer Mode", body: "Settings → Privacy & Security → Developer Mode. One-time toggle. Requires iOS 17+." },
              { n: "3", title: "Trust the computer", body: "Tap Trust on your iPhone when prompted. Done once, remembered forever." },
              { n: "4", title: "Click the map", body: "Your iPhone is wherever you click. Use route mode or the joystick for movement." },
            ].map(({ n, title, body }) => (
              <div key={n} style={{ padding: "24px", background: "#fff", border: "1px solid #e5e5e5", borderRadius: 8 }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#0071e3", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Step {n}</div>
                <h3 style={{ fontSize: "15px", fontWeight: 600, margin: "0 0 8px" }}>{title}</h3>
                <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#555", margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ maxWidth: 1080, margin: "0 auto", padding: "72px 24px", textAlign: "center" }}>
        <h2 style={sectionTitle}>Pricing</h2>
        <p style={{ fontSize: "15px", color: "#555", margin: "-8px 0 32px" }}>
          24-hour free trial included. No account needed to try.
        </p>

        {/* Plan toggle */}
        <div style={{ display: "inline-flex", border: "1px solid #e5e5e5", borderRadius: 8, overflow: "hidden", marginBottom: 28 }}>
          <button
            onClick={() => setPlan("yearly")}
            style={{
              padding: "9px 20px",
              fontSize: "14px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              background: plan === "yearly" ? "#0071e3" : "#fff",
              color: plan === "yearly" ? "#fff" : "#555",
            }}
          >
            Yearly
          </button>
          <button
            onClick={() => setPlan("monthly")}
            style={{
              padding: "9px 20px",
              fontSize: "14px",
              fontWeight: 600,
              border: "none",
              borderLeft: "1px solid #e5e5e5",
              cursor: "pointer",
              background: plan === "monthly" ? "#0071e3" : "#fff",
              color: plan === "monthly" ? "#fff" : "#555",
            }}
          >
            Monthly
          </button>
        </div>

        <div style={{ maxWidth: 340, margin: "0 auto", textAlign: "left" }}>
          {plan === "yearly" ? (
            <div style={{ border: "2px solid #0071e3", borderRadius: 8, padding: "28px", position: "relative" }}>
              <span style={{ position: "absolute", top: 16, right: 16, background: "#0071e3", color: "#fff", fontSize: "11px", fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>
                Best value
              </span>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#666", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Annual plan</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "0 0 2px" }}>
                <span style={{ fontSize: "38px", fontWeight: 700, lineHeight: 1 }}>$6.60</span>
                <span style={{ fontSize: "14px", color: "#888" }}>/mo</span>
              </div>
              <p style={{ fontSize: "13px", color: "#888", margin: "0 0 4px" }}>$79.99 billed once per year</p>
              <p style={{ fontSize: "12px", color: "#aaa", margin: "0 0 28px" }}>Save 17% vs monthly</p>
              <Link to="/plans?plan=yearly" style={{ ...btnPrimaryBlock, display: "block", textDecoration: "none", textAlign: "center" }}>
                Get started
              </Link>
            </div>
          ) : (
            <div style={{ border: "1px solid #e5e5e5", borderRadius: 8, padding: "28px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#666", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Monthly plan</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "0 0 2px" }}>
                <span style={{ fontSize: "38px", fontWeight: 700, lineHeight: 1 }}>$7.99</span>
                <span style={{ fontSize: "14px", color: "#888" }}>/mo</span>
              </div>
              <p style={{ fontSize: "13px", color: "#888", margin: "0 0 4px" }}>Billed monthly</p>
              <p style={{ fontSize: "12px", color: "#aaa", margin: "0 0 28px" }}>Cancel anytime</p>
              <Link to="/plans?plan=monthly" style={{ ...btnSecondaryBlock, display: "block", textDecoration: "none", textAlign: "center" }}>
                Get started
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background: "#f6f6f6", borderTop: "1px solid #e5e5e5", borderBottom: "1px solid #e5e5e5" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "72px 24px" }}>
          <h2 style={sectionTitle}>Common questions</h2>
          {FAQS.map((item) => <FAQ key={item.q} {...item} />)}
        </div>
      </section>

      {/* Download CTA */}
      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "72px 24px", textAlign: "center" }}>
        <h2 style={{ ...sectionTitle, margin: "0 0 12px" }}>Try it free for 24 hours</h2>
        <p style={{ fontSize: "15px", color: "#555", margin: "0 0 28px" }}>No account required. Just download, connect your iPhone, and go.</p>
        <Link to="/download" style={btnPrimary}>Go to download page →</Link>
        <p style={{ marginTop: 16, fontSize: "13px", color: "#999" }}>Windows 10/11 · ~300 MB · Auto-updates · iOS 17+</p>
      </section>

      {/* Test purchase */}
      <section style={{ borderTop: "1px solid #e5e5e5", padding: "32px 24px" }}>
        <div style={{ maxWidth: 320, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "11px", color: "#bbb", fontFamily: "monospace", marginBottom: 12 }}>— dev / test —</p>
          <button
            onClick={() => buy("test")}
            disabled={busy !== null}
            style={{ ...btnSecondaryBlock, opacity: busy !== null ? 0.6 : 1 }}
          >
            {busy === "test" ? "Redirecting…" : "Test purchase — $1"}
          </button>
          <p style={{ marginTop: 8, fontSize: "12px", color: "#bbb" }}>Stripe test card 4242 4242 4242 4242</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #e5e5e5", background: "#fafafa", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <p style={{ fontSize: "14px", fontWeight: 700, margin: 0 }}>GhostPin</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, fontSize: "13px" }}>
            {([ ["Terms of Service", "/terms"], ["Privacy Policy", "/privacy"], ["EULA", "/eula"], ["Refund Policy", "/refund"], ["Download", "/download"], ["Manage subscription", "/account"] ] as [string, string][]).map(([label, href]) => (
              <Link key={label} to={href} style={{ color: "#666", textDecoration: "none" }}>{label}</Link>
            ))}
          </div>
        </div>
        <p style={{ maxWidth: 1080, margin: "16px auto 0", fontSize: "12px", color: "#aaa" }}>
          © {new Date().getFullYear()} GhostPin. All rights reserved. · ghostpin.xyz
        </p>
      </footer>

    </div>
  );
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const sectionTitle: React.CSSProperties = {
  fontSize: "clamp(22px, 3vw, 28px)",
  fontWeight: 700,
  margin: "0 0 24px",
};

const navLink: React.CSSProperties = {
  fontSize: "14px",
  color: "#555",
  textDecoration: "none",
};

const btnPrimary: React.CSSProperties = {
  background: "#0071e3",
  color: "#fff",
  border: "1px solid #0071e3",
  borderRadius: 7,
  padding: "11px 22px",
  fontSize: "15px",
  fontWeight: 600,
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
  lineHeight: 1.4,
};

const btnSecondary: React.CSSProperties = {
  background: "#fff",
  color: "#111",
  border: "1px solid #d0d0d0",
  borderRadius: 7,
  padding: "11px 22px",
  fontSize: "15px",
  fontWeight: 600,
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
  lineHeight: 1.4,
};

const btnPrimaryBlock: React.CSSProperties = {
  ...btnPrimary,
  width: "100%",
  textAlign: "center",
  boxSizing: "border-box",
};

const btnSecondaryBlock: React.CSSProperties = {
  ...btnSecondary,
  width: "100%",
  textAlign: "center",
  boxSizing: "border-box",
};
