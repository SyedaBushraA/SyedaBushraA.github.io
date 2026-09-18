// ✏️ Projects + full case studies. Every claim here was checked against the real
// repositories (commit history and code) in September 2026 — edit carefully and
// don't re-add claims that were removed.
// Video slots: set `video` (mp4 in public/) + `poster` on any project.
export const projects = [
  {
    title: "Healio",
    kind: "Healthcare Marketplace",
    year: "2026",
    glyph: "he",
    caption: "a five-sided marketplace",
    accentA: "rgba(233,91,47,.5)",
    accentB: "rgba(231,227,201,.14)",
    video: null,
    poster: null,
    image: "/healio.jpg",
    blurb:
      "A healthcare marketplace connecting patients with doctors, hospitals, labs, pharmacies and insurers — backend, two mobile apps and a partner web portal. I wrote most of the code on a small team.",
    tech: ["NestJS · Prisma", "PostgreSQL · Supabase", "React Native · Expo", "Next.js", "Socket.IO", "Razorpay"],
    link: null, // private repositories — no public link yet
    role: "Primary developer — small team",
    sections: {
      "The idea":
        "One app for the whole healthcare journey. Patients book doctor and hospital visits, order medicines with a prescription upload, schedule lab tests, buy insurance and file claims, book home care, and chat with providers in real time. On the other side, five partner types — doctors, hospitals, labs, pharmacies and insurers — run their businesses through their own app.",
      "The challenge":
        "Five partner businesses are really five products pretending to be one. Every partner has to be paid into their own account, medical files must never be reachable by URL guessing, and the whole thing had to come together in weeks, not months.",
      "The process":
        "A NestJS + Prisma + PostgreSQL core on Supabase — 57 data models and roughly 300 REST endpoints across 33 feature modules — feeding four front ends: an Expo patient app (65 screens), an Expo partner app (69 screens), a 52-page Next.js partner portal and a React admin panel. I wrote the build plans and API docs first, then built module by module: I created 17 of the 33 backend modules and 25 of the 57 models.",
      "The solution":
        "Partner-owned Razorpay collection so each pharmacy, lab or hospital is paid directly — checkout, signature-verified webhooks, cash on delivery, scheduled refund retries and AES-256-GCM-encrypted gateway secrets. E-prescriptions, insurance claims, home care with nurses and physios, and a real-time chat gateway on Socket.IO. Then a hardening pass: HMAC-signed short-lived file links, per-IP rate limiting, magic-byte upload validation, SSRF and read-only SQL guards.",
      "The result":
        "A working end-to-end platform in about six weeks — backend, both mobile apps and the partner portal — with most of the code mine: 57 of the 65 patient screens, 37 of the 69 partner screens, and the entire partner web portal.",
      "My contribution":
        "The data model and most of the API layer, payments and file security, the partner web portal end-to-end, and the majority of both mobile apps — alongside two teammates who built the AI assistant, email sync and catalog integrations.",
    },
  },
  {
    title: "Bank Reconciliation",
    kind: "Matching Engine · Integrations",
    year: "2026",
    glyph: "brs",
    caption: "every payment, proven",
    accentA: "rgba(233,91,47,.35)",
    accentB: "rgba(136,168,167,.18)",
    video: null,
    poster: null,
    image: "/brs.jpg",
    blurb:
      "A reconciliation engine that proves every payment posted in the practice software actually reached the bank — a 13-pass matching cascade calibrated on real clinic books, fed by ERP, bank and patient-financing integrations.",
    tech: ["Python · FastAPI", "PostgreSQL", "Open Dental API", "Odoo JSON-RPC", "Cherry · Authorize.Net", "Next.js · React", "Playwright agent"],
    link: null, // internal product — no public link
    role: "Matching engine, integrations & capture agent",
    sections: {
      "The idea":
        "Every payment the front desk posts should be provable against the bank statement. Build the system that proves it — and that says plainly what is missing, rather than papering over it.",
      "The challenge":
        "Banks and practice software disagree constantly. An insurer pays thirty claims as one deposit; trace numbers arrive masked; card processors take fees and settle in batches — sometimes negative ones on refund days; paper checks get banked weeks late; financing providers fund net of plan-dependent fees; and payments get posted under the wrong payment type entirely.",
      "The process":
        "I measured real settlement behaviour on live books to derive per-rail timing windows and fee bands, then grew the matching cascade from 8 to 13 evidence-ranked passes: insurer remit groups, exact and masked-trace reference matching, card-batch settlement, combined deposits, payer lumps, refund netting, and a cross-rail bridge for electronic payments posted as checks and vice versa.",
      "The solution":
        "A per-rail reconciliation workspace: every matched row names the evidence that matched it, every unmatched row carries a likely cause and a suggested action, and approval stays human. Odoo bank feeds and Open Dental payments come in through their APIs; bank-statement CSVs from Bank of America and Chase can be imported directly; Cherry and Authorize.Net settlement data certifies deposits to the cent before matching begins. An on-prem Node.js/Playwright agent signs into the Cherry, Sunbit and CareCredit portals to capture settlement reports, driving the browser through an LLM navigation loop while credentials never enter the model's context.",
      "The result":
        "On a validation harness over two clinics' real month of books, auto-match rates rose from about 26–30% to 78–80% — backed by more than 250 pytest cases on the engine and 164 Vitest cases on the capture agent.",
      "My contribution":
        "The matching cascade and its calibration, the integrations and settlement certifications, the all-clinics summary screens, and the settlement-capture drivers on the on-prem agent.",
    },
  },
  {
    title: "Provider Credentialing",
    kind: "Workflow System",
    year: "2026",
    glyph: "cred",
    caption: "spreadsheet, retired",
    accentA: "rgba(136,168,167,.45)",
    accentB: "rgba(233,91,47,.28)",
    video: null,
    poster: null,
    blurb:
      "The system that replaced the spreadsheet tracking which dentist is enrolled with which insurance payer at which clinic — with a status workflow, live registry checks, spreadsheet import and expiry alerts.",
    tech: ["Python · FastAPI", "PostgreSQL · Alembic", "React · Next.js", "TypeScript · Zod", "exceljs", "pytest · Vitest"],
    link: null, // internal product — no public link
    role: "Full stack — designed and built",
    sections: {
      "The idea":
        "A dental group's credentialing team lived in a multi-tab spreadsheet: one tab per clinic, one row per dentist and payer, and no way to know what expires next month. Replace it with a system that knows.",
      "The challenge":
        "Provider × clinic × payer enrollments with a real status lifecycle, a spreadsheet full of inconsistent payer spellings that still had to import cleanly, sensitive fields like SSNs and bank numbers, and alerts that must fire reliably across enrollments, licenses, malpractice policies and continuing education.",
      "The process":
        "I specified the module first — status rules, access rules, import behaviour — then built a FastAPI/PostgreSQL backend with 59 REST routes across 11 tables and 3 Alembic migrations, and a React/Next.js front end: ten staff screens, a nine-step Add Provider wizard and a self-service page for dentists. The business rules exist as a TypeScript rules file and a Python twin, so the browser and the server agree.",
      "The solution":
        "A 9-status enrollment workflow with change history and optimistic locking; a four-step browser-side xlsx import that resolves clinic tabs, provider names and payer aliases against existing records; live NPI registry verification; Fernet encryption of SSNs and bank numbers; signed document downloads; and a six-hourly sweep that pushes and emails expiry alerts.",
      "The result":
        "Shipped and merged with 253 pytest and 432 Vitest cases green, and the credentialing team's tracker moved off the spreadsheet.",
      "My contribution":
        "The whole module — requirements, data model, API, rules engine, UI, import wizard, alerts and tests.",
    },
  },
  {
    title: "Training & Certification",
    kind: "Staff Learning Portal",
    year: "2026",
    glyph: "tc",
    caption: "watched, not skipped",
    accentA: "rgba(231,227,201,.3)",
    accentB: "rgba(233,91,47,.35)",
    video: null,
    poster: null,
    image: "/training.jpg",
    blurb:
      "A staff training portal for a multi-clinic group: role-assigned courses, onboarding tracks, anti-skip video tracking and e-signed PDF certificates — front end and AWS back end, built solo.",
    tech: ["React · TypeScript", "AWS CDK · Lambda", "API Gateway", "DynamoDB", "S3 · SES", "YouTube IFrame API", "jsPDF"],
    link: "https://todaysdentalinsights.com",
    role: "Full stack — sole author of the module",
    sections: {
      "The idea":
        "Every clinic role needs its own training, and a certificate should mean the material was actually watched. Give admins a place to publish courses and assign them by role, and give staff one place to learn, track progress and download their certificates.",
      "The challenge":
        "Video completion is easy to fake by scrubbing to the end. Courses arrive in many shapes — YouTube links, MP4s, documents, quizzes, whole HTML courses — and admins also wanted manuals, onboarding tracks, live sessions and expiry tracking, all inside one dashboard.",
      "The process":
        "I built both halves. The back end is its own AWS CDK stack: API Gateway and Lambda services for courses, enrollments, certifications, manuals, onboarding, notifications and reminders, 17 DynamoDB tables, S3 for course files, and a daily scheduled job that emails reminders through SES. The front end is React/TypeScript: a six-tab admin dashboard and an employee 'My Training' view over a typed API layer.",
      "The solution":
        "Segment-based anti-skip tracking over the YouTube IFrame API and HTML5 video that only completes at 90% genuinely watched, with an engagement hook that pauses on idle or hidden tabs and syncs progress every 30 seconds. Sandboxed iframe HTML courses that report completion through postMessage. A touch-enabled e-signature pad that renders certificates to PDF. Manual and onboarding-track builders, course access requests, notifications, and certification-expiry monitoring.",
      "The result":
        "A complete training workflow for admins and staff — publish, assign, learn, certify, monitor — live on the group's internal platform.",
      "My contribution":
        "The whole module, end to end: the AWS back end and infrastructure, and the React/TypeScript front end.",
    },
  },
  {
    title: "Rockaway Internal Medicine",
    kind: "Client Website · SEO",
    year: "2026",
    glyph: "rim",
    caption: "rockawayinternalmedicine.com",
    accentA: "rgba(136,168,167,.5)",
    accentB: "rgba(231,227,201,.35)",
    video: null,
    poster: null,
    image: "/rockaway.jpg",
    blurb:
      "A live marketing site for a two-location New York internal-medicine practice, built from scratch — React prerendered into SEO-complete static pages, with appointment requests, a health blog and an AI chat widget.",
    tech: ["React 18 · TypeScript", "Vite", "Prerendered static pages", "JSON-LD Schema", "AWS Amplify"],
    link: "https://rockawayinternalmedicine.com",
    role: "Full stack — build, content & SEO",
    sections: {
      "The idea":
        "A modern home for an adult primary-care practice with two Queens offices — where patients can find the right service, check their insurance plan, see live open/closed hours, read health articles, and request an appointment without picking up the phone.",
      "The challenge":
        "A React single-page app is pleasant to build, but search engines want real HTML. Every route needed correct titles, descriptions, canonicals, Open Graph tags and medical structured data — reliably, on every build.",
      "The process":
        "I built the site from the first commit: the design system, the service, condition, insurance, location and contact pages, the blog with its article template, and the structured data. With a teammate, a prerender step turns the React app into 28 flat, SEO-complete HTML pages driven by one typed route manifest, and a meta check fails the build if any title or description is out of spec.",
      "The solution":
        "Interactive layers on top of the static pages: an appointment-request form, a WebSocket AI chat widget, a live open/closed indicator computed from each office's hours, and a tap-to-check insurance list. Deployed on AWS Amplify.",
      "The result":
        "Live at rockawayinternalmedicine.com — 28 prerendered pages with structured data on every one, and a build that refuses to ship bad SEO.",
      "My contribution":
        "The site end-to-end — design system, pages, blog, structured data and interactive features; the prerender and deployment tooling together with a teammate.",
    },
  },
  {
    title: "Clinic Websites",
    kind: "Multi-site Front-end Work",
    year: "2025 — 2026",
    glyph: "web",
    caption: "one group, many practices",
    accentA: "rgba(136,168,167,.22)",
    accentB: "rgba(233,91,47,.3)",
    video: null,
    poster: null,
    image: "/concord.jpg",
    blurb:
      "Ongoing work across the dental group's patient-facing practice websites on three front-end stacks — booking and patient-portal flows, e-signed consent forms, an AI chat widget, SEO and content rollouts.",
    tech: ["React · TypeScript", "Astro", "Vite", "Bootstrap", "WebSockets", "JSON-LD SEO", "jsPDF"],
    link: "https://dentistinoregonoh.com",
    role: "Front end — features, fixes & rollouts",
    sections: {
      "The idea":
        "Each practice in the group has its own website, and patients meet the clinic there first. Keep them fast, accurate and useful: booking that works, forms that can be signed online, answers from a chat widget, and pages search engines understand.",
      "The challenge":
        "The sites span three generations of stack — Create React App, Astro with React islands, and Vite — so every feature had to be built once and rolled out many times without breaking the older builds.",
      "The process":
        "Working site by site across the group's repositories: reworked booking and patient-portal flows over the practice API (patient lookup by name and birthdate, reschedule and cancel, document upload), built consent e-signing that renders signed forms to PDF, and reworked the WebSocket chat widget with automatic reconnect, heartbeat and iOS fixes.",
      "The solution":
        "An SEO layer of schema.org JSON-LD structured data, sitemaps, per-route prerendered HTML and a build-time check on title and description lengths; an insurance-plan comparison hub rolled out across the Astro sites; seasonal blog content rolled out across the network; and rockawayinternalmedicine.com built from scratch.",
      "The result":
        "Hundreds of commits across the group's practice sites over a year — dentistinoregonoh.com and todaysdentallexington.com among the most worked on.",
      "My contribution":
        "Features, fixes and content rollouts across the sites; site redesigns and the deployment pipelines were led by teammates.",
    },
  },
  {
    title: "Dentipal",
    kind: "Dental Staffing Marketplace",
    year: "2026",
    glyph: "dp",
    caption: "clinics meet professionals",
    accentA: "rgba(233,91,47,.4)",
    accentB: "rgba(136,168,167,.3)",
    video: null,
    poster: null,
    blurb:
      "A marketplace where dental clinics post jobs and dental professionals apply — React/TypeScript front end with an AI chat widget and WebSocket inbox on an AWS Lambda, DynamoDB and Cognito backend.",
    tech: ["React · TypeScript", "AWS Lambda", "Amazon DynamoDB", "Amazon Cognito", "API Gateway · WebSocket"],
    link: null,
    role: "Full stack — features and fixes on an existing platform",
    sections: {
      "The idea":
        "Clinics need temporary and permanent dental staff; professionals need to find them. One place to post, search, apply and talk.",
      "The challenge":
        "Clinic-side roles lived in Cognito groups while clinic membership lived in DynamoDB, and the two disagreed in ways that produced empty dashboards and false access errors.",
      "The process":
        "I traced the role and membership model end to end, then fixed the access checks to use a single source of truth for clinic membership, compared group names case-insensitively, and moved job-posting dashboard reads onto the right DynamoDB secondary index so non-owners saw their clinic's postings.",
      "The solution":
        "Reliable clinic-side role-based access, correct job-posting and applicant views, professional-profile fields that read the attribute the writer actually stores, and the chat widget and inbox working over the WebSocket API.",
      "The result":
        "The clinic and professional flows worked end to end for testing, with the data-model traps documented so they would not come back.",
      "My contribution":
        "Front-end and Lambda-side features and fixes across roles, job postings, professional profiles and chat.",
    },
  },
  {
    title: "E-Commerce Platform",
    kind: "Payments & Serverless",
    year: "2024",
    glyph: "ec",
    caption: "razorpay · aws lambda",
    accentA: "rgba(233,91,47,.45)",
    accentB: "rgba(231,227,201,.12)",
    video: null,
    poster: null,
    blurb:
      "A personal full e-commerce build — catalog, cart, secure checkout — with Razorpay payments and a serverless notification service.",
    tech: ["React.js", "Python · Flask", "MySQL", "Razorpay API", "AWS Lambda"],
    link: "https://github.com/SyedaBushraA",
    role: "Full stack — personal project",
    sections: {
      "The idea":
        "Build the whole commerce loop myself: browse a catalog, fill a cart, pay securely, get notified — every step, no shortcuts.",
      "The challenge":
        "Payments are unforgiving. The checkout had to stay truthful about payment state even when a webhook arrives late, twice, or not at all.",
      "The process":
        "React front end over Flask REST APIs, with Razorpay integrated end-to-end and webhooks driving real-time payment status updates back into the order flow.",
      "The solution":
        "A complete storefront with secure checkout, plus an order-notification service on AWS Lambda so it scales without idle servers.",
      "The result":
        "End-to-end secure transactions with live payment status, and less infrastructure to run after the serverless move.",
      "My contribution":
        "I built the storefront, the payment integration and the serverless notification service.",
    },
  },
];
