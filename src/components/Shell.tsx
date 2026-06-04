import type { ReactNode } from "react";
import { Link } from "react-router-dom";

/** Shared page chrome for the non-landing pages (success, account, etc.). */
export default function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#1e1e2e] text-[#cdd6f4] font-sans selection:bg-[#f38ba8] selection:text-[#1e1e2e]">
      <nav className="border-b border-[#313244] bg-[#1e1e2e]/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
            <span
              className="text-2xl select-none"
              style={{ filter: "drop-shadow(0 0 8px rgba(137,180,250,0.65))" }}
            >👻</span>
            <span>GhostPin</span>
          </Link>
          <Link to="/account" className="text-sm text-[#a6adc8] hover:text-[#cdd6f4] transition-colors">
            Manage subscription
          </Link>
        </div>
      </nav>
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">{children}</main>
      <footer className="border-t border-[#313244] bg-[#11111b] py-6 px-6 text-center text-sm text-[#a6adc8]">
        © 2025 GhostPin · ghostpin.xyz
      </footer>
    </div>
  );
}
