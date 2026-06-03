import Shell from "@/components/Shell";

export default function Cancel() {
  return (
    <Shell>
      <div className="w-full max-w-md text-center">
        <div className="text-5xl mb-6">🛒</div>
        <h1 className="text-3xl font-bold text-white mb-3">Checkout canceled</h1>
        <p className="text-[#9aa1b8] mb-8">No charge was made. You can pick a plan whenever you're ready.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/#pricing"
            className="bg-[#a78bfa] text-[#13151f] px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            See plans
          </a>
          <a
            href="/"
            className="border-2 border-[#212433] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#212433] transition-colors"
          >
            Back home
          </a>
        </div>
      </div>
    </Shell>
  );
}
