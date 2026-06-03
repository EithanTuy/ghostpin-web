import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin, Route, FileInput, RefreshCw,
  Plug, Shield, Zap, Download, ChevronDown, ChevronUp,
} from "lucide-react";
import {
  startCheckout,
  DOWNLOAD_URL, DOWNLOAD_URL_MAC,
  DOWNLOAD_WIN_INSTALLER, DOWNLOAD_WIN_PORTABLE,
  DOWNLOAD_MAC_APP, DOWNLOAD_MAC_PORTABLE,
  type Plan,
} from "@/lib/api";

// ─── Apple light palette ─────────────────────────────────────────────────────
const C = {
  base:     "#f5f5f7",
  mantle:   "#ffffff",
  crust:    "#ffffff",
  surface0: "#e8e8ed",
  surface1: "#d2d2d7",
  overlay0: "#86868b",
  subtext0: "#6e6e73",
  text:     "#1d1d1f",
  green:    "#0071e3",   // primary accent — violet
  blue:     "#0071e3",   // cyan
  mauve:    "#5e5ce6",   // orchid
  pink:     "#ff3b30",   // rose (errors)
  peach:    "#ff9500",   // amber
  yellow:   "#ff9500",
};

// (Apple light theme — solid colors, no gradients)

// ─── Fade-up animation variant ───────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  { q: "Does it need a jailbreak?", a: "No. GhostPin uses Apple's official developer protocol over USB — the same channel Xcode uses. No jailbreak, no sideloading." },
  { q: "Does it work on iOS 17 and later?", a: "Yes. The app automatically launches the required tunnel daemon on iOS 17+ and prompts for admin permission once. No manual setup." },
  { q: "What iPhones and iPads does it support?", a: "Any iPhone or iPad running iOS 15 or later with Developer Mode enabled (Settings → Privacy & Security → Developer Mode)." },
  { q: "Do I need iTunes installed?", a: "GhostPin installs everything it needs automatically on first run. No separate Apple software required beforehand." },
  { q: "What happens to my GPS when I close the app?", a: "Your real GPS is restored automatically the moment GhostPin closes. No permanent changes are made to the device." },
  { q: "Windows shows an 'Unknown publisher' warning — is that normal?", a: "Yes. GhostPin isn't code-signed yet, so Windows SmartScreen shows a one-time warning. Click 'More info' then 'Run anyway'. This prompt only appears on first launch." },
  { q: "macOS says GhostPin can't be opened because the developer can't be verified.", a: "Right-click (or Control-click) GhostPin.app and choose 'Open', then click 'Open' in the dialog. This one-time override is needed because the build is unsigned. After that, it opens normally." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b last:border-0"
      style={{ borderColor: C.surface0 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="font-semibold" style={{ color: C.text }}>{q}</span>
        {open
          ? <ChevronUp size={16} style={{ color: C.subtext0, flexShrink: 0 }} />
          : <ChevronDown size={16} style={{ color: C.subtext0, flexShrink: 0 }} />
        }
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed" style={{ color: C.subtext0 }}>{a}</p>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [busy, setBusy] = useState<Plan | null>(null);
  const [err,  setErr]  = useState<string | null>(null);

  async function buy(plan: Plan) {
    setErr(null); setBusy(plan);
    try { await startCheckout(plan); }
    catch (e) { setErr(e instanceof Error ? e.message : "Something went wrong."); setBusy(null); }
  }

  return (
    <div className="min-h-screen font-sans" style={{ background: C.base, color: C.text }}>

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{ background: `${C.base}e6`, borderColor: C.surface0 }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-extrabold text-lg tracking-tight" style={{ color: C.text }}>
            <span>👻</span><span>GhostPin</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: C.subtext0 }}>
            {[["#features","Features"],["#how","How it works"],["#pricing","Pricing"],["#faq","FAQ"]].map(([href,label]) => (
              <a key={href} href={href} className="hover:text-[#1d1d1f] transition-colors">{label}</a>
            ))}
          </div>

          <a
            href={DOWNLOAD_URL}
            className="hidden md:flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            style={{ background: C.surface0, color: C.text }}
          >
            <Download size={14} /> Download
          </a>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-32 px-6">
        {/* hero — clean, no glow (Apple) */}

        <motion.div
          className="relative max-w-4xl mx-auto text-center"
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
        >
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.08]"
            style={{ color: C.text }}
          >
            Fake your iPhone's
            <br />
            <span style={{ color: C.green }}>GPS location.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed"
            style={{ color: C.subtext0 }}
          >
            Click anywhere on the map — your iPhone teleports there instantly.
            Route simulation, GPX import, and auto-reset included.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => buy("monthly")}
              disabled={busy !== null}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
              style={{ background: C.green, color: C.crust }}
            >
              {busy === "monthly" ? "Redirecting…" : "Start for $7.99 / month"}
            </button>
            <a
              href={DOWNLOAD_URL}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-base border transition-colors hover:border-black/15"
              style={{ borderColor: C.surface1, color: C.subtext0 }}
            >
              Free trial — try free
            </a>
          </motion.div>

          {err && <p className="mt-3 text-sm" style={{ color: C.pink }}>{err}</p>}
          <p className="mt-3 text-xs" style={{ color: C.overlay0 }}>or $79.99 / year · save 17%</p>
        </motion.div>

        {/* screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }} viewport={{ once: true }}
          className="mt-16 max-w-5xl mx-auto rounded-2xl overflow-hidden border shadow-2xl"
          style={{ borderColor: C.surface0 }}
        >
          <img src="/screenshot.webp" alt="GhostPin App" className="w-full h-auto block" />
        </motion.div>
      </section>

      {/* ── Features bento grid ────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6 border-t" style={{ borderColor: C.surface0 }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[2px] uppercase mb-3" style={{ color: C.mauve }}>Features</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold" style={{ color: C.text }}>Everything you need</motion.h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid md:grid-cols-3 gap-4"
          >
            {/* large card */}
            <motion.div
              variants={fadeUp}
              className="md:col-span-2 p-8 rounded-2xl border flex flex-col gap-4"
              style={{ background: `${C.mantle}cc`, borderColor: C.surface0, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: C.surface0 }}>
                <MapPin size={18} style={{ color: C.pink }} />
              </div>
              <h3 className="text-xl font-bold" style={{ color: C.text }}>Click-to-teleport</h3>
              <p style={{ color: C.subtext0 }}>Click anywhere on the interactive map and your iPhone's GPS position updates instantly. No delay, no lag — the device reports the new location to every app on your phone in real time.</p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="p-8 rounded-2xl border flex flex-col gap-4"
              style={{ background: `${C.mantle}cc`, borderColor: C.surface0, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: C.surface0 }}>
                <Route size={18} style={{ color: C.mauve }} />
              </div>
              <h3 className="text-xl font-bold" style={{ color: C.text }}>Route simulation</h3>
              <p style={{ color: C.subtext0 }}>Draw a multi-point route and play it back at walking, cycling, or driving speed.</p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="p-8 rounded-2xl border flex flex-col gap-4"
              style={{ background: `${C.mantle}cc`, borderColor: C.surface0, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: C.surface0 }}>
                <FileInput size={18} style={{ color: C.green }} />
              </div>
              <h3 className="text-xl font-bold" style={{ color: C.text }}>GPX import</h3>
              <p style={{ color: C.subtext0 }}>Load any .gpx file exported from Google Maps, Strava, or any other mapping app.</p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="p-8 rounded-2xl border flex flex-col gap-4"
              style={{ background: `${C.mantle}cc`, borderColor: C.surface0, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: C.surface0 }}>
                <RefreshCw size={18} style={{ color: C.blue }} />
              </div>
              <h3 className="text-xl font-bold" style={{ color: C.text }}>Auto-reset</h3>
              <p style={{ color: C.subtext0 }}>Real GPS restored the moment you close GhostPin. No persistent changes to the device.</p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="p-8 rounded-2xl border flex flex-col gap-4"
              style={{ background: `${C.mantle}cc`, borderColor: C.surface0, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: C.surface0 }}>
                <Zap size={18} style={{ color: C.yellow }} />
              </div>
              <h3 className="text-xl font-bold" style={{ color: C.text }}>Auto-updates</h3>
              <p style={{ color: C.subtext0 }}>New versions install silently in the background — no manual downloads ever.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────────────── */}
      <section id="how" className="py-24 px-6 border-t" style={{ borderColor: C.surface0 }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[2px] uppercase mb-3" style={{ color: C.blue }}>Setup</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold" style={{ color: C.text }}>Running in under 2 minutes</motion.h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid md:grid-cols-3 gap-6 relative"
          >
            {[
              { num: "01", color: C.green,  icon: <Plug size={20} />,    title: "Connect via USB",       body: "Plug your iPhone into your Windows PC or Mac. GhostPin installs all required Apple drivers automatically on Windows." },
              { num: "02", color: C.pink,   icon: <Shield size={20} />,   title: "Enable Developer Mode", body: "On your iPhone: Settings → Privacy & Security → Developer Mode. One-time toggle." },
              { num: "03", color: C.mauve,  icon: <MapPin size={20} />,   title: "Click the map",         body: "Your iPhone moves wherever you click. Route mode, GPX import, and speed controls are all in the sidebar." },
            ].map(({ num, color, icon, title, body }) => (
              <motion.div
                key={num}
                variants={fadeUp}
                className="relative p-8 rounded-2xl border"
                style={{ background: `${C.mantle}cc`, borderColor: C.surface0, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-4xl font-black opacity-25" style={{ color }}>{num}</span>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: C.surface0, color }}>
                    {icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: C.text }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.subtext0 }}>{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-6 border-t" style={{ borderColor: C.surface0 }}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[2px] uppercase mb-3" style={{ color: C.green }}>Pricing</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold" style={{ color: C.text }}>Simple, honest pricing</motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-sm" style={{ color: C.subtext0 }}>1 free location change with no account. Subscribe for unlimited use.</motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid md:grid-cols-2 gap-5"
          >
            {/* Monthly */}
            <motion.div
              variants={fadeUp}
              className="p-8 rounded-2xl border flex flex-col"
              style={{ background: `${C.mantle}cc`, borderColor: C.surface0, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: C.subtext0 }}>Monthly</p>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-5xl font-black" style={{ color: C.text }}>$7.99</span>
                <span className="text-sm" style={{ color: C.overlay0 }}>/mo</span>
              </div>
              <p className="text-xs mb-8" style={{ color: C.overlay0 }}>Cancel anytime</p>
              <button
                onClick={() => buy("monthly")}
                disabled={busy !== null}
                className="mt-auto w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 disabled:opacity-60"
                style={{ background: C.surface0, color: C.text }}
              >
                {busy === "monthly" ? "Redirecting…" : "Get started"}
              </button>
            </motion.div>

            {/* Annual — highlighted */}
            <motion.div
              variants={fadeUp}
              className="p-8 rounded-2xl border-2 flex flex-col relative overflow-hidden"
              style={{ background: C.mantle, borderColor: C.green }}
            >
              <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: C.green, color: C.crust }}>
                Save 17%
              </div>
              <p className="text-sm font-semibold mb-1" style={{ color: C.subtext0 }}>Annual</p>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-5xl font-black" style={{ color: C.text }}>$79.99</span>
                <span className="text-sm" style={{ color: C.overlay0 }}>/yr</span>
              </div>
              <p className="text-xs mb-8" style={{ color: C.overlay0 }}>$6.67/mo billed annually</p>
              <button
                onClick={() => buy("yearly")}
                disabled={busy !== null}
                className="mt-auto w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 disabled:opacity-60"
                style={{ background: C.green, color: C.crust }}
              >
                {busy === "yearly" ? "Redirecting…" : "Get started"}
              </button>
            </motion.div>
          </motion.div>

          {err && <p className="mt-4 text-sm text-center" style={{ color: C.pink }}>{err}</p>}
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-24 px-6 border-t" style={{ borderColor: C.surface0 }}>
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[2px] uppercase mb-3" style={{ color: C.peach }}>FAQ</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold" style={{ color: C.text }}>Common questions</motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} viewport={{ once: true }}
            className="rounded-2xl border overflow-hidden"
            style={{ background: `${C.mantle}cc`, borderColor: C.surface0, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
          >
            <div className="px-8">
              {FAQ_ITEMS.map((item) => <FAQItem key={item.q} {...item} />)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Download CTA ───────────────────────────────────────────────────── */}
      <section id="download" className="py-24 px-6 border-t" style={{ borderColor: C.surface0 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-5xl mb-4">👻</p>
          <h2 className="text-3xl font-extrabold mb-3" style={{ color: C.text }}>
            Download GhostPin
          </h2>
          <p className="mb-10 text-sm" style={{ color: C.subtext0 }}>
            Free to try · No Python required · Auto-updates included
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Windows */}
            <div
              className="p-7 rounded-2xl border text-left flex flex-col gap-4"
              style={{ background: `${C.mantle}cc`, borderColor: C.surface0, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: C.surface0 }}>🪟</div>
                <div>
                  <p className="font-bold" style={{ color: C.text }}>Windows</p>
                  <p className="text-xs" style={{ color: C.overlay0 }}>Windows 10 / 11 · x64</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-auto">
                <a
                  href={DOWNLOAD_WIN_INSTALLER}
                  className="w-full py-3 rounded-xl font-bold text-sm text-center transition-all hover:opacity-90"
                  style={{ background: C.green, color: C.crust }}
                >
                  <Download size={13} className="inline mr-1.5 -mt-0.5" />
                  Download Setup.exe
                </a>
                <a
                  href={DOWNLOAD_WIN_PORTABLE}
                  className="w-full py-3 rounded-xl font-semibold text-sm text-center border transition-colors"
                  style={{ borderColor: C.surface1, color: C.subtext0 }}
                >
                  Portable .zip
                </a>
              </div>
            </div>

            {/* macOS */}
            <div
              className="p-7 rounded-2xl border text-left flex flex-col gap-4"
              style={{ background: `${C.mantle}cc`, borderColor: C.surface0, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: C.surface0 }}>🍎</div>
                <div>
                  <p className="font-bold" style={{ color: C.text }}>macOS</p>
                  <p className="text-xs" style={{ color: C.overlay0 }}>macOS 11+ · Apple Silicon &amp; Intel</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-auto">
                <a
                  href={DOWNLOAD_MAC_APP}
                  className="w-full py-3 rounded-xl font-bold text-sm text-center transition-all hover:opacity-90"
                  style={{ background: C.green, color: C.crust }}
                >
                  <Download size={13} className="inline mr-1.5 -mt-0.5" />
                  Download .app
                </a>
                <a
                  href={DOWNLOAD_MAC_PORTABLE}
                  className="w-full py-3 rounded-xl font-semibold text-sm text-center border transition-colors"
                  style={{ borderColor: C.surface1, color: C.subtext0 }}
                >
                  Portable .zip
                </a>
              </div>
            </div>
          </div>

          <p className="mt-6 text-xs" style={{ color: C.overlay0 }}>~300 MB · Auto-updates included · Free trial: 10 minutes, no card</p>
        </motion.div>
      </section>

      {/* ── Test purchase (dev only) ───────────────────────────────────────── */}
      <section className="py-8 px-6 border-t" style={{ borderColor: C.surface0 }}>
        <div className="max-w-xs mx-auto text-center">
          <p className="text-xs font-mono mb-3" style={{ color: C.overlay0 }}>— dev / test —</p>
          <button
            onClick={() => buy("test")}
            disabled={busy !== null}
            className="w-full py-2.5 rounded-xl font-semibold text-sm border transition-colors disabled:opacity-50"
            style={{ borderColor: C.surface1, color: C.subtext0, background: C.mantle }}
          >
            {busy === "test" ? "Redirecting…" : "Test purchase — $1"}
          </button>
          <p className="mt-2 text-xs" style={{ color: C.overlay0 }}>
            Full checkout → key → email flow · use Stripe test card 4242 4242 4242 4242
          </p>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t py-12 px-6" style={{ borderColor: C.surface0, background: C.crust }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-extrabold text-base" style={{ color: C.text }}>
            <span>👻</span><span>GhostPin</span>
            <span className="font-normal text-sm ml-1 hidden sm:inline" style={{ color: C.overlay0 }}>· ghostpin.xyz</span>
          </div>

          <div className="flex flex-wrap justify-center gap-5 text-sm" style={{ color: C.overlay0 }}>
            {[["Terms of Service","/terms"],["Privacy Policy","/privacy"],["EULA","/eula"],["Refund Policy","/refund"]].map(([label, href]) => (
              <Link key={label} to={href} className="hover:text-[#1d1d1f] transition-colors">{label}</Link>
            ))}
            <Link to="/account" className="hover:text-[#1d1d1f] transition-colors">Manage subscription</Link>
          </div>
        </div>
        <p className="max-w-6xl mx-auto mt-8 text-xs text-center md:text-left" style={{ color: C.overlay0 }}>
          © {new Date().getFullYear()} GhostPin. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
