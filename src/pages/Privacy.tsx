import Shell from "@/components/Shell";

export default function Privacy() {
  return (
    <Shell>
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-extrabold mb-1" style={{ color: "#1d1d1f" }}>Privacy Policy</h1>
        <p className="text-sm mb-10" style={{ color: "#6e6e73" }}>GhostPin · Last updated: June 2, 2026 · Version 1.0.1</p>

        <p className="mb-6 leading-relaxed" style={{ color: "#1d1d1f" }}>
          This Privacy Policy explains what personal data we collect when you buy and use GhostPin, why, and your rights. We are the data controller for this processing.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>1. What we collect</h2>

          <h3 className="text-base font-semibold mb-2 mt-4" style={{ color: "#1d1d1f" }}>When you purchase (via Stripe):</h3>
          <ul className="list-disc list-inside space-y-1 mb-4 leading-relaxed" style={{ color: "#1d1d1f" }}>
            <li>Your email address and billing/transaction details.</li>
            <li>Card data is handled directly by <strong>Stripe</strong>; we never receive or store your full card number.</li>
          </ul>

          <h3 className="text-base font-semibold mb-2" style={{ color: "#1d1d1f" }}>When you activate and use the app (via Keygen):</h3>
          <ul className="list-disc list-inside space-y-1 mb-4 leading-relaxed" style={{ color: "#1d1d1f" }}>
            <li>Your <strong>license key</strong>.</li>
            <li>A <strong>hardware fingerprint</strong> — a one-way hash derived from your operating system, CPU architecture, and primary network-adapter MAC address. We use it only to lock your license to your device(s) and enforce the device limit. The raw MAC address never leaves your computer; only the hash is transmitted.</li>
            <li>Basic device metadata: machine name, platform, and activation timestamps.</li>
            <li>Your IP address and request time, as a normal part of making network requests to the licensing service.</li>
          </ul>

          <h3 className="text-base font-semibold mb-2" style={{ color: "#1d1d1f" }}>We do NOT collect:</h3>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            The GPS coordinates, routes, addresses, or GPX files you use in the app. Those are processed locally on your computer and sent only to your connected device. (Address search queries you type are sent to the third-party geocoder, Photon — see §3.)
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>2. Why we process it (legal bases under GDPR)</h2>
          <ul className="list-disc list-inside space-y-2 leading-relaxed" style={{ color: "#1d1d1f" }}>
            <li><strong>Performing our contract</strong> with you: processing payment, issuing and validating your license, enforcing device limits.</li>
            <li><strong>Legitimate interests:</strong> preventing license abuse/fraud, securing the service, and providing support.</li>
            <li><strong>Legal obligation:</strong> keeping tax/transaction records.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>3. Third parties (processors / services)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ borderBottom: "1px solid #e8e8ed" }}>
                  <th className="text-left py-2 pr-4 font-semibold" style={{ color: "#1d1d1f" }}>Provider</th>
                  <th className="text-left py-2 pr-4 font-semibold" style={{ color: "#1d1d1f" }}>Purpose</th>
                  <th className="text-left py-2 font-semibold" style={{ color: "#1d1d1f" }}>Data shared</th>
                </tr>
              </thead>
              <tbody style={{ color: "#1d1d1f" }}>
                {[
                  ["Stripe", "Payments & subscription billing", "email, payment details"],
                  ["Keygen", "License issuance & validation", "license key, hardware fingerprint, device metadata, IP"],
                  ["Resend (email provider)", "Sending your license key & receipts", "email address"],
                  ["Photon / OpenStreetMap (in-app search)", "Address geocoding", "search text you type, your IP"],
                  ["Map tile provider (OpenStreetMap/CartoDB)", "Map display", "your IP, tile requests"],
                ].map(([provider, purpose, data]) => (
                  <tr key={provider} style={{ borderBottom: "1px solid #e8e8ed" }}>
                    <td className="py-2 pr-4 align-top">{provider}</td>
                    <td className="py-2 pr-4 align-top">{purpose}</td>
                    <td className="py-2 align-top" style={{ color: "#6e6e73" }}>{data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "#6e6e73" }}>
            Each provider processes data under its own privacy terms. We share only what is necessary for each function.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>4. International transfers</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            Some providers may process data outside your country (e.g. in the US). Where required, transfers rely on appropriate safeguards such as Standard Contractual Clauses.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>5. Retention</h2>
          <ul className="list-disc list-inside space-y-2 leading-relaxed" style={{ color: "#1d1d1f" }}>
            <li>Purchase/billing records: kept as long as required by tax and accounting law.</li>
            <li>License and device-activation data: kept while your subscription is active and for a reasonable period afterward to handle renewals, disputes, and abuse prevention, then deleted or anonymised.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>6. Your rights</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            Depending on where you live (e.g. GDPR in the EU/UK, CCPA/CPRA in California), you may have the right to access, correct, delete, port, or restrict processing of your personal data, to object to processing based on legitimate interests, and to withdraw consent. California residents have the right to know and to delete, and we do <strong>not</strong> sell or "share" personal information for cross-context behavioural advertising. To exercise any right, contact us at <a href="mailto:ghostpinsupport@gmail.com" style={{ color: "#0071e3" }} className="underline">ghostpinsupport@gmail.com</a>. You may also complain to your local data-protection authority.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>7. Security</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            We use reputable processors and transmit licensing data over encrypted (HTTPS) connections. No method of transmission or storage is 100% secure, but we take reasonable measures to protect your data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>8. Children</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            The Software is not directed to children and is intended for users 18+.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>9. Changes</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            We may update this Policy; the "Last updated" date reflects the latest version, and material changes will be communicated where required.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>10. Contact</h2>
          <p className="leading-relaxed" style={{ color: "#6e6e73" }}>
            For privacy-related questions or to exercise your rights, contact us at <a href="mailto:ghostpinsupport@gmail.com" style={{ color: "#0071e3" }} className="underline">ghostpinsupport@gmail.com</a>.
          </p>
        </section>
      </div>
    </Shell>
  );
}
