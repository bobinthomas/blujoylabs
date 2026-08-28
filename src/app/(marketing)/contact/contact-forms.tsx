"use client";

import { useState } from "react";

type Office = { name: string; address: string; phone: string; email: string };
type SocialLink = { label: string; href: string };

export default function ContactForms({
  consultationHeading,
  consultationDescription,
  inquiryHeading,
  inquiryDescription,
  serviceOptions,
  offices,
  socialLinks,
}: {
  consultationHeading: string;
  consultationDescription: string;
  inquiryHeading: string;
  inquiryDescription: string;
  serviceOptions: string[];
  offices: Office[];
  socialLinks: SocialLink[];
}) {
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  return (
    <section className="py-20 sm:py-28 bg-warm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Consultation Form */}
          <div>
            <h2 className="text-2xl font-medium text-navy-900 mb-2">{consultationHeading}</h2>
            <p className="text-navy-600 mb-8">{consultationDescription}</p>
            {consultationSubmitted ? (
              <div className="bg-white border border-warm-border rounded-2xl p-8 text-center">
                <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-navy-900">Thank you!</h3>
                <p className="text-navy-600 mt-2">We&apos;ll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setConsultationSubmitted(true);
                }}
                className="bg-white rounded-2xl p-8 border border-warm-border space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-navy-800 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-warm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-800 mb-1.5">Company Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-warm"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-navy-800 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-warm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-800 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-warm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">Service Interest *</label>
                  <select
                    required
                    defaultValue=""
                    className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-warm"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">Tell Us About Your Project *</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-warm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">Preferred Date/Time</label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-warm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-all shadow-md"
                >
                  Book My Free Consultation
                </button>
              </form>
            )}
          </div>

          {/* General Inquiry Form */}
          <div>
            <h2 className="text-2xl font-medium text-navy-900 mb-2">{inquiryHeading}</h2>
            <p className="text-navy-600 mb-8">{inquiryDescription}</p>
            {inquirySubmitted ? (
              <div className="bg-white border border-warm-border rounded-2xl p-8 text-center">
                <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-navy-900">Message sent!</h3>
                <p className="text-navy-600 mt-2">We&apos;ll get back to you shortly.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setInquirySubmitted(true);
                }}
                className="bg-white rounded-2xl p-8 border border-warm-border space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-navy-800 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-warm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-800 mb-1.5">Company Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-warm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-warm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">Subject *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-warm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">Message *</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-warm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-all shadow-md"
                >
                  Send Message
                </button>
              </form>
            )}

            {/* Office Locations */}
            <div className="mt-12 space-y-4">
              {offices.map((office) => (
                <div key={office.name} className="bg-white rounded-2xl p-6 border border-warm-border">
                  <h3 className="font-medium text-navy-900 mb-1">{office.name}</h3>
                  {office.address && <p className="text-navy-600 text-sm">{office.address}</p>}
                  {office.phone && <p className="text-navy-600 text-sm mt-1">Phone: {office.phone}</p>}
                  {office.email && <p className="text-navy-600 text-sm">Email: {office.email}</p>}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-navy-400 uppercase tracking-wider mb-3">Connect With Us</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="px-4 py-2 bg-white text-navy-700 text-sm font-medium rounded-full border border-warm-border hover:bg-warm-dark transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
