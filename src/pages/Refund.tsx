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
            You can cancel your subscription at any time from your account page or by emailing support. Cancellation stops future automatic renewals. You keep access until the end of the billing period you have already paid for; we do not prorate partial periods unless required by law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>Refunds</h2>
          <ul className="list-disc list-inside space-y-2 leading-relaxed" style={{ color: "#1d1d1f" }}>
            <li><strong>14-day refund:</strong> If you are not satisfied, contact us within 14 days of your initial purchase and we will refund that first payment.</li>
            <li><strong>Renewals:</strong> Charges for automatic renewals are generally non-refundable once the new period has begun, except where required by law.</li>
            <li>Refunds are issued to your original payment method via Stripe.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>EU/UK right of withdrawal (digital content)</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            If you are a consumer in the EU/UK, you normally have a 14-day right to withdraw from a purchase. For digital content and services that begin immediately, you may be asked to <strong>consent</strong> to immediate access and to <strong>acknowledge that you lose the withdrawal right</strong> once performance begins. Where you have not given that consent, the statutory withdrawal right applies. Nothing in this policy removes mandatory consumer rights in your country.
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
            For refund or cancellation requests, contact us via the support email listed on the GhostPin website.
          </p>
        </section>
      </div>
    </Shell>
  );
}
