import { MapPin, Route, Import, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { startCheckout, DOWNLOAD_URL, type Plan } from "@/lib/api";

export default function Home() {
  const [busy, setBusy] = useState<Plan | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function buy(plan: Plan) {
    setError(null);
    setBusy(plan);
    try {
      await startCheckout(plan);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setBusy(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#1e1e2e] text-[#cdd6f4] font-sans selection:bg-[#f38ba8] selection:text-[#1e1e2e]">
      {/* Navbar */}
      <nav className="border-b border-[#313244] sticky top-0 bg-[#1e1e2e]/90 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold text-white">
            <span
              className="text-2xl select-none"
              style={{ filter: "drop-shadow(0 0 8px rgba(137,180,250,0.65))" }}
            >👻</span>
            <span>GhostPin</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm text-[#a6adc8]">
            <a href="#features" className="hover:text-[#cdd6f4] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#cdd6f4] transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-[#cdd6f4] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-[#cdd6f4] transition-colors">FAQ</a>
          </div>
          <a href="#download" className="bg-[#313244] hover:bg-[#a6adc8]/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Download
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 px-6 max-w-6xl mx-auto text-center">
        {/* Ghost logo mark */}
        <div className="flex justify-center mb-6">
          <span
            className="text-7xl md:text-8xl select-none"
            style={{ filter: "drop-shadow(0 0 28px rgba(137,180,250,0.7))" }}
          >
            👻
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
          Simulate GPS on your iPhone.<br className="hidden md:block" /> No jailbreak.
        </h1>
        <p className="text-lg md:text-xl text-[#a6adc8] mb-10 max-w-2xl mx-auto">
          Click anywhere on the map to teleport your iPhone's location instantly. Route simulation, GPX import, and auto-reset included.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => buy("monthly")} disabled={busy !== null} className="bg-[#a6e3a1] text-[#1e1e2e] px-8 py-3 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity w-full sm:w-auto disabled:opacity-60">
            {busy === "monthly" ? "Redirecting…" : "Get GhostPin — $7.99/mo"}
          </button>
          <a href={DOWNLOAD_URL} className="border-2 border-[#313244] text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-[#313244] transition-colors w-full sm:w-auto">
            Try free for one change
          </a>
        </div>
        {error && <p className="mt-4 text-sm text-[#f38ba8]">{error}</p>}
        <p className="mt-4 text-sm text-[#a6adc8]">or $79.99/year · save 17%</p>
        
        {/* App Screenshot */}
        <div className="mt-16 w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-[#313244] shadow-2xl bg-[#313244] flex items-center justify-center relative">
          <img src="/screenshot.webp" alt="GhostPin App Screenshot" className="w-full h-auto block" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 max-w-6xl mx-auto border-t border-[#313244]">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Everything you need</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#313244] p-8 rounded-2xl">
            <div className="bg-[#1e1e2e] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <MapPin className="text-[#f38ba8] w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Click-to-teleport</h3>
            <p className="text-[#a6adc8]">Click anywhere on the map. Your iPhone moves there instantly.</p>
          </div>
          <div className="bg-[#313244] p-8 rounded-2xl">
            <div className="bg-[#1e1e2e] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <Route className="text-[#cba6f7] w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Route simulation</h3>
            <p className="text-[#a6adc8]">Draw a multi-point path and play it back at walking, cycling, or driving speed.</p>
          </div>
          <div className="bg-[#313244] p-8 rounded-2xl">
            <div className="bg-[#1e1e2e] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <Import className="text-[#a6e3a1] w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">GPX import</h3>
            <p className="text-[#a6adc8]">Load any .gpx file from your favourite mapping app.</p>
          </div>
          <div className="bg-[#313244] p-8 rounded-2xl">
            <div className="bg-[#1e1e2e] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <RefreshCw className="text-[#89b4fa] w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Auto-reset</h3>
            <p className="text-[#a6adc8]">Real GPS restored automatically when you close the app.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-6 max-w-6xl mx-auto border-t border-[#313244]">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Up and running in 3 steps</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="text-[#a6e3a1] font-bold text-5xl mb-4 opacity-50">01</div>
            <h3 className="text-xl font-semibold text-white mb-2">Connect via USB</h3>
            <p className="text-[#a6adc8]">Plug in your iPhone and open GhostPin on your Windows PC.</p>
          </div>
          <div className="flex-1">
            <div className="text-[#f38ba8] font-bold text-5xl mb-4 opacity-50">02</div>
            <h3 className="text-xl font-semibold text-white mb-2">Enable Developer Mode</h3>
            <p className="text-[#a6adc8]">Settings → Privacy & Security → Developer Mode on your iPhone.</p>
          </div>
          <div className="flex-1">
            <div className="text-[#cba6f7] font-bold text-5xl mb-4 opacity-50">03</div>
            <h3 className="text-xl font-semibold text-white mb-2">Click the map</h3>
            <p className="text-[#a6adc8]">Your iPhone's GPS moves to wherever you click. That's it.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 max-w-6xl mx-auto border-t border-[#313244]">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Simple pricing</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6 max-w-4xl mx-auto">
          {/* Monthly */}
          <div className="bg-[#313244] p-8 rounded-2xl flex-1 flex flex-col relative">
            <h3 className="text-xl font-semibold text-white mb-2">Monthly</h3>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold text-white">$7.99</span>
              <span className="text-[#a6adc8]">/ month</span>
            </div>
            <p className="text-[#a6adc8] mb-8">Cancel anytime</p>
            <button onClick={() => buy("monthly")} disabled={busy !== null} className="mt-auto block w-full text-center bg-[#a6e3a1] text-[#1e1e2e] py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-60">
              {busy === "monthly" ? "Redirecting…" : "Get started"}
            </button>
          </div>

          {/* Annual */}
          <div className="bg-[#313244] border-2 border-[#a6e3a1] p-8 rounded-2xl flex-1 flex flex-col relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#a6e3a1] text-[#1e1e2e] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Save 17% · Best value
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Annual</h3>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold text-white">$79.99</span>
              <span className="text-[#a6adc8]">/ year</span>
            </div>
            <p className="text-[#a6adc8] mb-8">Billed annually</p>
            <button onClick={() => buy("yearly")} disabled={busy !== null} className="mt-auto block w-full text-center bg-[#a6e3a1] text-[#1e1e2e] py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-60">
              {busy === "yearly" ? "Redirecting…" : "Get started"}
            </button>
          </div>
        </div>
        <p className="text-center text-xs text-[#a6adc8] mt-8 max-w-2xl mx-auto">
          1 free location change included with no account. Subscription required for unlimited use. All sales final — no refunds.
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 max-w-3xl mx-auto border-t border-[#313244]">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">FAQ</h2>
        <div className="space-y-8">
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Does it need a jailbreak?</h4>
            <p className="text-[#a6adc8]">No. It uses Apple's official developer protocol over USB.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Does it work on iOS 17 and later?</h4>
            <p className="text-[#a6adc8]">Yes. The app launches the required tunnel daemon automatically and prompts for admin permission once.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">What about the Windows SmartScreen warning?</h4>
            <p className="text-[#a6adc8]">The app is unsigned. Click "More info → Run anyway" once — this is normal for indie developer tools.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">What iPhones and iPads does it support?</h4>
            <p className="text-[#a6adc8]">Any iPhone or iPad with Developer Mode enabled (iOS 15+).</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">What happens when I close the app?</h4>
            <p className="text-[#a6adc8]">Your real GPS is restored automatically. No permanent changes are made.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Do I need to keep the tunnel running?</h4>
            <p className="text-[#a6adc8]">On iOS 17+, the app handles it for you — just approve the UAC prompt once when it asks.</p>
          </div>
        </div>
      </section>

      {/* Download */}
      <section id="download" className="py-20 px-6 border-t border-[#313244] text-center bg-[#1e1e2e]">
        <div className="max-w-3xl mx-auto bg-[#313244] p-12 rounded-3xl">
          <h2 className="text-3xl font-bold text-white mb-8">Download GhostPin for Windows</h2>
          <a href={DOWNLOAD_URL} className="inline-block bg-[#a6e3a1] text-[#1e1e2e] px-8 py-4 rounded-xl font-semibold text-xl hover:opacity-90 transition-opacity mb-4">
            Download Setup.exe
          </a>
          <p className="text-sm text-[#a6adc8] mb-6">Also available as a portable .zip — no installation required</p>
          <div className="inline-flex gap-4 text-xs text-[#a6adc8] bg-[#1e1e2e] px-4 py-2 rounded-lg">
            <span>Requires Windows 10 or 11</span>
            <span>·</span>
            <span>Python not required</span>
            <span>·</span>
            <span>~300 MB</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#313244] bg-[#11111b] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-lg font-bold text-white">
            <span
              className="text-2xl select-none"
              style={{ filter: "drop-shadow(0 0 8px rgba(137,180,250,0.65))" }}
            >👻</span>
            <span>GhostPin</span>
            <span className="text-sm font-normal text-[#a6adc8] ml-2 hidden sm:inline">· ghostpin.xyz</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-[#a6adc8]">
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Acceptable Use</Link>
            <Link to="#" className="hover:text-white transition-colors">EULA</Link>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 text-center md:text-left text-sm text-[#a6adc8]">
          © 2025 GhostPin. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
