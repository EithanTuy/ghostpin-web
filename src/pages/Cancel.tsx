import Shell from "@/components/Shell";

export default function Cancel() {
  return (
    <Shell>
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-[#1d1d1f] mb-3">Checkout canceled</h1>
        <p className="text-[#6e6e73] mb-8">No charge was made. You can pick a plan whenever you're ready.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/#pricing"
            className="bg-[#0071e3] text-[#f5f5f7] px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            See plans
          </a>
          <a
            href="/"
            className="border-2 border-[#e8e8ed] text-[#1d1d1f] px-6 py-3 rounded-xl font-semibold hover:bg-[#e8e8ed] transition-colors"
          >
            Back home
          </a>
        </div>
      </div>
    </Shell>
  );
}
