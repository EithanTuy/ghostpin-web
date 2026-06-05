import Shell from "@/components/Shell";

export default function Terms() {
  return (
    <Shell>
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-extrabold mb-1" style={{ color: "#1d1d1f" }}>Terms of Service</h1>
        <p className="text-sm mb-10" style={{ color: "#6e6e73" }}>GhostPin · Last updated: June 2, 2026 · Version 1.0.1</p>

        <p className="mb-6 leading-relaxed" style={{ color: "#1d1d1f" }}>
          These Terms of Service ("Terms") govern your purchase and use of a subscription to GhostPin from us ("we", "us"). They incorporate the EULA, Acceptable Use Policy, Privacy Policy, and Refund Policy. By subscribing you agree to all of them.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>1. Eligibility</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            You must be at least 18 years old (or the age of majority where you live) and able to form a binding contract.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>2. Subscriptions &amp; billing</h2>
          <ul className="list-disc list-inside space-y-2 leading-relaxed" style={{ color: "#1d1d1f" }}>
            <li>The Software is sold on a recurring <strong>subscription</strong> basis (price shown at checkout).</li>
            <li>Payments are processed by <strong>Stripe</strong>; we do not store your full card details.</li>
            <li><strong>Auto-renewal:</strong> your subscription renews automatically at the end of each billing period and your payment method is charged the then-current price, <strong>until you cancel</strong>. You authorise these recurring charges when you subscribe.</li>
            <li>We will give advance notice of any price change as required by law.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>3. Cancellation</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            You may cancel at any time from your account page or by contacting support. Cancellation stops future renewals; it takes effect at the end of the current paid period, and you keep access until then. See our <a href="/refund" style={{ color: "#0071e3" }} className="underline">Refund Policy</a> for refunds.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>4. License activation &amp; device limits</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            Each subscription includes a license key that activates the Software on a limited number of devices. The Software validates your key online and registers each device; exceeding the device limit requires deactivating another device first. Sharing keys beyond your plan's limit is prohibited (see <a href="/eula" style={{ color: "#0071e3" }} className="underline">EULA §3</a>).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>5. Suspension &amp; termination</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            We may suspend or terminate your subscription if a payment fails, if you breach these Terms, the EULA, or the Acceptable Use Policy, or as required by law. Suspended licenses can usually be restored once the underlying issue (e.g. payment) is resolved.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>6. Service availability</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            The licensing/validation service is provided on a commercially reasonable "best-efforts" basis. The Software includes an offline grace period so short outages do not interrupt paying users. We are not liable for downtime of third-party services (Apple, Stripe, the license provider, email delivery).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>7. Support</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            We provide support by email on a reasonable-efforts basis. We do not guarantee compatibility with every device, iOS version, or future Apple change that may affect developer protocols.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>8. Changes to these Terms</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            We may update these Terms; material changes will be communicated and, where required, will ask for renewed acceptance. Continued use after changes take effect constitutes acceptance.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>9. Disclaimers &amp; liability</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            The disclaimers of warranty and limitations of liability in the <a href="/eula" style={{ color: "#0071e3" }} className="underline">EULA (§6–§7)</a> apply equally to these Terms and to the subscription service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>10. Governing law &amp; disputes</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            These Terms are governed by applicable law. Mandatory consumer-protection rights in your country of residence are unaffected.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>11. Contact</h2>
          <p className="leading-relaxed" style={{ color: "#6e6e73" }}>
            For questions about these Terms, contact us at <a href="mailto:ghostpinsupport@gmail.com" style={{ color: "#0071e3" }} className="underline">ghostpinsupport@gmail.com</a>.
          </p>
        </section>
      </div>
    </Shell>
  );
}
