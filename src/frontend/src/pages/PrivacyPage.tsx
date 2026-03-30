import { ArrowLeft, Shield } from "lucide-react";
import { motion } from "motion/react";

interface PrivacyPageProps {
  onBack: () => void;
}

const sections = [
  {
    title: "What We Collect",
    content:
      "Toss itself does not collect, store, or transmit any personal data. No name, email address, IP address, location, or usage data is ever recorded by our servers. Your flips stay entirely within your browser. However, third-party advertising services (such as Google AdSense) may collect data as described below.",
  },
  {
    title: "Cookies & Advertising",
    content:
      "This site uses Google AdSense to display advertisements. Google uses cookies and web beacons to serve ads based on prior visits to this website or other websites. The DoubleClick cookie is used by Google in the ad serving process. You can opt out of personalized advertising by visiting Google's Ads Settings at https://www.google.com/settings/ads.",
  },
  {
    title: "Third-Party Advertising",
    content:
      "Google AdSense is used to serve ads on this site. Google, as a third-party vendor, uses cookies to serve ads based on a user's prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to this and other sites. You can learn more about how Google uses your data by visiting https://policies.google.com/privacy.",
  },
  {
    title: "Children's Privacy",
    content:
      "Toss is intended for general audiences. We do not knowingly collect personal information from children under 13. In compliance with COPPA, Google AdSense may not serve personalized ads to users known to be minors. If you believe a child has provided us with personal information, please contact us and we will take steps to remove it.",
  },
  {
    title: "Your Rights & Opt-Out",
    content:
      "You may opt out of personalized advertising at any time by visiting Google's Ads Settings (https://www.google.com/settings/ads) or the Digital Advertising Alliance opt-out page at www.aboutads.info. For users in the European Economic Area (EEA) or United Kingdom, Google will display a consent prompt before serving personalized ads in compliance with applicable data protection laws.",
  },
  {
    title: "Changes to This Policy",
    content:
      'If this privacy policy changes in any meaningful way, we will update the "Last updated" date at the top of this page. Continued use of the site after any changes constitutes acceptance of the new policy.',
  },
  {
    title: "Contact",
    content:
      "Questions about privacy? Reach us at support@toss.app. We aim to respond within 48 hours.",
  },
];

export default function PrivacyPage({ onBack }: PrivacyPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-6 pt-28 pb-20"
    >
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-toss-orange transition-colors mb-10 group"
          data-ocid="privacy.back.button"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-[oklch(0.73_0.15_55/0.12)] flex items-center justify-center">
            <Shield className="w-6 h-6 text-toss-orange" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-toss-orange/70 mb-1">
              Legal
            </p>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground">
              Privacy Policy
            </h1>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mb-8 pl-16">
          Last updated: March 2026
        </p>

        {/* Summary banner */}
        <div className="glass-card rounded-2xl px-6 py-5 mb-6 flex items-start gap-4 border-l-4 border-toss-orange">
          <Shield className="w-5 h-5 text-toss-orange flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground leading-relaxed">
            <strong>Summary:</strong> We collect no personal data ourselves.
            This site uses Google AdSense which may use cookies for ad
            personalization. See below for details and opt-out options.
          </p>
        </div>

        {/* Sections */}
        <div className="glass-card rounded-3xl p-8 md:p-10 space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="space-y-3"
            >
              {i > 0 && (
                <div className="w-full h-px bg-[oklch(0.26_0.013_240/0.4)] -mt-4" />
              )}
              <h2 className="text-lg font-bold text-toss-orange uppercase tracking-wider">
                {section.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA back */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={onBack}
            className="orange-gradient text-[oklch(0.12_0.006_240)] font-bold uppercase tracking-widest text-sm px-8 py-3.5 rounded-full hover:shadow-[0_0_30px_oklch(0.73_0.15_55/0.6)] hover:-translate-y-0.5 transition-all duration-200"
            data-ocid="privacy.home.button"
          >
            Back to Home
          </button>
        </div>
      </div>
    </motion.div>
  );
}
