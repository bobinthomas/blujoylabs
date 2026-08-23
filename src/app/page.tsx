import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

const pillars = [
  {
    title: "GovCon Solutions",
    description:
      "Navigate the federal marketplace with confidence. From opportunity identification to proposal submission and contract management, we position your business to win.",
    href: "/services/govcon",
    stats: "150+ Proposals",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "SAP Services",
    description:
      "Modernize, migrate, and maximize your SAP investment. Implementation, S/4HANA, integration, and ongoing support — delivered by certified consultants.",
    href: "/services/sap",
    stats: "50+ SAP Projects",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    title: "UI/UX & Digital Design",
    description:
      "Interfaces that feel intentional. Brands that feel unmistakably you. From product design to design systems, we craft digital experiences that drive results.",
    href: "/services/ui-ux-design",
    stats: "100+ Design Systems",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
];

const whyUs = [
  {
    title: "GovCon Expertise",
    description: "Deep understanding of federal acquisition, compliance, and proposal best practices.",
  },
  {
    title: "SAP-Certified Consultants",
    description: "Real-world experience across S/4HANA, integrations, and enterprise deployments.",
  },
  {
    title: "Design-Led Thinking",
    description: "Every interface, brand, and system we build starts with the user in mind.",
  },
  {
    title: "Compliance-First",
    description: "CMMC, ISO 27001, and ISO 9001 aligned processes across every engagement.",
  },
  {
    title: "Flexible Engagement Models",
    description: "Project-based, retainer, or fractional support — tailored to your pace and budget.",
  },
];

const trustMetrics = [
  { value: "20+", label: "Years of Combined Experience" },
  { value: "$500M+", label: "Contract Value Supported" },
  { value: "150+", label: "Proposals Delivered" },
  { value: "50+", label: "SAP Projects Completed" },
  { value: "100+", label: "Design Systems Shipped" },
  { value: "95%", label: "Client Retention Rate" },
];

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    description: "We learn about your business, challenges, and goals in a free 30-minute consultation.",
  },
  {
    number: "02",
    title: "Strategy & Proposal",
    description: "Our team develops a tailored engagement plan with clear deliverables and timelines.",
  },
  {
    number: "03",
    title: "Execute & Deliver",
    description: "We get to work — with regular check-ins, transparent progress, and measurable results.",
  },
];

const logos = [
  { name: "SAM.gov" },
  { name: "SAP" },
  { name: "Figma" },
  { name: "AWS" },
  { name: "Microsoft" },
  { name: "Salesforce" },
  { name: "ServiceNow" },
];

const testimonials = [
  {
    quote: "They guided us from zero GovCon experience to a $12M IDIQ win in under 8 months. Their team felt like an extension of our own.",
    name: "Sarah Mitchell",
    title: "CEO, TechBridge Federal",
    company: "TechBridge Federal",
  },
  {
    quote: "Our SAP migration was complex and time-sensitive. They delivered on time with 30% less custom code than expected.",
    name: "James Rodriguez",
    title: "CTO, Precision Manufacturing",
    company: "Precision Manufacturing",
  },
  {
    quote: "The brand redesign transformed our credibility. Inbound leads tripled within the first quarter.",
    name: "David Chen",
    title: "VP Marketing, Atlas Defense",
    company: "Atlas Defense",
  },
];

const faqs = [
  {
    question: "How long does a typical proposal take?",
    answer: "A standard federal proposal takes 4-6 weeks from kickoff to submission. Expedited timelines are available for tight deadlines.",
  },
  {
    question: "Do I need past performance to win a government contract?",
    answer: "Not necessarily. We help first-time contractors build winning proposals using capability demonstrations, key personnel experience, and subcontracting history.",
  },
  {
    question: "What's the difference between ECC and S/4HANA?",
    answer: "S/4HANA is SAP's next-generation ERP suite built on an in-memory database. It offers real-time analytics, simplified data models, and a modern Fiori user interface compared to the legacy ECC platform.",
  },
  {
    question: "How much does a design system cost?",
    answer: "Design systems typically range from $25K-$100K depending on scope, components needed, and platform complexity. We offer phased approaches to spread investment over time.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 lg:py-36 bg-warm overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-100 opacity-40" />
          <div className="absolute top-1/2 -left-20 w-64 h-64 rounded-full bg-blue-50 opacity-50" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full border border-warm-border text-sm font-medium text-navy-600 mb-6 shadow-sm">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            GovCon &bull; SAP &bull; Digital Design
          </div>
          <h1 className="animate-fade-in-up stagger-1 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-navy-900">
            From Strategy to Submission.{" "}
            <span className="text-blue-600">From Design to Deployment.</span>
          </h1>
          <p className="animate-fade-in-up stagger-2 mt-6 text-lg sm:text-xl text-navy-600 max-w-2xl mx-auto leading-relaxed">
            We help government contractors win more bids, enterprises run smarter on SAP, and brands
            build digital experiences that convert.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg text-lg"
            >
              Schedule a Free Consultation
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/services/govcon"
              className="inline-flex items-center px-8 py-3.5 bg-white text-navy-700 font-semibold rounded-full border border-warm-border hover:bg-warm-dark transition-colors text-lg"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Metrics Bar */}
      <section className="py-12 bg-white border-y border-warm-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {trustMetrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">{metric.value}</div>
                <div className="mt-1 text-xs sm:text-sm text-navy-500">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Pillars - Bento Grid */}
      <section className="py-20 sm:py-28 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What We Do Best"
            subtitle="Three pillars of expertise. One unified partner."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group bg-white rounded-2xl p-8 card-shadow card-shadow-hover hover:-translate-y-1 transition-all duration-300 border border-warm-border"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-navy-900">{pillar.title}</h3>
                <p className="mt-3 text-navy-600 leading-relaxed text-[15px]">{pillar.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <Link
                    href={pillar.href}
                    className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Learn More
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <span className="text-xs font-medium text-navy-400 bg-navy-50 px-3 py-1 rounded-full">
                    {pillar.stats}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Us - Bento Grid */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Built for Complexity. Delivered with Clarity."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map((item, i) => (
              <div
                key={item.title}
                className={`rounded-2xl p-7 border border-warm-border ${
                  i === 0 ? "sm:col-span-2 lg:col-span-1 bg-blue-600 text-white" : "bg-warm"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                  i === 0 ? "bg-white/20 text-white" : "bg-blue-50 text-blue-600"
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${
                  i === 0 ? "text-blue-100" : "text-navy-600"
                }`}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Ticker */}
      <section className="py-16 bg-warm border-y border-warm-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-navy-400 mb-8">
            Trusted across government and enterprise ecosystems
          </p>
          <div className="flex items-center justify-center gap-10 sm:gap-16 flex-wrap opacity-40">
            {logos.map((logo) => (
              <span key={logo.name} className="text-lg sm:text-xl font-bold text-navy-700 tracking-tight">
                {logo.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 sm:p-12 lg:p-16 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <div className="inline-flex items-center px-3 py-1 bg-white/15 text-sm font-medium rounded-full mb-6">
                Featured Case Study
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight max-w-2xl">
                $12M Contract Win for a First-Time GovCon Entrant
              </h2>
              <p className="mt-5 text-blue-100 text-lg max-w-2xl leading-relaxed">
                We guided a small technology firm from SAM registration to their first major federal
                award — in under 8 months. Full GovCon readiness program including pipeline development and proposal writing.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/success-stories"
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-colors"
                >
                  Read the Full Story
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Steps */}
      <section className="py-20 sm:py-28 bg-warm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How We Work"
            subtitle="A clear process from first conversation to measurable results."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-40px)] h-px bg-warm-border" />
                )}
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-blue-600 text-blue-600 flex items-center justify-center mx-auto text-2xl font-bold shadow-sm">
                    {step.number}
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-navy-900">{step.title}</h3>
                  <p className="mt-2 text-navy-600 text-[15px] leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What Our Clients Say"
            subtitle="Real results from real partnerships."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-warm rounded-2xl p-7 border border-warm-border card-shadow">
                <svg className="w-8 h-8 text-blue-600/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                </svg>
                <p className="text-navy-700 leading-relaxed text-[15px]">{t.quote}</p>
                <div className="mt-5 pt-5 border-t border-warm-border">
                  <p className="font-bold text-navy-900 text-sm">{t.name}</p>
                  <p className="text-navy-500 text-xs mt-0.5">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-warm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Quick answers to common questions."
          />
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group bg-white rounded-xl border border-warm-border overflow-hidden card-shadow">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-navy-900 hover:text-blue-600 transition-colors">
                  {faq.question}
                  <svg className="w-5 h-5 text-navy-400 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-navy-600 text-[15px] leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Ready to Win, Modernize, or Stand Out?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Let&apos;s talk about where you are — and where you want to go.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-colors shadow-md text-lg"
            >
              Book Your Free Strategy Call
            </Link>
            <Link
              href="/success-stories"
              className="inline-flex items-center px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-lg"
            >
              See Our Results
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
