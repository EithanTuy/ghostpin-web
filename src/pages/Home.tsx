import { useState } from "react";
import { Link } from "react-router-dom";
import {
  startCheckout,
  DOWNLOAD_WIN_INSTALLER,
  DOWNLOAD_WIN_PORTABLE,
  DOWNLOAD_MAC_APP,
  DOWNLOAD_MAC_PORTABLE,
  type Plan,
} from "@/lib/api";

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "Does it need a jailbreak?",
    a: "No. GhostPin uses Apple's official developer protocol over USB — the same channel Xcode uses. No jailbreak, no sideloading.",
  },
  {
    q: "Does it work on iOS 17 and later?",
    a: "Yes. The app automatically handles the tunnel daemon on iOS 17+ and prompts for admin permission once. No manual setup needed.",
  },
  {
    q: "What devices are supported?",
    a: "Any iPhone or iPad running iOS 15 or later with Developer Mode enabled (Settings → Privacy & Security → Developer Mode).",
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
    q: "Windows shows an 'Unknown publisher' warning.",
    a: "Normal. Click 'More info' then 'Run anyway'. This shows because the build isn't code-signed yet. One-time only.",
  },
  {
    q: "macOS says the developer can't be verified.",
    a: "Right-click GhostPin.app, choose Open, then click Open again. One-time override because the build is unsigned.",
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
  const [busy, setBusy] = useState<Plan | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function buy(plan: Plan) {
    setErr(null);
    setBusy(plan);
    try {
      await startCheckout(plan);
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
          <div style={{ fontWeight: 700, fontSize: "17px" }}>👻 GhostPin</div>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href="#features" style={navLink}>Features</a>
            <a href="#pricing" style={navLink}>Pricing</a>
            <a href="#faq" style={navLink}>FAQ</a>
            <a href="#download" style={navLink}>Download</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "80px 24px 72px" }}>
        <p style={{ fontSize: "13px", fontWeight: 600, color: "#0071e3", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          iPhone GPS simulator — Windows &amp; Mac
        </p>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 20px", maxWidth: 640 }}>
          Fake your iPhone's location from your desktop.
        </h1>
        <p style={{ fontSize: "18px", lineHeight: 1.6, color: "#555", maxWidth: 520, margin: "0 0 36px" }}>
          Click anywhere on the map and your iPhone's GPS updates instantly. Works on iOS 15–18. No jailbreak required.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button
            onClick={() => buy("monthly")}
            disabled={busy !== null}
            style={{ ...btnPrimary, opacity: busy !== null ? 0.6 : 1 }}
          >
            {busy === "monthly" ? "Redirecting…" : "Get started — $7.99/mo"}
          </button>
          <a href="#download" style={btnSecondary}>
            Download free trial
          </a>
        </div>
        {err && <p style={{ marginTop: 12, fontSize: "14px", color: "#c00" }}>{err}</p>}
        <p style={{ marginTop: 14, fontSize: "13px", color: "#999" }}>
          10-minute free trial · no account needed · cancel anytime
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
            { title: "Auto-reset", body: "Your real GPS is restored the moment GhostPin closes. No lingering changes to your device." },
            { title: "iOS 17+ support", body: "The tunnel daemon launches automatically. No manual setup, no command line. Plug in and go." },
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
              { n: "1", title: "Connect via USB", body: "Plug your iPhone into your PC or Mac. GhostPin handles drivers automatically on Windows." },
              { n: "2", title: "Enable Developer Mode", body: "Settings → Privacy & Security → Developer Mode. One-time toggle, takes 30 seconds." },
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
      <section id="pricing" style={{ maxWidth: 1080, margin: "0 auto", padding: "72px 24px" }}>
        <h2 style={sectionTitle}>Pricing</h2>
        <p style={{ fontSize: "15px", color: "#555", margin: "-8px 0 36px" }}>10-minute free trial included. No account needed to try.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, maxWidth: 640 }}>
          {/* Monthly */}
          <div style={{ border: "1px solid #e5e5e5", borderRadius: 8, padding: "28px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#666", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Monthly</p>
            <p style={{ fontSize: "38px", fontWeight: 700, margin: "0 0 4px", lineHeight: 1 }}>$7.99</p>
            <p style={{ fontSize: "13px", color: "#888", margin: "0 0 28px" }}>per month · cancel anytime</p>
            <button
              onClick={() => buy("monthly")}
              disabled={busy !== null}
              style={{ ...btnSecondaryBlock, opacity: busy !== null ? 0.6 : 1 }}
            >
              {busy === "monthly" ? "Redirecting…" : "Get started"}
            </button>
          </div>
          {/* Annual */}
          <div style={{ border: "2px solid #0071e3", borderRadius: 8, padding: "28px", position: "relative" }}>
            <span style={{ position: "absolute", top: 16, right: 16, background: "#0071e3", color: "#fff", fontSize: "11px", fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>
              Save 17%
            </span>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#666", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Annual</p>
            <p style={{ fontSize: "38px", fontWeight: 700, margin: "0 0 4px", lineHeight: 1 }}>$79.99</p>
            <p style={{ fontSize: "13px", color: "#888", margin: "0 0 28px" }}>per year · $6.67/mo</p>
            <button
              onClick={() => buy("yearly")}
              disabled={busy !== null}
              style={{ ...btnPrimaryBlock, opacity: busy !== null ? 0.6 : 1 }}
            >
              {busy === "yearly" ? "Redirecting…" : "Get started"}
            </button>
          </div>
        </div>
        {err && <p style={{ marginTop: 16, fontSize: "14px", color: "#c00" }}>{err}</p>}
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background: "#f6f6f6", borderTop: "1px solid #e5e5e5", borderBottom: "1px solid #e5e5e5" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "72px 24px" }}>
          <h2 style={sectionTitle}>Common questions</h2>
          {FAQS.map((item) => <FAQ key={item.q} {...item} />)}
        </div>
      </section>

      {/* Download */}
      <section id="download" style={{ maxWidth: 1080, margin: "0 auto", padding: "72px 24px" }}>
        <h2 style={sectionTitle}>Download</h2>
        <p style={{ fontSize: "15px", color: "#555", margin: "-8px 0 36px" }}>Free to try for 10 minutes. No account or card required.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, maxWidth: 640 }}>
          {/* Windows */}
          <div style={{ border: "1px solid #e5e5e5", borderRadius: 8, padding: "28px" }}>
            <p style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 4px" }}>🪟 Windows</p>
            <p style={{ fontSize: "13px", color: "#888", margin: "0 0 20px" }}>Windows 10 / 11 · 64-bit</p>
            <a href={DOWNLOAD_WIN_INSTALLER} style={{ ...btnPrimaryBlock, display: "block", textAlign: "center", textDecoration: "none", marginBottom: 10, boxSizing: "border-box" }}>
              Download Setup.exe
            </a>
            <a href={DOWNLOAD_WIN_PORTABLE} style={{ ...btnSecondaryBlock, display: "block", textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}>
              Portable .zip
            </a>
          </div>
          {/* macOS */}
          <div style={{ border: "1px solid #e5e5e5", borderRadius: 8, padding: "28px" }}>
            <p style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 4px" }}>🍎 macOS</p>
            <p style={{ fontSize: "13px", color: "#888", margin: "0 0 20px" }}>macOS 11+ · Apple Silicon &amp; Intel</p>
            <a href={DOWNLOAD_MAC_APP} style={{ ...btnPrimaryBlock, display: "block", textAlign: "center", textDecoration: "none", marginBottom: 10, boxSizing: "border-box" }}>
              Download .app
            </a>
            <a href={DOWNLOAD_MAC_PORTABLE} style={{ ...btnSecondaryBlock, display: "block", textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}>
              Portable .zip
            </a>
          </div>
        </div>
        <p style={{ marginTop: 20, fontSize: "13px", color: "#999" }}>~300 MB · Auto-updates included · v1.2.1</p>
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
          <p style={{ fontSize: "14px", fontWeight: 700, margin: 0 }}>👻 GhostPin</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, fontSize: "13px" }}>
            {([ ["Terms of Service", "/terms"], ["Privacy Policy", "/privacy"], ["EULA", "/eula"], ["Refund Policy", "/refund"], ["Manage subscription", "/account"] ] as [string, string][]).map(([label, href]) => (
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
