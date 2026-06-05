import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  DOWNLOAD_WIN_INSTALLER,
  DOWNLOAD_WIN_PORTABLE,
  DOWNLOAD_MAC_APP,
  DOWNLOAD_MAC_PORTABLE,
  getCheckoutStatus,
} from "@/lib/api";

type Gate = "checking" | "unlocked" | "locked";

// Local fallback so a paid user isn't permanently locked out if the status
// endpoint hiccups: once verified, we remember it for this browser.
const UNLOCK_KEY = "ghostpin_unlocked";

export default function Download() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id") ?? "";
  const [gate, setGate] = useState<Gate>(
    () => (localStorage.getItem(UNLOCK_KEY) === "1" ? "unlocked" : "checking")
  );

  useEffect(() => {
    if (gate === "unlocked") return;          // already unlocked this browser
    if (!sessionId) { setGate("locked"); return; }

    let cancelled = false;
    let tries = 0;
    let timer = 0;
    const poll = async () => {
      try {
        const s = await getCheckoutStatus(sessionId);
        if (cancelled) return;
        if (s.paid) {
          localStorage.setItem(UNLOCK_KEY, "1");
          setGate("unlocked");
          return;
        }
        // Trial/subscription not marked complete yet — retry a few times.
        tries += 1;
        if (tries > 8) { setGate("locked"); return; }
        timer = window.setTimeout(poll, 1500);
      } catch {
        if (cancelled) return;
        tries += 1;
        if (tries > 8) { setGate("locked"); return; }
        timer = window.setTimeout(poll, 1500);
      }
    };
    void poll();
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [sessionId, gate]);

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#111", background: "#fff", minHeight: "100vh" }}>

      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #e5e5e5", position: "sticky", top: 0, background: "#fff", zIndex: 100 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ fontWeight: 700, fontSize: "17px", textDecoration: "none", color: "#111" }}>GhostPin</Link>
          <Link to="/" style={{ fontSize: "14px", color: "#555", textDecoration: "none" }}>← Back to home</Link>
        </div>
      </nav>

      {gate === "checking" && <GateChecking />}
      {gate === "locked" && <GateLocked />}
      {gate === "unlocked" && <DownloadContent />}

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #e5e5e5", background: "#fafafa", padding: "32px 24px" }}>
        <p style={{ maxWidth: 760, margin: "0 auto", fontSize: "12px", color: "#aaa", textAlign: "center" }}>
          © {new Date().getFullYear()} GhostPin · ghostpin.xyz ·{" "}
          <Link to="/terms" style={{ color: "#aaa" }}>Terms</Link> ·{" "}
          <Link to="/privacy" style={{ color: "#aaa" }}>Privacy</Link> ·{" "}
          <Link to="/refund" style={{ color: "#aaa" }}>Refund</Link>
        </p>
      </footer>
    </div>
  );
}

// ─── Gate states ────────────────────────────────────────────────────────────

function GateChecking() {
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "120px 24px", textAlign: "center" }}>
      <p style={{ fontSize: "16px", color: "#555" }}>Verifying your subscription…</p>
    </div>
  );
}

function GateLocked() {
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "96px 24px", textAlign: "center" }}>
      <div style={{ fontSize: "44px", marginBottom: 16 }}>🔒</div>
      <h1 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, margin: "0 0 12px" }}>
        Downloads are for subscribers
      </h1>
      <p style={{ fontSize: "15px", color: "#555", margin: "0 0 28px", lineHeight: 1.6 }}>
        Start your free 24-hour trial to unlock the download. No charge until the
        trial ends — cancel anytime before then.
      </p>
      <Link
        to="/plans"
        style={{
          display: "inline-block",
          background: "#0071e3",
          color: "#fff",
          border: "1px solid #0071e3",
          borderRadius: 7,
          padding: "13px 28px",
          fontSize: "15px",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Start free trial →
      </Link>
      <p style={{ marginTop: 20, fontSize: "13px", color: "#999" }}>
        Already subscribed? Open the link from your confirmation email or{" "}
        <Link to="/account" style={{ color: "#0071e3" }}>manage your subscription</Link>.
      </p>
    </div>
  );
}

// ─── Download content (unlocked) ────────────────────────────────────────────

function DownloadContent() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px 24px 80px" }}>

      <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, margin: "0 0 8px" }}>Download GhostPin</h1>
      <p style={{ fontSize: "16px", color: "#555", margin: "0 0 40px", lineHeight: 1.6 }}>
        Your trial is active. Install GhostPin and activate it with the license key from your email. Requires iOS 17 or later.
      </p>

      {/* Windows — primary */}
      <section style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: "22px" }}></span>
          <h2 style={{ fontSize: "20px", fontWeight: 700, margin: 0 }}>Windows</h2>
          <span style={{ fontSize: "12px", fontWeight: 700, background: "#0071e3", color: "#fff", padding: "2px 8px", borderRadius: 4, marginLeft: 4 }}>Recommended</span>
        </div>

        <p style={{ fontSize: "14px", color: "#555", margin: "0 0 20px", lineHeight: 1.6 }}>
          Windows 10 or 11, 64-bit. GhostPin is built and tested primarily on Windows.
        </p>

        {/* SmartScreen warning */}
        <div style={{ background: "#fff8e1", border: "1px solid #f0d060", borderRadius: 8, padding: "16px 20px", marginBottom: 24 }}>
          <p style={{ margin: "0 0 6px", fontSize: "14px", fontWeight: 700, color: "#7a5c00" }}>
            ⚠️ Windows Defender / SmartScreen warning
          </p>
          <p style={{ margin: 0, fontSize: "13px", color: "#7a5c00", lineHeight: 1.6 }}>
            When you run GhostPin for the first time, Windows may show a blue SmartScreen popup saying
            "Windows protected your PC." This is because the app isn't code-signed yet.
            <br /><br />
            To proceed: click <strong>"More info"</strong> on the SmartScreen dialog, then click <strong>"Run anyway"</strong>.
            This warning only appears on the first launch.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* Installer */}
          <div style={{ border: "1px solid #e5e5e5", borderRadius: 8, padding: "24px" }}>
            <p style={{ fontSize: "14px", fontWeight: 600, margin: "0 0 4px" }}>Setup installer</p>
            <p style={{ fontSize: "13px", color: "#888", margin: "0 0 16px", lineHeight: 1.5 }}>
              Installs to Program Files. Creates a Start Menu shortcut. Easy to uninstall.
            </p>
            <a
              href={DOWNLOAD_WIN_INSTALLER}
              style={{ ...btnPrimary, display: "block", textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}
            >
              Download Setup.exe
            </a>
          </div>

          {/* Portable */}
          <div style={{ border: "1px solid #e5e5e5", borderRadius: 8, padding: "24px" }}>
            <p style={{ fontSize: "14px", fontWeight: 600, margin: "0 0 4px" }}>Portable zip</p>
            <p style={{ fontSize: "13px", color: "#888", margin: "0 0 16px", lineHeight: 1.5 }}>
              No installation needed. Extract anywhere and run GhostPin.exe directly.
            </p>
            <a
              href={DOWNLOAD_WIN_PORTABLE}
              style={{ ...btnSecondary, display: "block", textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}
            >
              Download .zip
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <hr style={{ border: "none", borderTop: "1px solid #e5e5e5", margin: "0 0 40px" }} />

      {/* macOS — secondary */}
      <section style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: "22px" }}></span>
          <h2 style={{ fontSize: "20px", fontWeight: 700, margin: 0 }}>macOS</h2>
          <span style={{ fontSize: "12px", fontWeight: 700, background: "#888", color: "#fff", padding: "2px 8px", borderRadius: 4, marginLeft: 4 }}>Beta</span>
        </div>

        <div style={{ background: "#f6f6f6", border: "1px solid #e5e5e5", borderRadius: 8, padding: "16px 20px", marginBottom: 20 }}>
          <p style={{ margin: 0, fontSize: "13px", color: "#666", lineHeight: 1.6 }}>
            macOS builds are experimental and may lag behind Windows on updates. macOS 11 or later, Apple Silicon and Intel.
            <br /><br />
            <strong>First launch:</strong> Right-click <code style={{ background: "#e5e5e5", padding: "1px 5px", borderRadius: 3 }}>GhostPin.app</code> → Open → click Open again. This bypasses Gatekeeper once because the app isn't notarized.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <a
            href={DOWNLOAD_MAC_APP}
            style={{ ...btnSecondary, display: "block", textAlign: "center", textDecoration: "none", boxSizing: "border-box", padding: "13px 22px" }}
          >
            Download .app
          </a>
          <a
            href={DOWNLOAD_MAC_PORTABLE}
            style={{ ...btnSecondary, display: "block", textAlign: "center", textDecoration: "none", boxSizing: "border-box", padding: "13px 22px" }}
          >
            Download .zip
          </a>
        </div>
      </section>

      {/* Divider */}
      <hr style={{ border: "none", borderTop: "1px solid #e5e5e5", margin: "0 0 40px" }} />

      {/* Requirements */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 16px" }}>System requirements</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#333", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Computer</p>
            <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: "14px", color: "#555", lineHeight: 2 }}>
              <li>Windows 10 or 11 (64-bit)</li>
              <li>~300 MB disk space</li>
              <li>USB port for first pairing (Wi-Fi after)</li>
              <li>Administrator rights (granted at launch)</li>
            </ul>
          </div>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#333", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>iPhone / iPad</p>
            <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: "14px", color: "#555", lineHeight: 2 }}>
              <li>iOS 17 or later</li>
              <li>Developer Mode enabled</li>
              <li>USB cable to pair (then USB or Wi-Fi)</li>
              <li>Trust prompt accepted</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Getting started note */}
      <div style={{ background: "#f0f7ff", border: "1px solid #c0d8f5", borderRadius: 8, padding: "20px 24px" }}>
        <p style={{ margin: "0 0 6px", fontSize: "14px", fontWeight: 700, color: "#0050a0" }}>Getting started</p>
        <ol style={{ margin: 0, padding: "0 0 0 18px", fontSize: "13px", color: "#0050a0", lineHeight: 2 }}>
          <li>Download and run the installer</li>
          <li>Enable Developer Mode on your iPhone (Settings → Privacy &amp; Security → Developer Mode)</li>
          <li>Connect your iPhone with a USB cable</li>
          <li>Tap Trust on your iPhone when prompted</li>
          <li>Activate GhostPin with the license key from your email</li>
        </ol>
      </div>

    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

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
  lineHeight: 1.4,
};
