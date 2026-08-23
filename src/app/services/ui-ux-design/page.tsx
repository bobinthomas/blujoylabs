import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "UI/UX & Digital Design",
  description:
    "Brand identity, product design, web and app design, and design systems built around real users and business outcomes.",
};

const services = [
  {
    number: 1,
    title: "Brand Identity & Systems",
    tagline: "Logos, type, color and the rules that keep it all looking like you.",
    description:
      "Your brand is more than a logo. It's a system of visual rules that ensures consistency across every touchpoint — from your website to your proposal covers to your investor deck.",
    whatYouGet: [
      "Logo design and refinement",
      "Typography and color system development",
      "Brand guidelines and usage standards",
      "Stationery, templates, and collateral design",
      "Brand architecture for multi-product organizations",
    ],
    whoItsFor:
      "Startups defining their identity, established companies refreshing their look, and GovCon firms that need polished, compliant branding.",
  },
  {
    number: 2,
    title: "Product & UX Design",
    tagline: "Interfaces shaped around the job your user is actually trying to do.",
    description:
      "We don't design screens. We design workflows. Every interaction is mapped to a user goal, tested for clarity, and refined for conversion.",
    whatYouGet: [
      "User research and persona development",
      "Information architecture and journey mapping",
      "Wireframing and prototyping",
      "Usability testing and iteration",
      "Handoff documentation for development teams",
    ],
    whoItsFor: "Product teams building web or mobile applications that need to feel effortless.",
  },
  {
    number: 3,
    title: "Web Design",
    tagline: "Sites that look sharp and still convert on a phone.",
    description:
      "Your website is your hardest-working salesperson. We design sites that communicate authority, load fast, and guide visitors to action — on any device.",
    whatYouGet: [
      "Responsive web design",
      "Conversion-focused layout and UX",
      "SEO-optimized structure",
      "CMS integration (WordPress, headless, or custom)",
      "Performance and accessibility standards",
    ],
    whoItsFor: "Businesses that need a digital presence that earns trust and drives leads.",
  },
  {
    number: 4,
    title: "App Design",
    tagline: "Mobile-first product design, from first screen to ship.",
    description:
      "Native or cross-platform, consumer or enterprise — we design mobile experiences that users actually want to open.",
    whatYouGet: [
      "iOS and Android UI/UX design",
      "Design for cross-platform frameworks (Flutter, React Native)",
      "App store asset design",
      "Gesture and interaction design",
      "Design system integration for mobile",
    ],
    whoItsFor: "Teams launching a mobile product or extending their platform to handheld devices.",
  },
  {
    number: 5,
    title: "Design Systems in Figma",
    tagline: "Reusable components your team builds with instead of fights.",
    description:
      "Stop redesigning the same button. We build scalable design systems in Figma that unify your product, speed up development, and eliminate inconsistency.",
    whatYouGet: [
      "Component library and token architecture",
      "Figma auto-layout and variant systems",
      "Documentation and usage guidelines",
      "Developer handoff specs",
      "Ongoing system governance support",
    ],
    whoItsFor: "Growing product teams tired of visual drift and slow design-to-dev handoffs.",
  },
];

export default function UIUXPage() {
  return (
    <>
      <HeroSection
        headline="Design That Works as Hard as You Do"
        subheadline="Brand identity, product design, and digital experiences built around real users — and real business outcomes."
      />
      <section className="py-20 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s) => (
              <ServiceCard key={s.number} {...s} />
            ))}
          </div>
        </div>
      </section>
      <CTASection headline="Let's Design Something Worth Remembering" ctaText="Start a Design Project" />
    </>
  );
}
