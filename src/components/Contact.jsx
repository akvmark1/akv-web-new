import React, { useState } from 'react';
import { Phone, Mail, MapPin, Globe, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Open default mailto with formatted fields as in original site
    const subject = encodeURIComponent(`Mission Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nOrganization: ${formData.organization}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:hello@akashvahini.in?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-navy relative border-t border-white/10">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Info & Value Prop */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-amber uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 bg-amber rounded-full" />
                <span>Get in Touch</span>
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
                  href="mailto:hello@akashvahini.in"
                  className="flex items-start gap-4 p-4 glass-panel rounded-sm border border-white/10 hover:border-amber/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center text-amber group-hover:bg-amber group-hover:text-navy transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-white/40 uppercase">Inquiries &amp; Press</div>
                    <div className="text-sm font-semibold text-white mt-0.5">hello@akashvahini.in</div>
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
              <span>OFFICIAL DOMAIN: WWW.AKASHVAHINI.IN</span>
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
                  <span>Opening your email client to send your message to hello@akashvahini.in</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-2 uppercase">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
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
                    placeholder="Describe your payload, operating environment, range, or required inspection timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-sm text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-amber text-navy font-bold text-sm rounded-sm hover:bg-amber-glow transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 shadow-lg shadow-amber/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Send mission inquiry</span>
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
