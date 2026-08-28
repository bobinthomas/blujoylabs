import { config, collection, singleton, fields } from "@keystatic/core";
import { ICON_OPTIONS } from "./src/lib/icons";

/** CMS images live outside public/ so they aren't baked into the Worker's static-asset manifest at build time. */
const imageField = (label: string, description?: string) =>
  fields.image({
    label,
    directory: "content/media/images",
    publicPath: "/api/media/images/",
    description,
    validation: { isRequired: false },
  });

const iconKeyField = (label = "Icon") =>
  fields.select({
    label,
    options: ICON_OPTIONS as unknown as { label: string; value: string }[],
    defaultValue: "shield",
  });

const linkObject = (label: string) =>
  fields.object({
    label: fields.text({ label: "Label" }),
    href: fields.text({ label: "URL" }),
  }, { label });

/**
 * GitHub storage is the production default (Cloudflare Workers has no filesystem).
 * Local mode is dev-only (`next dev`) — never bake it into a Workers build.
 * Set KEYSTATIC_STORAGE=local + NEXT_PUBLIC_KEYSTATIC_STORAGE=local in .env.local.
 */
const isLocalStorage =
  process.env.NODE_ENV === "development" &&
  (process.env.KEYSTATIC_STORAGE === "local" || process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "local");

const storage = isLocalStorage
  ? ({ kind: "local" } as const)
  : ({ kind: "github", repo: "bobinthomas/blujoylabs" } as const);

export default config({
  storage,

  collections: {
    testimonials: collection({
      label: "Testimonials",
      slugField: "slug",
      path: "content/testimonials/*",
      format: { data: "json" },
      schema: {
        slug: fields.slug({ name: { label: "Identifier" } }),
        name: fields.text({ label: "Name" }),
        title: fields.text({ label: "Title / Company" }),
        quote: fields.text({ label: "Quote", multiline: true }),
      },
    }),

    caseStudies: collection({
      label: "Success Stories",
      slugField: "slug",
      path: "content/case-studies/*",
      format: { data: "json" },
      schema: {
        slug: fields.slug({ name: { label: "Identifier" } }),
        tag: fields.text({ label: "Tag", description: "e.g. GovCon Success" }),
        title: fields.text({ label: "Title" }),
        client: fields.text({ label: "Client" }),
        challenge: fields.text({ label: "Challenge", multiline: true }),
        solution: fields.text({ label: "Solution", multiline: true }),
        result: fields.text({ label: "Result", multiline: true }),
        resultHighlight: fields.text({ label: "Result Highlight", description: "Short badge shown on the card, e.g. $12M IDIQ Win" }),
        order: fields.integer({ label: "Display Order", defaultValue: 0 }),
      },
    }),

    jobPostings: collection({
      label: "Job Postings",
      slugField: "slug",
      path: "content/job-postings/*",
      format: { data: "json" },
      schema: {
        slug: fields.slug({ name: { label: "Identifier" } }),
        title: fields.text({ label: "Title" }),
        description: fields.text({ label: "Description", multiline: true }),
        order: fields.integer({ label: "Display Order", defaultValue: 0 }),
      },
    }),

    teamMembers: collection({
      label: "Leadership Team",
      slugField: "slug",
      path: "content/team-members/*",
      format: { data: "json" },
      schema: {
        slug: fields.slug({ name: { label: "Identifier" } }),
        name: fields.text({ label: "Name" }),
        title: fields.text({ label: "Title" }),
        photo: imageField("Photo"),
        order: fields.integer({ label: "Display Order", defaultValue: 0 }),
      },
    }),

    resources: collection({
      label: "Resources & Articles",
      slugField: "slug",
      path: "content/resources/*",
      format: { data: "json" },
      schema: {
        slug: fields.slug({ name: { label: "Identifier" } }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Blog & Articles", value: "blog-articles" },
            { label: "GovCon Guides", value: "govcon-guides" },
            { label: "SAP Best Practices", value: "sap-best-practices" },
            { label: "Design Systems Playbooks", value: "design-playbooks" },
            { label: "FAQs", value: "faqs" },
            { label: "News & Events", value: "news-events" },
          ],
          defaultValue: "blog-articles",
        }),
        title: fields.text({ label: "Title" }),
        href: fields.text({ label: "URL", defaultValue: "#" }),
        order: fields.integer({ label: "Display Order", defaultValue: 0 }),
      },
    }),

    servicePages: collection({
      label: "Service Pages",
      slugField: "slug",
      path: "content/services/*",
      format: { data: "json" },
      schema: {
        slug: fields.slug({ name: { label: "URL Slug", description: "e.g. govcon, sap, ui-ux-design, build-engineering" } }),
        metaTitle: fields.text({ label: "Meta Title" }),
        metaDescription: fields.text({ label: "Meta Description", multiline: true }),

        heroEyebrow: fields.text({ label: "Hero Eyebrow" }),
        heroHeadline: fields.text({ label: "Hero Headline" }),
        heroSubheadline: fields.text({ label: "Hero Subheadline", multiline: true }),
        heroImage: imageField("Hero Image"),

        introHeading: fields.text({ label: "Intro Heading" }),
        introParagraphs: fields.array(fields.text({ label: "Paragraph", multiline: true }), {
          label: "Intro Paragraphs",
          itemLabel: (props) => props.value.slice(0, 60) || "Paragraph",
        }),
        introImage: imageField("Intro Image"),

        pathwaysEyebrow: fields.text({ label: "Pathways Eyebrow", defaultValue: "Core Services" }),
        pathwaysHeading: fields.text({ label: "Pathways Heading" }),
        pathwaysSubtitle: fields.text({ label: "Pathways Subtitle", multiline: true }),
        pathways: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            href: fields.text({ label: "Link URL", defaultValue: "/contact" }),
            linkLabel: fields.text({ label: "Link Label" }),
            image: imageField("Photo"),
          }),
          { label: "Pathways (3)", itemLabel: (props) => props.fields.title.value }
        ),

        benefitsEyebrow: fields.text({ label: "Benefits Eyebrow", defaultValue: "Benefits" }),
        benefitsHeading: fields.text({ label: "Benefits Heading" }),
        benefitsSubtitle: fields.text({ label: "Benefits Subtitle", multiline: true }),
        benefits: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            iconKey: iconKeyField(),
          }),
          { label: "Benefits (4)", itemLabel: (props) => props.fields.title.value }
        ),

        supportingHeading: fields.text({ label: "Supporting Services Heading" }),
        supportingSubtitle: fields.text({ label: "Supporting Services Subtitle", multiline: true }),
        supportingServices: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          { label: "Supporting Services", itemLabel: (props) => props.fields.title.value }
        ),

        testimonialHeading: fields.text({ label: "Testimonial Section Heading" }),
        testimonialQuote: fields.text({ label: "Quote", multiline: true }),
        testimonialName: fields.text({ label: "Name" }),
        testimonialTitle: fields.text({ label: "Title / Company" }),
        testimonialImage: imageField("Photo"),

        ctaHeading: fields.text({ label: "CTA Heading" }),
        ctaDescription: fields.text({ label: "CTA Description", multiline: true }),
        ctaLabel: fields.text({ label: "CTA Button Label" }),
        ctaHref: fields.text({ label: "CTA URL", defaultValue: "/contact" }),
        ctaImage: imageField("CTA Photo"),

        faqHeading: fields.text({ label: "FAQ Heading", defaultValue: "Frequently Asked Questions" }),
        faqs: fields.array(
          fields.object({
            question: fields.text({ label: "Question" }),
            answer: fields.text({ label: "Answer", multiline: true }),
          }),
          { label: "FAQs (6)", itemLabel: (props) => props.fields.question.value }
        ),
      },
    }),
  },

  singletons: {
    siteSettings: singleton({
      label: "Site Settings",
      path: "content/site-settings/",
      format: { data: "json" },
      schema: {
        servicesLinks: fields.array(linkObject("Service Link"), {
          label: "Services (nav dropdown + footer Product column)",
          itemLabel: (props) => props.fields.label.value,
        }),
        headerCtaLabel: fields.text({ label: "Header CTA Label" }),
        headerCtaHref: fields.text({ label: "Header CTA URL", defaultValue: "/contact" }),

        footerTagline: fields.text({ label: "Footer Brand Tagline", multiline: true }),
        footerResourceLinks: fields.array(linkObject("Resource Link"), {
          label: "Footer Resources Column",
          itemLabel: (props) => props.fields.label.value,
        }),
        footerCompanyLinks: fields.array(linkObject("Company Link"), {
          label: "Footer Company Column",
          itemLabel: (props) => props.fields.label.value,
        }),
        footerSocialLinks: fields.array(
          fields.object({
            platform: fields.select({
              label: "Platform",
              options: [
                { label: "LinkedIn", value: "linkedin" },
                { label: "X", value: "x" },
                { label: "YouTube", value: "youtube" },
              ],
              defaultValue: "linkedin",
            }),
            href: fields.text({ label: "URL" }),
          }),
          { label: "Footer Social Links", itemLabel: (props) => props.fields.platform.value }
        ),
        footerNewsletterHeading: fields.text({ label: "Footer Newsletter Heading" }),
        footerCopyrightText: fields.text({ label: "Copyright Text" }),
      },
    }),

    homePage: singleton({
      label: "Home Page",
      path: "content/pages/home/",
      format: { data: "json" },
      schema: {
        heroBadge: fields.text({ label: "Hero Badge Text" }),
        heroHeadline: fields.text({ label: "Hero Headline" }),
        heroSubheadline: fields.text({ label: "Hero Subheadline", multiline: true }),
        heroImage: imageField("Hero Background Photo"),
        heroCtaPrimaryLabel: fields.text({ label: "Primary CTA Label" }),
        heroCtaPrimaryHref: fields.text({ label: "Primary CTA URL", defaultValue: "/contact" }),
        heroCtaSecondaryLabel: fields.text({ label: "Secondary CTA Label" }),
        heroCtaSecondaryHref: fields.text({ label: "Secondary CTA URL", defaultValue: "/services/govcon" }),

        floatingCards: fields.array(
          fields.object({
            type: fields.select({
              label: "Card Type",
              options: [
                { label: "Stat", value: "stat" },
                { label: "Feature", value: "feature" },
                { label: "Logo", value: "logo" },
                { label: "Photo", value: "photo" },
              ],
              defaultValue: "stat",
            }),
            eyebrow: fields.text({ label: "Eyebrow", validation: { isRequired: false } }),
            value: fields.text({ label: "Value (stat number / logo text)", validation: { isRequired: false } }),
            title: fields.text({ label: "Title", multiline: true }),
            image: imageField("Photo", "Only used when Card Type is Photo"),
            iconKey: fields.select({
              label: "Icon",
              options: [{ label: "None", value: "" }, ...(ICON_OPTIONS as unknown as { label: string; value: string }[])],
              defaultValue: "",
            }),
          }),
          { label: "Floating Cards", itemLabel: (props) => props.fields.title.value }
        ),

        pillarsEyebrow: fields.text({ label: "Pillars Eyebrow", defaultValue: "Core Services" }),
        pillarsHeading: fields.text({ label: "Pillars Heading" }),
        pillarsSubtitle: fields.text({ label: "Pillars Subtitle" }),
        pillars: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            href: fields.text({ label: "Link URL" }),
            stats: fields.text({ label: "Stat Label", description: "e.g. 150+ Proposals" }),
            image: imageField("Illustration"),
            labelPosition: fields.select({
              label: "Label Position",
              options: [{ label: "Top", value: "top" }, { label: "Bottom", value: "bottom" }],
              defaultValue: "bottom",
            }),
            color: fields.select({
              label: "Accent Color",
              options: [
                { label: "Blue", value: "#0068f9" },
                { label: "Violet", value: "#6736eb" },
                { label: "Forest Green", value: "#046645" },
              ],
              defaultValue: "#0068f9",
            }),
          }),
          { label: "Pillars (3)", itemLabel: (props) => props.fields.title.value }
        ),

        whyUsEyebrow: fields.text({ label: "Why Us Eyebrow", defaultValue: "Why Blujoy" }),
        whyUsHeading: fields.text({ label: "Why Us Heading" }),
        whyUs: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            iconKey: iconKeyField(),
          }),
          {
            label: "Why Us Cards (order matters — the first card renders larger)",
            itemLabel: (props) => props.fields.title.value,
          }
        ),

        logos: fields.array(fields.object({ name: fields.text({ label: "Name" }) }), {
          label: "Trust Logos",
          itemLabel: (props) => props.fields.name.value,
        }),

        caseStudyBadge: fields.text({ label: "Badge", defaultValue: "Featured Case Study" }),
        caseStudyHeadline: fields.text({ label: "Headline" }),
        caseStudyDescription: fields.text({ label: "Description", multiline: true }),
        caseStudyLinkLabel: fields.text({ label: "Link Label", defaultValue: "Read the Full Story" }),
        caseStudyHref: fields.text({ label: "Link URL", defaultValue: "/success-stories" }),

        stepsHeading: fields.text({ label: "Steps Heading", defaultValue: "How We Work" }),
        stepsSubtitle: fields.text({ label: "Steps Subtitle" }),
        steps: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          { label: "Steps", itemLabel: (props) => props.fields.title.value }
        ),

        testimonials: fields.array(fields.relationship({ label: "Testimonial", collection: "testimonials" }), {
          label: "Homepage Testimonials",
        }),

        faqHeading: fields.text({ label: "FAQ Heading", defaultValue: "Frequently Asked Questions" }),
        faqSubtitle: fields.text({ label: "FAQ Subtitle" }),
        faqs: fields.array(
          fields.object({
            question: fields.text({ label: "Question" }),
            answer: fields.text({ label: "Answer", multiline: true }),
          }),
          { label: "FAQs", itemLabel: (props) => props.fields.question.value }
        ),

        finalCtaHeadline: fields.text({ label: "Final CTA Headline" }),
        finalCtaDescription: fields.text({ label: "Final CTA Description" }),
        finalCtaPrimaryLabel: fields.text({ label: "Primary Button Label" }),
        finalCtaPrimaryHref: fields.text({ label: "Primary Button URL", defaultValue: "/contact" }),
        finalCtaSecondaryLabel: fields.text({ label: "Secondary Button Label" }),
        finalCtaSecondaryHref: fields.text({ label: "Secondary Button URL", defaultValue: "/success-stories" }),
      },
    }),

    aboutPage: singleton({
      label: "About Page",
      path: "content/pages/about/",
      format: { data: "json" },
      schema: {
        heroEyebrow: fields.text({ label: "Hero Eyebrow", defaultValue: "About Us" }),
        heroHeadline: fields.text({ label: "Hero Headline" }),
        heroSubheadline: fields.text({ label: "Hero Subheadline", multiline: true }),
        heroImage: imageField("Hero Photo"),

        storyHeading: fields.text({ label: "Story Heading", defaultValue: "Our Story" }),
        storyParagraphs: fields.array(fields.text({ label: "Paragraph", multiline: true }), {
          label: "Story Paragraphs",
          itemLabel: (props) => props.value.slice(0, 60) || "Paragraph",
        }),
        storyImage: imageField("Story Photo"),

        missionHeading: fields.text({ label: "Mission Heading", defaultValue: "Mission" }),
        missionText: fields.text({ label: "Mission Text", multiline: true }),
        visionHeading: fields.text({ label: "Vision Heading", defaultValue: "Vision" }),
        visionText: fields.text({ label: "Vision Text", multiline: true }),

        valuesHeading: fields.text({ label: "Values Heading", defaultValue: "Core Values" }),
        values: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          { label: "Core Values (numbered automatically)", itemLabel: (props) => props.fields.title.value }
        ),

        leadershipHeading: fields.text({ label: "Leadership Heading", defaultValue: "Leadership Team" }),

        trustHeading: fields.text({ label: "Trust Band Heading", defaultValue: "Certified. Compliant. Connected." }),
        certifications: fields.array(fields.object({ label: fields.text({ label: "Label" }) }), {
          label: "Certifications",
          itemLabel: (props) => props.fields.label.value,
        }),
        partnerships: fields.array(fields.object({ label: fields.text({ label: "Label" }) }), {
          label: "Partnerships",
          itemLabel: (props) => props.fields.label.value,
        }),

        locationsHeading: fields.text({ label: "Locations Heading", defaultValue: "Locations" }),
        locations: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            address: fields.text({ label: "Address" }),
          }),
          { label: "Locations", itemLabel: (props) => props.fields.name.value }
        ),

        ctaHeading: fields.text({ label: "CTA Heading" }),
        ctaDescription: fields.text({ label: "CTA Description", multiline: true }),
        ctaLabel: fields.text({ label: "CTA Button Label" }),
        ctaImage: imageField("CTA Photo"),
      },
    }),

    careersPage: singleton({
      label: "Careers Page",
      path: "content/pages/careers/",
      format: { data: "json" },
      schema: {
        heroEyebrow: fields.text({ label: "Hero Eyebrow", defaultValue: "Careers" }),
        heroHeadline: fields.text({ label: "Hero Headline" }),
        heroSubheadline: fields.text({ label: "Hero Subheadline", multiline: true }),
        heroImage: imageField("Hero Photo"),

        whyWorkHeading: fields.text({ label: "Why Work Heading", defaultValue: "Why Work With Us" }),
        whyWork: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          { label: "Why Work Cards (first card renders highlighted)", itemLabel: (props) => props.fields.title.value }
        ),

        cultureHeadline: fields.text({ label: "Culture Banner Headline", defaultValue: "Life at Blujoy" }),
        cultureText: fields.text({ label: "Culture Banner Text", multiline: true }),
        cultureImage: imageField("Culture Photo"),

        positionsHeading: fields.text({ label: "Positions Heading", defaultValue: "Open Positions" }),

        ctaHeading: fields.text({ label: "CTA Heading" }),
        ctaDescription: fields.text({ label: "CTA Description", multiline: true }),
        ctaLabel: fields.text({ label: "CTA Button Label" }),
        ctaImage: imageField("CTA Photo"),
      },
    }),

    industriesPage: singleton({
      label: "Industries Page",
      path: "content/pages/industries/",
      format: { data: "json" },
      schema: {
        heroEyebrow: fields.text({ label: "Hero Eyebrow", defaultValue: "Industries" }),
        heroHeadline: fields.text({ label: "Hero Headline" }),
        heroSubheadline: fields.text({ label: "Hero Subheadline", multiline: true }),
        heroImage: imageField("Hero Photo"),

        industries: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            bullets: fields.array(fields.text({ label: "Bullet" }), {
              label: "Bullets",
              itemLabel: (props) => props.value,
            }),
            image: imageField("Photo"),
          }),
          { label: "Industries", itemLabel: (props) => props.fields.title.value }
        ),

        ctaHeading: fields.text({ label: "CTA Heading" }),
        ctaDescription: fields.text({ label: "CTA Description", multiline: true }),
        ctaLabel: fields.text({ label: "CTA Button Label" }),
        ctaImage: imageField("CTA Photo"),
      },
    }),

    resourcesPage: singleton({
      label: "Resources Page",
      path: "content/pages/resources/",
      format: { data: "json" },
      schema: {
        heroEyebrow: fields.text({ label: "Hero Eyebrow", defaultValue: "Resources" }),
        heroHeadline: fields.text({ label: "Hero Headline" }),
        heroSubheadline: fields.text({ label: "Hero Subheadline", multiline: true }),
        heroImage: imageField("Hero Photo"),

        featuredCategory: fields.select({
          label: "Featured Category",
          description: "This category's articles get the large featured card at the top",
          options: [
            { label: "Blog & Articles", value: "blog-articles" },
            { label: "GovCon Guides", value: "govcon-guides" },
            { label: "SAP Best Practices", value: "sap-best-practices" },
            { label: "Design Systems Playbooks", value: "design-playbooks" },
            { label: "FAQs", value: "faqs" },
            { label: "News & Events", value: "news-events" },
          ],
          defaultValue: "blog-articles",
        }),
        featuredImage: imageField("Featured Photo"),

        newsletterHeading: fields.text({ label: "Newsletter Heading", defaultValue: "Never miss an update" }),
        newsletterDescription: fields.text({ label: "Newsletter Description", multiline: true }),
      },
    }),

    successStoriesPage: singleton({
      label: "Success Stories Page",
      path: "content/pages/success-stories/",
      format: { data: "json" },
      schema: {
        heroEyebrow: fields.text({ label: "Hero Eyebrow", defaultValue: "Success Stories" }),
        heroHeadline: fields.text({ label: "Hero Headline" }),
        heroSubheadline: fields.text({ label: "Hero Subheadline", multiline: true }),
        heroImage: imageField("Hero Photo"),

        metricsHeading: fields.text({ label: "Metrics Heading", defaultValue: "By the Numbers" }),
        metrics: fields.array(
          fields.object({
            value: fields.text({ label: "Value" }),
            label: fields.text({ label: "Label" }),
          }),
          { label: "Metrics", itemLabel: (props) => `${props.fields.value.value} ${props.fields.label.value}` }
        ),

        testimonialsHeading: fields.text({ label: "Testimonials Heading", defaultValue: "What Our Clients Say" }),
        testimonials: fields.array(fields.relationship({ label: "Testimonial", collection: "testimonials" }), {
          label: "Testimonials",
        }),

        ctaHeading: fields.text({ label: "CTA Heading" }),
        ctaDescription: fields.text({ label: "CTA Description", multiline: true }),
        ctaLabel: fields.text({ label: "CTA Button Label" }),
        ctaImage: imageField("CTA Photo"),
      },
    }),

    contactPage: singleton({
      label: "Contact Page",
      path: "content/pages/contact/",
      format: { data: "json" },
      schema: {
        heroEyebrow: fields.text({ label: "Hero Eyebrow", defaultValue: "Contact" }),
        heroHeadline: fields.text({ label: "Hero Headline" }),
        heroSubheadline: fields.text({ label: "Hero Subheadline", multiline: true }),
        heroImage: imageField("Hero Photo"),

        consultationHeading: fields.text({ label: "Consultation Form Heading", defaultValue: "Schedule a Consultation" }),
        consultationDescription: fields.text({ label: "Consultation Form Description", multiline: true }),

        inquiryHeading: fields.text({ label: "Inquiry Form Heading", defaultValue: "General Inquiry" }),
        inquiryDescription: fields.text({ label: "Inquiry Form Description", multiline: true }),

        serviceOptions: fields.array(fields.text({ label: "Option" }), {
          label: "Service Interest Dropdown Options",
          itemLabel: (props) => props.value,
        }),

        offices: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            address: fields.text({ label: "Address", validation: { isRequired: false } }),
            phone: fields.text({ label: "Phone", validation: { isRequired: false } }),
            email: fields.text({ label: "Email", validation: { isRequired: false } }),
          }),
          { label: "Offices", itemLabel: (props) => props.fields.name.value }
        ),

        socialLinks: fields.array(linkObject("Social Link"), {
          label: "Connect With Us Links",
          itemLabel: (props) => props.fields.label.value,
        }),
      },
    }),
  },
});
