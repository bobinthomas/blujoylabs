import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "GovCon Solutions",
  description:
    "Win more government contracts with expert proposal development, capture management, and compliance support.",
};

const services = [
  {
    number: 1,
    title: "Proposal Development & Writing",
    description:
      "Federal proposals are not sales documents. They're compliance artifacts, technical narratives, and win strategies wrapped into one. We write proposals that score.",
    whatYouGet: [
      "Full RFP analysis and compliance matrix development",
      "Technical approach and management plan writing",
      "Past performance narrative development",
      "Price-to-win strategy support",
      "Color team reviews (Pink, Red, Gold)",
      "Final production and submission support",
    ],
    whoItsFor:
      "Small businesses entering GovCon, mid-tier contractors scaling their pipeline, and teams that need proposal capacity without hiring full-time staff.",
  },
  {
    number: 2,
    title: "Capture Management & Strategy",
    description:
      "Winning starts before the RFP drops. We help you identify, qualify, and position for opportunities long before the solicitation is released.",
    whatYouGet: [
      "Opportunity identification and qualification",
      "Competitive analysis and black hat reviews",
      "Win theme and discriminator development",
      "Teaming strategy and partner evaluation",
      "Customer relationship mapping",
      "Gate review process management",
    ],
    whoItsFor: "Contractors ready to move from reactive bidding to proactive capture.",
  },
  {
    number: 3,
    title: "Opportunity Identification & Pipeline Building",
    description:
      "Stop chasing every RFP. We build a curated pipeline of opportunities matched to your capabilities, certifications, and growth goals.",
    whatYouGet: [
      "Daily opportunity monitoring (SAM.gov, GovWin, etc.)",
      "Capability-to-opportunity matching",
      "Pipeline dashboard and reporting",
      "Set-aside and socio-economic program alignment",
      "Long-range forecasting and strategic planning",
    ],
    whoItsFor: "Businesses that want a consistent, predictable flow of qualified opportunities.",
  },
  {
    number: 4,
    title: "Contract Vehicle Support",
    description:
      "Get on the vehicles that matter. We help you navigate GSA Schedules, SEWP, IDIQs, and BPA vehicles from application to award.",
    whatYouGet: [
      "GSA Schedule preparation and submission",
      "SEWP catalog management",
      "IDIQ/BPA proposal support",
      "Contract modification and renewal support",
      "Compliance and reporting assistance",
    ],
    whoItsFor:
      "Contractors seeking recurring revenue through established government purchasing vehicles.",
  },
  {
    number: 5,
    title: "Contract Management & Administration",
    description:
      "Winning is only half the battle. We help you manage deliverables, compliance, and reporting so you perform — and get recompeted.",
    whatYouGet: [
      "Contract kickoff and transition planning",
      "Deliverable tracking and quality assurance",
      "Modification and change order support",
      "Closeout and final reporting",
      "Performance assessment preparation",
    ],
    whoItsFor:
      "Contractors managing multiple awards who need operational support to maintain compliance and client satisfaction.",
  },
  {
    number: 6,
    title: "Compliance & Regulatory Support",
    description:
      "From FAR clauses to CMMC requirements, we help you stay on the right side of every regulation that governs your contracts.",
    whatYouGet: [
      "FAR/DFARS compliance review",
      "CMMC readiness assessment",
      "Small business program compliance (8(a), HUBZone, WOSB, SDVOSB)",
      "DCAA/DCMA audit preparation",
      "Regulatory update monitoring",
    ],
    whoItsFor: "Any contractor who needs to maintain compliance as a condition of award or performance.",
  },
];

export default function GovConPage() {
  return (
    <>
      <HeroSection
        headline="Win More Government Contracts"
        subheadline="From your first SAM registration to your hundredth proposal — we guide, write, and strategize so you compete to win."
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
      <CTASection headline="Ready to Win Your Next Contract?" ctaText="Let's Build Your Proposal Strategy" />
    </>
  );
}
