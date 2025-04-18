import styles from './TermsPage.module.scss';

export const TermsPageEn = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Terms of Use for OneTimeLink.ru</h1>

      <div className={styles.lastUpdated}>Last Updated: April 18, 2025</div>

      <div className={styles.section}>
        <h2>1. General Provisions</h2>
        <p>
          1.1. The website <strong>OneTimeLink.ru</strong> (hereinafter referred
          to as "the Service") provides users with the ability to create
          one-time and temporary links.
        </p>
        <p>
          1.2. By using the Service, you automatically agree to these Terms and
          confirm that you bear full responsibility for the content of the
          created links.
        </p>
        <p>
          1.3. The Service Administration is not responsible for users' actions,
          the content of transmitted data, or the consequences of using the
          links.
        </p>
      </div>

      <div className={styles.section}>
        <h2>2. User Responsibilities</h2>
        <p>2.1. The user guarantees that the created links:</p>
        <ul>
          <li>
            Do not contain illegal, malicious, fraudulent, or prohibited content
          </li>
          <li>
            Do not violate copyrights, trademarks, or other intellectual
            property rights of third parties
          </li>
          <li>
            Are not used to distribute viruses, phishing, spam, or other
            malicious activities
          </li>
        </ul>
        <p>
          2.2. The user is solely responsible to third parties for the
          consequences of creating and distributing links.
        </p>
      </div>

      <div className={styles.section}>
        <h2>3. Service Disclaimer</h2>
        <p>
          3.1. The Service is provided "as is" without warranties of security,
          integrity, or availability of link content.
        </p>
        <p>
          3.2. The Administration does not verify link content or control users'
          actions.
        </p>
        <p>3.3. The Administration is not responsible for:</p>
        <ul>
          <li>
            Loss, theft, or unauthorized access to data transmitted through
            links
          </li>
          <li>Damage caused by following links or downloading files</li>
          <li>Violations of the law committed by users through the Service</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>4. Usage Terms</h2>
        <p>
          4.1. The Administration reserves the right to block or delete links
          without notice if they violate the law or these Terms.
        </p>
        <p>4.2. It is prohibited to use the Service for:</p>
        <ul>
          <li>Distributing malware, pornography, or extremist materials</li>
          <li>Fraud, deception, or other unlawful activities</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>5. Final Provisions</h2>
        <p>
          5.1. The Administration reserves the right to modify these Terms
          without notifying users.
        </p>
        <p>
          5.2. Continued use of the Service after changes constitutes acceptance
          of the new terms.
        </p>
      </div>
    </div>
  );
};
