import Link from "next/link";

const footerColumns = [
  {
    title: "Services",
    links: [
      { label: "GovCon Solutions", href: "/services/govcon" },
      { label: "SAP Services", href: "/services/sap" },
      { label: "UI/UX & Digital Design", href: "/services/ui-ux-design" },
      { label: "Build & Engineering", href: "/services/build-engineering" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/resources" },
      { label: "Guides", href: "/resources" },
      { label: "FAQs", href: "/resources" },
      { label: "News & Events", href: "/resources" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Accessibility Statement", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-warm-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <img src="/blujoy-logo.svg" alt="Blujoy" className="h-7 w-auto mb-10" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-medium uppercase tracking-wider text-navy-900 mb-5">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-navy-600 hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-warm-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-navy-400">
            &copy; 2026 Blujoy. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-navy-400">
            <span>CMMC Level 1 Compliant</span>
            <span className="text-navy-200">|</span>
            <span>ISO 9001:2015</span>
            <span className="text-navy-200">|</span>
            <span>ISO 27001:2022</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
