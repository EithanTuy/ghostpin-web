import Shell from "@/components/Shell";

export default function EULA() {
  return (
    <Shell>
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-extrabold mb-1" style={{ color: "#1d1d1f" }}>End-User License Agreement</h1>
        <p className="text-sm mb-10" style={{ color: "#6e6e73" }}>GhostPin · Last updated: June 2, 2026 · Version 1.0.1</p>

        <p className="mb-6 leading-relaxed" style={{ color: "#1d1d1f" }}>
          This End-User License Agreement ("Agreement") is between you ("you") and us ("we", "us"). By installing, activating, or using GhostPin ("the Software"), you agree to this Agreement. If you do not agree, do not use the Software.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>1. License grant</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            Subject to your active, paid subscription and this Agreement, we grant you a personal, non-exclusive, non-transferable, revocable license to install and use the Software on the number of devices permitted by your subscription, solely for your own lawful software-development, testing, and quality-assurance purposes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>2. Subscription required</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            The Software is licensed, not sold, and functions only while you hold a valid subscription. We may disable access if your subscription lapses, is cancelled, or is suspended for non-payment or breach of this Agreement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>3. Restrictions</h2>
          <p className="mb-2 leading-relaxed" style={{ color: "#1d1d1f" }}>You may not, and may not permit others to:</p>
          <ul className="list-disc list-inside space-y-2 leading-relaxed" style={{ color: "#1d1d1f" }}>
            <li>copy, redistribute, resell, sublicense, rent, or lease the Software or your license key;</li>
            <li>reverse engineer, decompile, or disassemble the Software except to the extent this restriction is prohibited by applicable law;</li>
            <li>circumvent, disable, or tamper with the licensing, activation, or device-limit mechanisms;</li>
            <li>share a license key across more devices than your subscription permits;</li>
            <li>use the Software in violation of the Acceptable Use Policy or any applicable law, regulation, or third-party terms of service.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>4. Ownership</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            We and our licensors retain all right, title, and interest in the Software, including all intellectual-property rights. The Software is built on third-party open-source components, each licensed under its own terms; nothing here limits your rights under those licenses.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>5. Device modification &amp; your responsibility</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            The Software injects simulated GPS data into a device you connect over USB using Apple's developer protocols. You are solely responsible for ensuring you own or are authorised to modify the connected device and that your use complies with all applicable laws and the terms of any third-party services or apps. Location changes made by the Software are non-persistent and intended to be reset when the device is disconnected or restarted.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>6. No warranty</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            THE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. We do not warrant that the Software will be uninterrupted, error-free, or compatible with any particular device or iOS version. Some jurisdictions do not allow the exclusion of implied warranties, so some of the above may not apply to you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>7. Limitation of liability</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF DATA, DEVICES, PROFITS, OR GOODWILL, ARISING FROM OR RELATED TO YOUR USE OF THE SOFTWARE. OUR TOTAL AGGREGATE LIABILITY UNDER THIS AGREEMENT WILL NOT EXCEED THE AMOUNT YOU PAID FOR THE SUBSCRIPTION IN THE 3 MONTHS BEFORE THE EVENT GIVING RISE TO THE LIABILITY. Nothing in this Agreement limits liability that cannot be limited under applicable law (such as for death, personal injury caused by negligence, or fraud).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>8. Indemnity</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            You agree to indemnify and hold us harmless from any claim arising out of your misuse of the Software or your breach of this Agreement or the Acceptable Use Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>9. Termination</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            This Agreement is effective until terminated. It terminates automatically if you breach it. On termination you must stop using the Software. Sections 3–8 and 10–11 survive termination.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>10. Updates</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            We may provide updates that modify, add, or remove features. This Agreement governs any updates unless they are accompanied by separate terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>11. Governing law</h2>
          <p className="leading-relaxed" style={{ color: "#1d1d1f" }}>
            This Agreement is governed by applicable law, without regard to conflict-of-law rules. Mandatory consumer-protection rights in your country of residence are unaffected.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1d1d1f" }}>12. Contact</h2>
          <p className="leading-relaxed" style={{ color: "#6e6e73" }}>
            For questions about this Agreement, contact us at <a href="mailto:ghostpinsupport@gmail.com" style={{ color: "#0071e3" }} className="underline">ghostpinsupport@gmail.com</a>.
          </p>
        </section>
      </div>
    </Shell>
  );
}
