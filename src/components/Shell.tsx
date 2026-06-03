import type { ReactNode } from "react";
import { Link } from "react-router-dom";

/** Shared page chrome for the non-landing pages (success, account, etc.). */
export default function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f7] text-[#1d1d1f] font-sans selection:bg-[#0071e3] selection:text-white">
      <nav className="border-b border-[#e8e8ed] bg-[#f5f5f7]/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-[#1d1d1f]">
            <span>👻</span>
            <span>GhostPin</span>
          </Link>
          <Link to="/account" className="text-sm text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">
            Manage subscription
          </Link>
        </div>
      </nav>
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">{children}</main>
      <footer className="border-t border-[#e8e8ed] bg-[#ffffff] py-6 px-6 text-center text-sm text-[#6e6e73]">
        © 2025 GhostPin · ghostpin.xyz
      </footer>
    </div>
  );
}
