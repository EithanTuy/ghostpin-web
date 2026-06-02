import Shell from "@/components/Shell";
import { DOWNLOAD_URL } from "@/lib/api";

export default function Activate() {
  return (
    <Shell>
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold text-white mb-3 text-center">Activate GhostPin</h1>
        <p className="text-[#a6adc8] mb-8 text-center">
          Your license key was emailed to you right after checkout. Here's how to use it.
        </p>

        <ol className="space-y-4 mb-8">
          <li className="flex gap-4 bg-[#313244] p-5 rounded-2xl">
            <span className="text-[#a6e3a1] font-bold text-2xl opacity-60">01</span>
            <div>
              <h3 className="text-white font-semibold mb-1">Download &amp; open GhostPin</h3>
              <p className="text-[#a6adc8] text-sm">
                Install and launch the app on your Windows PC.{" "}
                <a href={DOWNLOAD_URL} className="text-[#a6e3a1] hover:underline">
                  Get the latest build →
                </a>
              </p>
            </div>
          </li>
          <li className="flex gap-4 bg-[#313244] p-5 rounded-2xl">
            <span className="text-[#f38ba8] font-bold text-2xl opacity-60">02</span>
            <div>
              <h3 className="text-white font-semibold mb-1">Open the activation screen</h3>
              <p className="text-[#a6adc8] text-sm">On first launch GhostPin shows the activation screen.</p>
            </div>
          </li>
          <li className="flex gap-4 bg-[#313244] p-5 rounded-2xl">
            <span className="text-[#cba6f7] font-bold text-2xl opacity-60">03</span>
            <div>
              <h3 className="text-white font-semibold mb-1">Paste your license key</h3>
              <p className="text-[#a6adc8] text-sm">
                Copy the key from your email, paste it in, and click <b>Activate</b>. You're unlocked
                immediately — no restart needed.
              </p>
            </div>
          </li>
        </ol>

        <p className="text-center text-sm text-[#a6adc8]">
          Can't find the email? Check spam, or{" "}
          <a href="/account" className="text-[#a6e3a1] hover:underline">
            manage your subscription
          </a>{" "}
          to confirm it's active.
        </p>
      </div>
    </Shell>
  );
}
