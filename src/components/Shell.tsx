import type { ReactNode } from "react";
import { Link } from "react-router-dom";

/** Shared page chrome for the non-landing pages (success, account, etc.). */
export default function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#13151f] text-[#e7e9f2] font-sans selection:bg-[#fb7185] selection:text-[#13151f]">
      <nav className="border-b border-[#212433] bg-[#13151f]/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
            <span>👻</span>
            <span>GhostPin</span>
          </Link>
          <Link to="/account" className="text-sm text-[#9aa1b8] hover:text-[#e7e9f2] transition-colors">
            Manage subscription
          </Link>
        </div>
      </nav>
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">{children}</main>
      <footer className="border-t border-[#212433] bg-[#0a0b11] py-6 px-6 text-center text-sm text-[#9aa1b8]">
        © 2025 GhostPin · ghostpin.xyz
      </footer>
    </div>
  );
}
