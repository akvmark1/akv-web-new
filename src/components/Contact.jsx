import React, { useState } from 'react';
import { Phone, Mail, MapPin, Globe, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  // Configured via .env or fallback for deployed production builds
  const GOOGLE_SHEETS_URL =
    import.meta.env.VITE_GOOGLE_SHEETS_URL ||
    'https://script.google.com/macros/s/AKfycbxooqyeKHpaK32iO8NVBufrD82eyKz6FlhFLwMLDBOMYY-A_ZbxEwjXUSRt9L6rqOuh/exec';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });
  // Honeypot field for bot detection (invisible to real users)
  const [botField, setBotField] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Sanitizes text to prevent CSV/Spreadsheet Formula Injection (=, +, -, @)
  const sanitizeForSheet = (str) => {
    if (!str) return '';
    const trimmed = str.trim();
    // Prefix single quote if string starts with formula trigger characters
    if (/^[=+\-@\t\r]/.test(trimmed)) {
      return `'${trimmed}`;
    }
    return trimmed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Bot check: If the hidden honeypot was filled, quietly drop the submission
    if (botField) {
      setSubmitted(true);
      return;
    }

    // 2. Client-side Rate Limiting (Prevent spam flooding)
    const LAST_SUBMIT_KEY = 'akv_contact_cooldown';
    const lastSubmitTime = localStorage.getItem(LAST_SUBMIT_KEY);
    const now = Date.now();
    if (lastSubmitTime && now - parseInt(lastSubmitTime, 10) < 30000) {
      const waitSeconds = Math.ceil((30000 - (now - parseInt(lastSubmitTime, 10))) / 1000);
      setError(`Please wait ${waitSeconds}s before submitting another inquiry.`);
      return;
    }

    // 3. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please provide a valid email address.');
      return;
    }

    // 4. Sanitize inputs against Formula Injection & enforce character boundaries
    const safeData = {
      name: sanitizeForSheet(formData.name).slice(0, 100),
      email: formData.email.trim().slice(0, 120),
      organization: sanitizeForSheet(formData.organization).slice(0, 120),
      message: sanitizeForSheet(formData.message).slice(0, 2000),
    };

    setLoading(true);

    if (GOOGLE_SHEETS_URL) {
      try {
        const payload = new FormData();
        payload.append('name', safeData.name);
        payload.append('email', safeData.email);
        payload.append('organization', safeData.organization);
        payload.append('message', safeData.message);
        payload.append('bot', botField);
        payload.append('timestamp', new Date().toISOString());

        // Using mode: 'no-cors' avoids browser CORS restrictions with Google Apps Script
        await fetch(GOOGLE_SHEETS_URL, {
          method: 'POST',
          body: payload,
          mode: 'no-cors',
        });

        localStorage.setItem(LAST_SUBMIT_KEY, Date.now().toString());
        setSubmitted(true);
        setFormData({ name: '', email: '', organization: '', message: '' });
      } catch (err) {
        console.error('Error submitting form:', err);
        setError('Failed to send inquiry. Please try again or email directly.');
      } finally {
        setLoading(false);
      }
    } else {
      // Fallback: If URL not configured yet, open mailto client
      const subject = encodeURIComponent(`Mission Inquiry from ${safeData.name}`);
      const body = encodeURIComponent(
        `Name: ${safeData.name}\nEmail: ${safeData.email}\nOrganization: ${safeData.organization}\n\nMessage:\n${safeData.message}`
      );
      window.location.href = `mailto:assist.akashvahini@gmail.com?subject=${subject}&body=${body}`;
      setSubmitted(true);
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-navy-2 relative border-t border-white/10">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Info & Value Prop */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-amber uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 bg-amber rounded-full" />
                <span>05 &middot; Commercial Engagement &amp; Field Trials</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
                Ready to see SEERIA in the field?
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-8">
                Talk to our founding engineering team about a live demonstration, pilot field
                mission, or strategic defense and industrial partnership.
              </p>

              {/* Direct Info List */}
              <div className="space-y-6">
                <a
                  href="tel:+917992626539"
                  className="flex items-start gap-4 p-4 glass-panel rounded-sm border border-white/10 hover:border-amber/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center text-amber group-hover:bg-amber group-hover:text-navy transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-white/40 uppercase">Direct Phone</div>
                    <div className="text-sm font-semibold text-white mt-0.5">+91 79926 26539</div>
                  </div>
                </a>

                <a
                  href="mailto:assist.akashvahini@gmail.com"
                  className="flex items-start gap-4 p-4 glass-panel rounded-sm border border-white/10 hover:border-amber/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center text-amber group-hover:bg-amber group-hover:text-navy transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-white/40 uppercase">Inquiries &amp; Press</div>
                    <div className="text-sm font-semibold text-white mt-0.5">assist.akashvahini@gmail.com</div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 glass-panel rounded-sm border border-white/10">
                  <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center text-amber">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-white/40 uppercase">Headquarters</div>
                    <div className="text-sm font-semibold text-white mt-0.5">
                      TIIR Building, NIT Rourkela
                    </div>
                    <div className="text-xs text-white/50">Odisha 769008, India</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-white/40">
              <Globe className="w-4 h-4 text-amber" />
              <span>OFFICIAL DOMAIN: WWW.AKASHVAHINI.COM</span>
            </div>
          </div>

          {/* Right Column: Mission Request Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 md:p-10 rounded-sm border border-white/10 shadow-2xl relative">
              <h3 className="text-2xl font-bold text-white mb-2">Book a call / Request a demo</h3>
              <p className="text-xs text-white/60 font-mono mb-8">
                SUBMITTING PREPARES A DIRECT INQUIRY DISPATCH FOR OUR TEAM
              </p>

              {submitted && (
                <div className="mb-6 p-4 rounded bg-accentgreen/10 border border-accentgreen/30 text-accentgreen flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>
                    {GOOGLE_SHEETS_URL
                      ? 'Thank you! Your mission inquiry has been saved. Our team will contact you shortly.'
                      : 'Opening your email client to send your message to assist.akashvahini@gmail.com'}
                  </span>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 rounded bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-3 text-sm">
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Anti-Bot Honeypot: Hidden from real users, traps scrapers & spam bots */}
                <div
                  className="opacity-0 absolute -left-[9999px] h-0 w-0 overflow-hidden pointer-events-none"
                  aria-hidden="true"
                >
                  <label htmlFor="company_website">Do not fill this</label>
                  <input
                    id="company_website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={botField}
                    onChange={(e) => setBotField(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-2 uppercase">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      placeholder="e.g. Vikram Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-sm text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-2 uppercase">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      maxLength={120}
                      placeholder="vikram@organization.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-sm text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-2 uppercase">
                    Organization / Department
                  </label>
                  <input
                    type="text"
                    maxLength={120}
                    placeholder="e.g. State Disaster Management / Power Grid Corp"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-sm text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-2 uppercase">
                    Mission Requirements / Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    maxLength={2000}
                    placeholder="Describe your payload, operating environment, range, or required inspection timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-sm text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-amber text-navy font-bold text-sm rounded-sm hover:bg-amber-glow transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 shadow-lg shadow-amber/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send mission inquiry</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center text-[11px] font-mono text-white/40">
                Responses typically dispatched within 24 hours &middot; NDA on request
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
