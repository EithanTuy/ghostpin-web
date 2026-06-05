import Shell from "@/components/Shell";

export default function Refund() {
  return (
    <Shell>
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-extrabold mb-1" style={{ color: "#1d1d1f" }}>Refund &amp; Cancellation Policy</h1>
        <p className="text-sm mb-10" style={{ color: "#6e6e73" }}>GhostPin</p>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>Cancellation</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            You can cancel your subscription at any time from your account page or by emailing <a href="mailto:ghostpinsupport@gmail.com" style={{ color: "#0071e3" }} className="underline">ghostpinsupport@gmail.com</a>. Cancellation stops future automatic renewals. You keep access until the end of the billing period you have already paid for; we do not prorate partial periods.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>No refunds — all sales are final</h2>
          <ul className="list-disc list-inside space-y-2 leading-relaxed" style={{ color: "#1d1d1f" }}>
            <li><strong>All payments are non-refundable.</strong> GhostPin does not offer refunds for any subscription payment, including initial purchases and automatic renewals.</li>
            <li><strong>Try before you buy:</strong> every plan includes a <strong>24-hour free trial</strong> with no charge, so you can fully evaluate GhostPin before any payment is taken. Cancel during the trial and you will not be billed.</li>
            <li>This no-refund policy does not limit any mandatory statutory consumer rights that cannot legally be waived in your jurisdiction.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>EU/UK right of withdrawal (digital content)</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            If you are a consumer in the EU/UK, you normally have a 14-day right to withdraw from a purchase. By starting your subscription and gaining immediate access to the software, you <strong>consent</strong> to immediate performance and <strong>acknowledge that you lose the withdrawal right</strong> once access begins. Nothing in this policy removes mandatory consumer rights in your country.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>Failed payments</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            If a renewal payment fails, your license may be suspended until payment succeeds. Restoring payment reinstates access; no separate repurchase is needed.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>Chargebacks</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            If you have a billing problem, please contact us first — we can usually resolve it faster than a chargeback. Filing a fraudulent chargeback may result in termination of your license.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>Contact</h2>
          <p className="leading-relaxed" style={{ color: "#6e6e73" }}>
            For cancellation requests or billing questions, contact us at{" "}
            <a href="mailto:ghostpinsupport@gmail.com" style={{ color: "#0071e3" }} className="underline">ghostpinsupport@gmail.com</a>.
          </p>
        </section>
      </div>
    </Shell>
  );
}
