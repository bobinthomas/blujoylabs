import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "SAP Services",
  description:
    "SAP implementation, S/4HANA migration, integration, and managed services delivered by certified consultants.",
};

const services = [
  {
    number: 1,
    title: "SAP Implementation & Migration",
    description:
      "Whether you're going live for the first time or moving from ECC to S/4HANA, we plan, execute, and stabilize your SAP journey.",
    whatYouGet: [
      "Business blueprint and process design",
      "System configuration and customization",
      "Data migration strategy and execution",
      "User acceptance testing and training",
      "Go-live support and hypercare",
    ],
    whoItsFor: "Organizations launching SAP or modernizing from legacy versions.",
  },
  {
    number: 2,
    title: "SAP S/4HANA Consulting",
    description:
      "S/4HANA isn't just an upgrade — it's a transformation. We help you realize the full value of real-time analytics, simplified data models, and Fiori UX.",
    whatYouGet: [
      "S/4HANA readiness assessment",
      "Conversion strategy (Brownfield, Greenfield, or Hybrid)",
      "Custom code remediation",
      "Fiori app enablement and UX modernization",
      "Post-go-live optimization",
    ],
    whoItsFor: "Enterprises ready to move to SAP's next-generation platform.",
  },
  {
    number: 3,
    title: "SAP Integration & Custom Development",
    description:
      "SAP doesn't live in a vacuum. We connect it to your CRM, HR, finance, and operations systems — and build what you need when standard doesn't cut it.",
    whatYouGet: [
      "API and middleware integration (SAP PI/PO, CPI)",
      "Custom ABAP and Fiori development",
      "Third-party system connectivity",
      "Workflow and automation design",
      "Integration testing and monitoring",
    ],
    whoItsFor:
      "Organizations with complex system landscapes that need SAP to talk to everything else.",
  },
  {
    number: 4,
    title: "SAP Support & Managed Services",
    description:
      "Keep your SAP environment healthy, secure, and evolving — without building an internal army.",
    whatYouGet: [
      "24/7 system monitoring and incident management",
      "Patch and upgrade management",
      "Performance tuning and optimization",
      "Security and compliance monitoring",
      "Functional and technical support desk",
    ],
    whoItsFor:
      "Organizations that need reliable SAP operations without the overhead of a large internal team.",
  },
  {
    number: 5,
    title: "SAP Analytics & Reporting",
    description:
      "Turn your SAP data into decisions. We design dashboards, reports, and analytics that give leadership the visibility they need.",
    whatYouGet: [
      "SAP Analytics Cloud implementation",
      "BW/4HANA and embedded analytics",
      "Custom report development",
      "Real-time operational dashboards",
      "Executive KPI and scorecard design",
    ],
    whoItsFor: "Leaders who need actionable insights from their SAP investment.",
  },
  {
    number: 6,
    title: "SAP Compliance & Security",
    description:
      "Protect your SAP environment and meet regulatory requirements with confidence.",
    whatYouGet: [
      "GRC (Governance, Risk, Compliance) implementation",
      "Access control and role design",
      "Audit preparation and remediation",
      "Security hardening and vulnerability assessment",
      "Segregation of duties analysis",
    ],
    whoItsFor:
      "Organizations in regulated industries or with strict internal governance requirements.",
  },
];

export default function SAPPage() {
  return (
    <>
      <HeroSection
        headline="Run Your Enterprise on SAP — Smarter"
        subheadline="Implementation, migration, integration, and support. Delivered by consultants who understand both the technology and the business it powers."
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
      <CTASection headline="Let's Modernize Your SAP Environment" ctaText="Talk to an SAP Consultant" />
    </>
  );
}
