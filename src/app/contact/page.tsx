"use client";

import type { Metadata } from "next";
import { useState } from "react";
import HeroSection from "@/components/HeroSection";

const serviceOptions = ["GovCon Solutions", "SAP Services", "UI/UX & Digital Design", "Build & Engineering", "Other"];

export default function ContactPage() {
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  return (
    <>
      <HeroSection
        headline="Let's Start a Conversation"
        subheadline="Whether you're ready to engage or just exploring, we'd love to hear from you."
      />

      <section className="py-20 bg-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Consultation Form */}
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-2">Schedule a Consultation</h2>
              <p className="text-navy-600 mb-8">
                Book a free 30-minute strategy call with one of our senior consultants.
              </p>
              {consultationSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-bold text-green-800">Thank you!</h3>
                  <p className="text-green-700 mt-2">We&apos;ll be in touch within 24 hours.</p>
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
                      <label className="block text-sm font-semibold text-navy-800 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-warm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy-800 mb-1.5">Company Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-warm"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-navy-800 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-warm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy-800 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-warm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-800 mb-1.5">Service Interest *</label>
                    <select
                      required
                      className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-warm"
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-800 mb-1.5">Tell Us About Your Project *</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-warm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-800 mb-1.5">Preferred Date/Time</label>
                    <input
                      type="datetime-local"
                      className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-warm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-md"
                  >
                    Book My Free Consultation
                  </button>
                </form>
              )}
            </div>

            {/* General Inquiry Form */}
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-2">General Inquiry</h2>
              <p className="text-navy-600 mb-8">
                Have a question or want to learn more? Send us a message.
              </p>
              {inquirySubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-bold text-green-800">Message sent!</h3>
                  <p className="text-green-700 mt-2">We&apos;ll get back to you shortly.</p>
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
                      <label className="block text-sm font-semibold text-navy-800 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-warm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy-800 mb-1.5">Company Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-warm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-800 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-warm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-800 mb-1.5">Subject *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-warm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-800 mb-1.5">Message *</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-2.5 border border-warm-border rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-warm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-md"
                  >
                    Send Message
                  </button>
                </form>
              )}

              {/* Office Locations */}
              <div className="mt-12 space-y-4">
                <div className="bg-white rounded-2xl p-6 border border-warm-border">
                  <h3 className="font-bold text-navy-900 mb-1">Primary Office</h3>
                  <p className="text-navy-600 text-sm">[Your Primary Address]</p>
                  <p className="text-navy-600 text-sm mt-1">Phone: [Your Phone]</p>
                  <p className="text-navy-600 text-sm">Email: [Your Email]</p>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-warm-border">
                  <h3 className="font-bold text-navy-900 mb-1">Secondary Office</h3>
                  <p className="text-navy-600 text-sm">[Your Secondary Address, if applicable]</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="text-sm font-bold text-navy-400 uppercase tracking-wider mb-3">Connect With Us</h3>
                <div className="flex gap-3">
                  {["LinkedIn", "Twitter/X", "Instagram"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="px-4 py-2 bg-white text-navy-700 text-sm font-medium rounded-full border border-warm-border hover:bg-warm-dark transition-colors"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
