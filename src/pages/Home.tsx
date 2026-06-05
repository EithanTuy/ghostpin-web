import { useState } from "react";
import { Link } from "react-router-dom";

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
    q: "Can I connect over Wi-Fi instead of a cable?",
    a: "Yes. Pair your iPhone over USB once, then GhostPin can control it wirelessly over the same Wi-Fi network — no cable needed after the first setup.",
  },
  {
    q: "Can it route between two addresses?",
    a: "Yes. Type a start and destination, choose walk, cycle, or drive, and GhostPin builds a real route that follows actual roads. Driving routes simulate acceleration, braking, traffic stops, and changing road speeds so the movement looks natural.",
  },
  {
    q: "Do I need iTunes or Xcode installed?",
    a: "No. GhostPin installs all required Apple drivers automatically on first run.",
  },
  {
    q: "Why does GhostPin ask for administrator permission?",
    a: "On iOS 17 and later, Apple requires a privileged tunnel for developer services. GhostPin requests administrator rights once at launch so it can start that tunnel for you automatically.",
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
    q: "How does the free trial work?",
    a: "Every plan starts with a 24-hour free trial through Stripe. You won't be charged during the trial — cancel any time before it ends and you pay nothing. If you don't cancel, your subscription begins automatically and the app keeps working.",
  },
];

function FAQ({ q, a, highlight }: { q: string; a: string; highlight: string }) {
  const [open, setOpen] = useState(false);

  // Auto-expand when there's a search match
  const term = highlight.toLowerCase().trim();
  const matches = term.length > 1 && (
    q.toLowerCase().includes(term) || a.toLowerCase().includes(term)
  );

  // Highlight matching text
  function hl(text: string) {
    if (!term || term.length < 2) return text;
    const idx = text.toLowerCase().indexOf(term);
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark style={{ background: "#fff3b0", borderRadius: 2, padding: "0 1px" }}>
          {text.slice(idx, idx + term.length)}
        </mark>
        {text.slice(idx + term.length)}
      </>
    );
  }

  const isOpen = open || matches;

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
        <span style={{ fontWeight: 600, fontSize: "15px", color: "#111" }}>{hl(q)}</span>
        <span style={{ color: "#888", fontSize: "20px", flexShrink: 0, lineHeight: 1 }}>{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <p style={{ margin: "0 0 18px", fontSize: "14px", lineHeight: 1.7, color: "#555" }}>{hl(a)}</p>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  // plan toggle state (display only on home — actual checkout is on /plans)
  const [plan, setPlan] = useState<"yearly" | "monthly">("yearly");
  const [faqSearch, setFaqSearch] = useState("");

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#111", background: "#fff" }}>

      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #e5e5e5", position: "sticky", top: 0, background: "#fff", zIndex: 100 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 700, fontSize: "17px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: "22px", filter: "drop-shadow(0 0 6px rgba(0,113,227,0.45))" }}>👻</span>
            GhostPin
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href="#features" style={navLink}>Features</a>
            <a href="#pricing" style={navLink}>Pricing</a>
            <a href="#faq" style={navLink}>FAQ</a>
            <Link to="/plans" style={{ ...navLink, fontWeight: 600, color: "#0071e3", textDecoration: "none" }}>Start trial</Link>
          </div>
        </div>
      </nav>

      {/* Windows-only banner */}
      <div style={{ background: "#fffbf0", borderBottom: "1px solid #f0e6c0", padding: "10px 24px", textAlign: "center" }}>
        <p style={{ margin: 0, fontSize: "13px", color: "#7a5c00" }}>
          <strong>Windows only.</strong> GhostPin is a Windows desktop application. macOS builds are available but experimental. &nbsp;
          <Link to="/plans" style={{ color: "#7a5c00", fontWeight: 600 }}>Start trial →</Link>
        </p>
      </div>

      {/* Hero */}
      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "72px 24px 64px" }}>
        <div style={{ fontSize: "72px", lineHeight: 1, marginBottom: 24, filter: "drop-shadow(0 0 24px rgba(0,113,227,0.35))" }}>👻</div>
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
          Works with iPhone and iPad · Developer Mode required · Connect over USB or Wi-Fi
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link to="/plans" style={btnPrimary}>
            Start free trial — $6.60/mo
          </Link>
          <a href="#pricing" style={btnSecondary}>
            See pricing
          </a>
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
            { title: "Address-to-address routing", body: "Type a start and destination, pick walk, cycle, or drive, and GhostPin builds a real route between them that follows actual roads." },
            { title: "Realistic driving", body: "Driving routes simulate acceleration, braking, traffic stops at intersections, and varying road speeds — not a robotic straight line." },
            { title: "Route simulation", body: "Drop waypoints on the map and play the route back at walking, cycling, or driving speed. The path snaps to roads. Pause and resume mid-route." },
            { title: "Connect over USB or Wi-Fi", body: "Plug in over USB, or once paired, control your iPhone wirelessly over the same Wi-Fi network — no cable needed." },
            { title: "GPX import", body: "Import any .gpx file from Google Maps, Strava, or other mapping tools and replay it at any speed." },
            { title: "GPS joystick", body: "Nudge your position 1m, 10m, 100m, or 1km in any direction using the directional pad in the sidebar." },
            { title: "Auto-reset on close", body: "Your real GPS is restored the moment GhostPin closes. No lingering changes to your device." },
            { title: "Auto-updates", body: "New versions download and install in the background. You're always on the latest build." },
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
              { n: "1", title: "Connect via USB", body: "Plug your iPhone into your Windows PC. GhostPin handles Apple drivers automatically on first run. After pairing once, you can switch to Wi-Fi." },
              { n: "2", title: "Enable Developer Mode", body: "Settings → Privacy & Security → Developer Mode. One-time toggle. GhostPin walks you through it if it's off." },
              { n: "3", title: "Trust the computer", body: "Tap Trust on your iPhone when prompted. Done once, remembered forever." },
              { n: "4", title: "Set your location", body: "Click the map to teleport, route between two addresses, or use the joystick to fine-tune your position." },
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

          {/* Search box */}
          <div style={{ position: "relative", marginBottom: 28 }}>
            <span style={{
              position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
              color: "#aaa", fontSize: "15px", pointerEvents: "none",
            }}>🔍</span>
            <input
              type="text"
              placeholder="Search questions…"
              value={faqSearch}
              onChange={e => setFaqSearch(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "11px 16px 11px 36px",
                fontSize: "14px",
                border: "1.5px solid #ddd",
                borderRadius: 8,
                background: "#fff",
                outline: "none",
                color: "#111",
                fontFamily: "inherit",
                transition: "border-color 0.15s",
              }}
              onFocus={e => (e.target.style.borderColor = "#0071e3")}
              onBlur={e => (e.target.style.borderColor = "#ddd")}
            />
            {faqSearch && (
              <button
                onClick={() => setFaqSearch("")}
                style={{
                  position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#aaa", fontSize: "16px", lineHeight: 1, padding: "2px 4px",
                }}
                aria-label="Clear search"
              >×</button>
            )}
          </div>

          {/* Results */}
          {(() => {
            const term = faqSearch.toLowerCase().trim();
            const filtered = term.length < 2
              ? FAQS
              : FAQS.filter(f =>
                  f.q.toLowerCase().includes(term) || f.a.toLowerCase().includes(term)
                );
            return filtered.length > 0
              ? filtered.map((item) => <FAQ key={item.q} {...item} highlight={faqSearch} />)
              : (
                <p style={{ color: "#888", fontSize: "14px", padding: "24px 0" }}>
                  No questions match "{faqSearch}". &nbsp;
                  <button onClick={() => setFaqSearch("")} style={{ background: "none", border: "none", color: "#0071e3", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}>
                    Clear search
                  </button>
                </p>
              );
          })()}
        </div>
      </section>

      {/* Download CTA */}
      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "72px 24px", textAlign: "center" }}>
        <h2 style={{ ...sectionTitle, margin: "0 0 12px" }}>Try it free for 24 hours</h2>
        <p style={{ fontSize: "15px", color: "#555", margin: "0 0 28px" }}>Start your trial, then download and connect your iPhone. Cancel anytime before the trial ends.</p>
        <Link to="/plans" style={btnPrimary}>Start your free trial →</Link>
        <p style={{ marginTop: 16, fontSize: "13px", color: "#999" }}>Windows 10/11 · ~300 MB · Auto-updates · iOS 17+</p>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #e5e5e5", background: "#fafafa", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: "14px" }}>
            <span style={{ fontSize: "20px", filter: "drop-shadow(0 0 5px rgba(0,113,227,0.4))" }}>👻</span>
            GhostPin
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, fontSize: "13px" }}>
            {([ ["Terms of Service", "/terms"], ["Privacy Policy", "/privacy"], ["EULA", "/eula"], ["Refund Policy", "/refund"], ["Start trial", "/plans"], ["Manage subscription", "/account"] ] as [string, string][]).map(([label, href]) => (
              <Link key={label} to={href} style={{ color: "#666", textDecoration: "none" }}>{label}</Link>
            ))}
            <a href="mailto:ghostpinsupport@gmail.com" style={{ color: "#666", textDecoration: "none" }}>Support</a>
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
