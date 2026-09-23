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
export const isLocalStorage =
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
        slug: fields.slug({ name: { label: "URL Slug", description: "e.g. govcon, sap, design-engineering" } }),
        metaTitle: fields.text({ label: "Meta Title" }),
        metaDescription: fields.text({ label: "Meta Description", multiline: true }),

        heroEyebrow: fields.text({ label: "Hero Eyebrow" }),
        heroHeadline: fields.text({ label: "Hero Headline" }),
        heroSubheadline: fields.text({ label: "Hero Subheadline", multiline: true }),
        heroImage: imageField("Hero Image"),
        heroPrimaryLabel: fields.text({ label: "Hero Primary Button Label", validation: { isRequired: false } }),
        heroPrimaryHref: fields.text({ label: "Hero Primary Button URL", defaultValue: "/contact", validation: { isRequired: false } }),
        heroSecondaryLabel: fields.text({ label: "Hero Secondary Link Label", validation: { isRequired: false } }),
        heroSecondaryHref: fields.text({ label: "Hero Secondary Link URL", validation: { isRequired: false } }),
        heroSupportingLine: fields.text({ label: "Hero Supporting Line", validation: { isRequired: false } }),

        introHeading: fields.text({ label: "Intro Heading", validation: { isRequired: false } }),
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

        // Design & Engineering only: one line pointing AI-shaped requests to AI Consulting.
        crossLinkText: fields.text({ label: "Cross-link text", validation: { isRequired: false } }),
        crossLinkLabel: fields.text({ label: "Cross-link label", validation: { isRequired: false } }),
        crossLinkHref: fields.text({ label: "Cross-link URL", defaultValue: "/services/ai-consulting", validation: { isRequired: false } }),

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

        supportingHeading: fields.text({ label: "Supporting Services Heading", validation: { isRequired: false } }),
        supportingSubtitle: fields.text({ label: "Supporting Services Subtitle", multiline: true, validation: { isRequired: false } }),
        supportingServices: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          { label: "Supporting Services", itemLabel: (props) => props.fields.title.value }
        ),

        // GovCon only: monthly-support vs individual-pursuit cards.
        engagementEyebrow: fields.text({ label: "Engagement Eyebrow", validation: { isRequired: false } }),
        engagementHeading: fields.text({ label: "Engagement Heading", validation: { isRequired: false } }),
        engagementSubtitle: fields.text({ label: "Engagement Subtitle", multiline: true, validation: { isRequired: false } }),
        engagementOptions: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            href: fields.text({ label: "Link URL", defaultValue: "/contact" }),
            linkLabel: fields.text({ label: "Button Label" }),
            badge: fields.text({ label: "Badge", validation: { isRequired: false } }),
          }),
          { label: "Engagement Options (GovCon only)", itemLabel: (props) => props.fields.title.value }
        ),
        engagementNote: fields.text({ label: "Engagement capacity note", multiline: true, validation: { isRequired: false } }),

        // Shared process-diagram section — GovCon (6 stages, shortcut + loop)
        // and Design & Engineering (5 stages, conditional design-only branch).
        processEyebrow: fields.text({ label: "Process Eyebrow", validation: { isRequired: false } }),
        processHeading: fields.text({ label: "Process Heading", validation: { isRequired: false } }),
        processIntro: fields.text({ label: "Process Intro", multiline: true, validation: { isRequired: false } }),
        processStages: fields.array(
          fields.object({
            number: fields.text({ label: "Number", description: "e.g. 01" }),
            label: fields.text({ label: "Label", description: "e.g. ONBOARD AND ALIGN" }),
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            note: fields.text({ label: "Inline note", validation: { isRequired: false } }),
            iconKey: iconKeyField(),
          }),
          { label: "Process Stages", itemLabel: (props) => props.fields.title.value }
        ),
        processRows: fields.array(fields.integer({ label: "Stages in this row" }), {
          label: "Row split (e.g. 3, 3 or 3, 2)",
        }),
        processShortcutFromIndex: fields.integer({ label: "Shortcut: from stage index (0-based)", validation: { isRequired: false } }),
        processShortcutToIndex: fields.integer({ label: "Shortcut: to stage index (0-based)", validation: { isRequired: false } }),
        processShortcutLabel: fields.text({ label: "Shortcut label", validation: { isRequired: false } }),
        processLoopFromIndex: fields.integer({ label: "Loop: from stage index (0-based)", validation: { isRequired: false } }),
        processLoopToIndex: fields.integer({ label: "Loop: to stage index (0-based)", validation: { isRequired: false } }),
        processLoopLabel: fields.text({ label: "Loop label", validation: { isRequired: false } }),
        processBranchFromIndex: fields.integer({ label: "Branch: from stage index (0-based)", validation: { isRequired: false } }),
        processBranchToIndex: fields.integer({ label: "Branch: to stage index (0-based)", validation: { isRequired: false } }),
        processBranchLabel: fields.text({ label: "Branch label", validation: { isRequired: false } }),
        processCaption: fields.text({ label: "Process caption", multiline: true, validation: { isRequired: false } }),

        // GovCon only: Federal / SLED market coverage.
        marketHeading: fields.text({ label: "Market Coverage Heading", validation: { isRequired: false } }),
        marketCoverage: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          { label: "Market Coverage (GovCon only)", itemLabel: (props) => props.fields.title.value }
        ),
        marketSharedLine: fields.text({ label: "Market shared line", multiline: true, validation: { isRequired: false } }),

        // GovCon only, evidence-gated: keep hidden (default) until the team-experience
        // figures and their attribution are approved for publication.
        teamStatsVisible: fields.checkbox({ label: "Show team-experience stats (requires evidence approval)", defaultValue: false }),
        teamStatsHeading: fields.text({ label: "Team Stats Heading", validation: { isRequired: false } }),
        teamStats: fields.array(
          fields.object({ value: fields.text({ label: "Value" }), label: fields.text({ label: "Label" }) }),
          { label: "Team Stats", itemLabel: (props) => props.fields.label.value }
        ),
        teamStatsAttribution: fields.text({ label: "Attribution note", multiline: true, validation: { isRequired: false } }),

        // Design & Engineering only, ships hidden until Bobin supplies real samples.
        selectedWorkVisible: fields.checkbox({ label: "Show Selected Work (requires real samples)", defaultValue: false }),
        selectedWorkHeading: fields.text({ label: "Selected Work Heading", validation: { isRequired: false } }),
        selectedWorkIntro: fields.text({ label: "Selected Work Intro", multiline: true, validation: { isRequired: false } }),
        selectedWorkItems: fields.array(
          fields.object({
            title: fields.text({ label: "Project title" }),
            brief: fields.text({ label: "Project brief", multiline: true }),
            workDelivered: fields.text({ label: "Work delivered", multiline: true }),
            image: imageField("Visual"),
            link: fields.text({ label: "Link (optional)", validation: { isRequired: false } }),
            contextLabel: fields.select({
              label: "Context label",
              options: [
                { label: "BluJoy project", value: "bluejoy" },
                { label: "Team experience", value: "team" },
                { label: "Concept project", value: "concept" },
              ],
              defaultValue: "bluejoy",
            }),
          }),
          { label: "Selected Work items", itemLabel: (props) => props.fields.title.value }
        ),

        // Optional — GovCon and Design & Engineering no longer carry a testimonial
        // (the prior ones were fabricated); left available for a future, real one.
        testimonialHeading: fields.text({ label: "Testimonial Section Heading", validation: { isRequired: false } }),
        testimonialQuote: fields.text({ label: "Quote", multiline: true, validation: { isRequired: false } }),
        testimonialName: fields.text({ label: "Name", validation: { isRequired: false } }),
        testimonialTitle: fields.text({ label: "Title / Company", validation: { isRequired: false } }),
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
            stats: fields.text({ label: "Tag Label", description: "A short descriptive tag — avoid unverified numeric claims, e.g. 'Federal & SLED Support'" }),
            image: imageField("Illustration"),
            labelPosition: fields.select({
              label: "Label Position",
              options: [{ label: "Top", value: "top" }, { label: "Bottom", value: "bottom" }],
              defaultValue: "bottom",
            }),
            color: fields.select({
              label: "Accent Color",
              options: [
                { label: "Strong Blue", value: "#175CD3" },
                { label: "Teal Accent", value: "#0F766E" },
              ],
              defaultValue: "#175CD3",
            }),
          }),
          { label: "Pillars (3)", itemLabel: (props) => props.fields.title.value }
        ),

        whyUsEyebrow: fields.text({ label: "Why Us Eyebrow", defaultValue: "Why BluJoy" }),
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

        stepsHeading: fields.text({ label: "Steps Heading", defaultValue: "How to Get Started" }),
        stepsSubtitle: fields.text({ label: "Steps Subtitle" }),
        steps: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          { label: "Steps", itemLabel: (props) => props.fields.title.value }
        ),

        closingEnquiryHeading: fields.text({ label: "Closing Enquiry Heading", defaultValue: "What Would You Like Help With?" }),
        closingEnquiryBody: fields.text({ label: "Closing Enquiry Body", multiline: true }),

        faqHeading: fields.text({ label: "FAQ Heading", defaultValue: "Frequently Asked Questions" }),
        faqSubtitle: fields.text({ label: "FAQ Subtitle" }),
        faqs: fields.array(
          fields.object({
            question: fields.text({ label: "Question" }),
            answer: fields.text({ label: "Answer", multiline: true }),
          }),
          { label: "FAQs", itemLabel: (props) => props.fields.question.value }
        ),
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

        formHeading: fields.text({ label: "Form Heading", defaultValue: "Send an Enquiry" }),

        // Real business email only — no bracketed placeholders. Phone/address
        // are omitted entirely until the owner supplies real values.
        contactEmail: fields.text({ label: "Contact Email", validation: { isRequired: false } }),
      },
    }),

    aiConsultingPage: singleton({
      label: "AI Consulting Page",
      path: "content/pages/ai-consulting/",
      format: { data: "json" },
      schema: {
        heroEyebrow: fields.text({ label: "Hero Eyebrow", defaultValue: "AI Consulting & Solution Engineering" }),
        heroHeadline: fields.text({ label: "Hero Headline" }),
        heroSubheadline: fields.text({ label: "Hero Subheadline", multiline: true }),
        heroPrimaryLabel: fields.text({ label: "Primary Button Label", defaultValue: "Discuss Your Use Case" }),
        heroPrimaryHref: fields.text({ label: "Primary Button URL", defaultValue: "/contact?service=ai-consulting" }),
        heroSecondaryLabel: fields.text({ label: "Secondary Link Label", defaultValue: "See Example Use Cases" }),
        heroSecondaryHref: fields.text({ label: "Secondary Link URL", defaultValue: "#examples" }),
        heroImage: imageField("Hero Photo"),

        capabilitiesEyebrow: fields.text({ label: "Eyebrow", defaultValue: "Capabilities" }),
        capabilitiesHeading: fields.text({ label: "Heading", defaultValue: "What We Do" }),
        capabilitiesLead: fields.text({ label: "Lead Paragraph", multiline: true }),
        capabilities: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            iconKey: iconKeyField(),
          }),
          { label: "Capabilities (4)", itemLabel: (props) => props.fields.title.value }
        ),

        examplesHeading: fields.text({ label: "Examples Heading", defaultValue: "What We Can Help You Build" }),
        examplesIntro: fields.text({ label: "Examples Intro", multiline: true }),
        examples: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          { label: "Illustrative Examples (4)", itemLabel: (props) => props.fields.title.value }
        ),
        examplesTechNote: fields.text({ label: "Technology note", multiline: true }),

        processEyebrow: fields.text({ label: "Process Eyebrow", defaultValue: "How We Work" }),
        processHeading: fields.text({ label: "Process Heading" }),
        processIntro: fields.text({ label: "Process Intro", multiline: true }),
        processStages: fields.array(
          fields.object({
            number: fields.text({ label: "Number", description: "e.g. 01" }),
            label: fields.text({ label: "Label", description: "e.g. UNDERSTAND" }),
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            note: fields.text({ label: "Inline note", validation: { isRequired: false } }),
            iconKey: iconKeyField(),
          }),
          { label: "Process Stages (5)", itemLabel: (props) => props.fields.title.value }
        ),
        processRows: fields.array(fields.integer({ label: "Stages in this row" }), {
          label: "Row split (e.g. 3, 2)",
        }),
        processLoopFromIndex: fields.integer({ label: "Loop: from stage index (0-based)", validation: { isRequired: false } }),
        processLoopToIndex: fields.integer({ label: "Loop: to stage index (0-based)", validation: { isRequired: false } }),
        processLoopLabel: fields.text({ label: "Loop label", validation: { isRequired: false } }),
        processExitAtIndex: fields.integer({ label: "Exit: at stage index (0-based)", validation: { isRequired: false } }),
        processExitLabel: fields.text({ label: "Exit label", validation: { isRequired: false } }),
        processCaption: fields.text({ label: "Process caption", multiline: true, validation: { isRequired: false } }),

        engagementEyebrow: fields.text({ label: "Eyebrow", defaultValue: "Ways to Work With Us" }),
        engagementHeading: fields.text({ label: "Heading", defaultValue: "Ways to Work With Us" }),
        engagementLead: fields.text({ label: "Lead Paragraph", multiline: true }),
        engagementOptions: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            href: fields.text({ label: "Link URL", defaultValue: "/contact?service=ai-consulting" }),
            linkLabel: fields.text({ label: "Button Label" }),
          }),
          { label: "Engagement Options (3)", itemLabel: (props) => props.fields.title.value }
        ),

        whyUsHeading: fields.text({ label: "Why Us Heading", defaultValue: "Why Work With Us" }),
        whyUs: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            iconKey: iconKeyField(),
          }),
          { label: "Why Us (3)", itemLabel: (props) => props.fields.title.value }
        ),

        ctaHeading: fields.text({ label: "CTA Heading" }),
        ctaText: fields.text({ label: "CTA Text", multiline: true }),
        ctaLabel: fields.text({ label: "CTA Button Label", defaultValue: "Discuss Your Use Case" }),
        ctaHref: fields.text({ label: "CTA URL", defaultValue: "/contact?service=ai-consulting" }),
        ctaImage: imageField("CTA Photo"),
      },
    }),
  },
});
