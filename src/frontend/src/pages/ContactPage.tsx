import { ArrowLeft, CheckCircle2, Mail, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface ContactPageProps {
  onBack: () => void;
}

export default function ContactPage({ onBack }: ContactPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSubmitting(true);

    const mailtoSubject = encodeURIComponent(
      subject || "Contact from Toss website",
    );
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.open(
      `mailto:support@toss.app?subject=${mailtoSubject}&body=${mailtoBody}`,
      "_blank",
    );

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  const inputClass =
    "w-full bg-[oklch(0.16_0.008_240)] border border-[oklch(0.26_0.013_240/0.5)] rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[oklch(0.73_0.15_55/0.6)] transition-colors";

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
          data-ocid="contact.back.button"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-[oklch(0.73_0.15_55/0.12)] flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-toss-orange" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-toss-orange/70 mb-1">
              Get in Touch
            </p>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground">
              Contact Us
            </h1>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="md:col-span-2 space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[oklch(0.73_0.15_55/0.12)] flex items-center justify-center">
                  <Mail className="w-4 h-4 text-toss-orange" />
                </div>
                <p className="font-bold text-foreground text-sm uppercase tracking-wide">
                  Email Us
                </p>
              </div>
              <a
                href="mailto:support@toss.app"
                className="text-toss-orange hover:underline text-sm font-medium break-all"
                data-ocid="contact.email.link"
              >
                support@toss.app
              </a>
              <p className="text-xs text-muted-foreground mt-2">
                We typically respond within 48 hours.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-3">
              <p className="font-bold text-foreground text-sm uppercase tracking-wide">
                What can we help with?
              </p>
              {[
                "Bug reports",
                "Feature requests",
                "General feedback",
                "Media inquiries",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-toss-orange flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-3xl p-10 text-center space-y-4"
                data-ocid="contact.success_state"
              >
                <div className="w-16 h-16 rounded-full bg-[oklch(0.75_0.17_155/0.15)] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-toss-success" />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">
                  Message Sent!
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Thanks for reaching out. Your email client should have opened
                  with your message. We'll get back to you at{" "}
                  <span className="text-toss-orange font-medium">{email}</span>{" "}
                  within 48 hours.
                </p>
                <button
                  type="button"
                  onClick={onBack}
                  className="orange-gradient text-[oklch(0.12_0.006_240)] font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-full hover:-translate-y-0.5 transition-all duration-200 mt-2"
                  data-ocid="contact.home.button"
                >
                  Back to Home
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-3xl p-8 space-y-5"
                data-ocid="contact.form"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                    >
                      Name <span className="text-toss-orange">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      className={inputClass}
                      data-ocid="contact.name.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                    >
                      Email <span className="text-toss-orange">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className={inputClass}
                      data-ocid="contact.email.input"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="How can we help?"
                    className={inputClass}
                    data-ocid="contact.subject.input"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                  >
                    Message <span className="text-toss-orange">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what's on your mind..."
                    required
                    rows={5}
                    className={`${inputClass} resize-none`}
                    data-ocid="contact.message.textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !name || !email || !message}
                  className="orange-gradient text-[oklch(0.12_0.006_240)] font-bold uppercase tracking-widest text-sm px-8 py-3.5 rounded-full w-full hover:shadow-[0_0_30px_oklch(0.73_0.15_55/0.6)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                  data-ocid="contact.submit.button"
                >
                  {isSubmitting ? "Opening email client..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
