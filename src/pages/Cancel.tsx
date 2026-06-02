import Shell from "@/components/Shell";

export default function Cancel() {
  return (
    <Shell>
      <div className="w-full max-w-md text-center">
        <div className="text-5xl mb-6">🛒</div>
        <h1 className="text-3xl font-bold text-white mb-3">Checkout canceled</h1>
        <p className="text-[#a6adc8] mb-8">No charge was made. You can pick a plan whenever you're ready.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/#pricing"
            className="bg-[#a6e3a1] text-[#1e1e2e] px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            See plans
          </a>
          <a
            href="/"
            className="border-2 border-[#313244] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#313244] transition-colors"
          >
            Back home
          </a>
        </div>
      </div>
    </Shell>
  );
}
