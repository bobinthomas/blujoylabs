import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Build & Engineering",
  description:
    "Production-grade development — web development, UX engineering, CMS, AI prototyping, and Shopify.",
};

const services = [
  {
    number: 1,
    title: "Web Development",
    tagline: "Fast, accessible, production-grade front-end.",
    description:
      "We build websites and web applications that perform. Clean code, responsive layouts, and SEO-friendly architecture — from marketing sites to complex dashboards.",
    whatYouGet: [
      "Custom front-end development (React, Next.js, Vue)",
      "Back-end and API development",
      "Database design and integration",
      "Performance optimization and Core Web Vitals",
      "Accessibility compliance (WCAG)",
    ],
    whoItsFor: "Organizations needing high-performance web applications and marketing sites.",
  },
  {
    number: 2,
    title: "UX Engineering",
    tagline: "One person who designs the screen and ships the front-end.",
    description:
      "The gap between design and development is where great products die. Our UX engineers bridge it — designing in code, prototyping in the browser, and shipping faster.",
    whatYouGet: [
      "Design-to-code translation",
      "Interactive prototyping",
      "Component development in Storybook",
      "Design system implementation",
      "Rapid iteration and A/B testing support",
    ],
    whoItsFor:
      "Teams that need the design-to-development gap bridged by someone who speaks both languages.",
  },
  {
    number: 3,
    title: "CMS Development",
    tagline: "WordPress or headless. Content you control without calling a developer.",
    description:
      "Your marketing team needs autonomy. We build content management systems that are powerful for editors and painless for developers.",
    whatYouGet: [
      "WordPress custom theme and plugin development",
      "Headless CMS architecture (Strapi, Contentful, Sanity)",
      "Content modeling and migration",
      "Multi-language and multi-site support",
      "Training and documentation",
    ],
    whoItsFor:
      "Marketing teams and content-driven organizations that need editorial independence.",
  },
  {
    number: 4,
    title: "AI Product & MVP Prototyping",
    tagline: "Idea to working prototype in days, built with Cursor, v0, Lovable and Supabase.",
    description:
      "Have an AI-powered product idea? We prototype it fast — using modern AI-assisted development tools to go from concept to clickable demo in record time.",
    whatYouGet: [
      "AI feature concept and feasibility assessment",
      "Rapid prototyping with AI-assisted tools",
      "LLM integration (OpenAI, Claude, Gemini)",
      "Vector database and RAG implementation",
      "MVP scoping and roadmap",
    ],
    whoItsFor: "Innovators and founders looking to validate AI product ideas quickly.",
  },
  {
    number: 5,
    title: "Shopify & eCommerce",
    tagline: "Storefronts tuned to convert where it counts, on mobile.",
    description:
      "We design and build Shopify stores that turn browsers into buyers — with performance, UX, and conversion optimization baked in.",
    whatYouGet: [
      "Custom Shopify theme development",
      "Product page and checkout optimization",
      "App integration and custom functionality",
      "Subscription and membership setups",
      "Analytics and CRO implementation",
    ],
    whoItsFor: "eCommerce brands that need high-converting, mobile-first storefronts.",
  },
];

export default function BuildEngineeringPage() {
  return (
    <>
      <HeroSection
        headline="Built to Ship. Built to Scale."
        subheadline="Production-grade development that turns design into reality — fast, clean, and ready for real users."
      />
      <section className="py-20 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={s.number} {...s} delay={(i % 2) * 80} />
            ))}
          </div>
        </div>
      </section>
      <CTASection headline="Have a Product to Build?" ctaText="Let's Talk Engineering" />
    </>
  );
}
