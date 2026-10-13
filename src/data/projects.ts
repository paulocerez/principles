// Design projects + experience.
//
// Adding a design project:
//   1. Drop screenshots into src/assets/projects/<slug>/ named 01.png, 02.jpg, …
//      They're sorted by filename; the first one is the cover.
//      Supported: png, jpg, jpeg, webp, avif, svg, and mp4/webm videos
//      (videos autoplay muted on a loop; a video can also be the cover).
//   2. Add an entry to `designProjects` below with the same slug.
//      `body` holds the case-study text, one string per paragraph.
//   Captions are optional and keyed by filename without extension ("02").
//
// Process case studies can add `sections` (Problem, Research, …). Each section
// pulls its media by filename from the same folder; anything not used by a
// section is shown at the end. Set `draft: true` to only show a project locally.

export interface DesignProject {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  roles: string[];
  tools: string[];
  body: string[]; // one string per paragraph
  captions?: Record<string, string>;
  url?: string;
  sections?: CaseSection[];
  stats?: { value: string; label: string }[]; // key numbers, shown on the card and in the dialog
  cover?: { color: string; logo?: string; label?: string }; // typographic card cover when there are no screenshots
  draft?: boolean; // shown in `npm run dev`, hidden on the live site
}

export interface CaseSection {
  title: string;
  body: string[];
  quotes?: string[];
  media?: string[]; // filenames without extension, from the project folder
  pair?: boolean; // show media side by side, e.g. before/after
}

export interface ProjectImage {
  src: string;
  name: string;
  video: boolean;
}

export const designProjects: DesignProject[] = [
  {
    // Process case study. Replace every [TODO] and add the missing images, then remove `draft`.
    slug: "emma-tasks",
    title: "Emma's Task Editor",
    tagline: "Letting vet staff teach an AI how to handle their calls.",
    year: "2025 – 2026",
    roles: ["Product Design", "User Research", "Frontend Development"],
    tools: ["Pen & paper", "Figma", "PostHog", "TypeScript", "React"],
    draft: true,
    body: [
      "Every veterinary practice handles calls differently. An emergency at one clinic means an immediate transfer, at another it means a few questions first. For Emma, Vetpal's AI voice assistant, to be useful, practices had to be able to tell her exactly how to handle each type of call. This case study shows how I designed the editor that lets them do that, without any technical knowledge.",
    ],
    sections: [
      {
        title: "Problem",
        body: [
          "At first, practices had no way to shape how Emma handled their calls. Under the hood, each practice's call flows lived in a free-form prompt that our team wrote and maintained internally. Every change, like a new emergency procedure or different questions for new patients, had to go through us, and practices couldn't see how Emma would actually behave.",
          "The editor had to work for the whole practice team, not one technical admin. Most staff are comfortable with software today, but they think about how a call should go, not about prompts.",
        ],
      },
      {
        title: "Research",
        body: [
          "In January 2026 I spoke with 20 to 25 practices in person at a veterinary trade fair in Leipzig, Germany.",
          "Their main wish was flexibility. They wanted to change how Emma works on their own, without waiting for us. This was especially true for bigger clinics, where one or two internal champions work with Vetpal every day and want to fine-tune it.",
          "That changed the goal. Instead of a settings page with a few options, the editor had to be a real tool for those champions, while staying simple enough for anyone else on the team.",
          "[TODO optional] Anything you saw in PostHog that supported this, or remove this line.",
        ],
        quotes: ["We want to change things ourselves without emailing you."],
      },
      {
        title: "Exploration",
        body: [
          "I explored three directions on paper before opening Figma: [TODO confirm or replace] a single free-text prompt where practices describe the behaviour in their own words, a fixed form with predefined options, and a workflow of steps that Emma works through in order.",
          "[TODO] Why did the free-text prompt fail (unpredictable results?), and why was the form too rigid?",
        ],
        media: ["02-sketch", "03-sketch"],
        pair: true,
      },
      {
        title: "Decision",
        body: [
          "The workflow won because it matches how practice staff already think about a call: first ask about symptoms, then check if it's an emergency, then forward it. Each step is a plain-language card, conditions branch visibly, and availability rules like opening hours sit right next to the workflow they affect.",
          "[TODO] Any detail you're proud of, e.g. the step types with their own colours and icons, drag to reorder, or the hints field.",
        ],
        media: ["01-cover"],
      },
      {
        title: "Before & after",
        body: ["[TODO] One or two sentences on what changed between the first version and today."],
        media: ["04-before", "05-after"],
        pair: true,
      },
      {
        title: "Result",
        body: [
          "[TODO] One concrete number, e.g. share of practices that set up tasks themselves, setup time before vs. after, or fewer support requests about Emma's behaviour.",
        ],
      },
    ],
    captions: {
      "01-cover": "The final task editor: an emergency-forwarding workflow",
      "02-sketch": "Early sketch: [TODO]",
      "03-sketch": "Early sketch: [TODO]",
      "04-before": "Before: [TODO]",
      "05-after": "After: [TODO]",
    },
  },
  {
    slug: "vetpal",
    title: "Vetpal",
    tagline: "An AI communication platform for veterinary clinics.",
    year: "2025 – Present",
    roles: ["Product Development", "Engineering", "Design"],
    tools: ["Figma", "TypeScript", "React", "PostHog", "Pen & paper"],
    url: "https://vetpal.de/",
    stats: [
      { value: "120", label: "practices" },
      { value: "€600k+", label: "annual recurring revenue" },
    ],
    body: [
      "Vetpal is an AI communication platform for veterinary clinics. Its voice assistant, Emma, answers calls around the clock, books, moves and cancels appointments, and routes emergencies to the right person. Practice teams can focus on the animals in front of them instead of a phone that never stops ringing.",
      "I co-founded Vetpal in 2025 and lead product development, engineering and design. I built the entire product on my own, from the first sketches to the version practices use every day. User experience is at the centre of my daily work.",
      "Before I design anything, I talk to the people who will use it. I've run a large number of customer calls and interviews with vets and front-desk staff. I turn what I learn into hand-drawn sketches and user stories, which help me work out how someone between two appointments can understand a screen at a glance. Those sketches become designs in Figma, and I build them myself in TypeScript and React.",
      "After launch, I use PostHog to watch how practices actually use the platform and to find where they get stuck, then feed that back into the next iteration. Today Vetpal is used by 120 practices and brings in more than €600k in annual recurring revenue.",
    ],
    sections: [
      {
        title: "The product",
        body: [],
        media: ["00-website", "01", "02", "03", "04", "05"],
      },
      {
        title: "Details",
        body: ["Small things most people wouldn't notice, but that make the product faster to use every day."],
        media: ["06-steps", "07-preview", "08-badges", "09-conditions"],
        pair: true,
      },
    ],
    captions: {
      "00-website": "The website: Emma introduced as a character, because practices hire a receptionist, not software",
      "01": "Dashboard: key numbers first, so a practice owner sees how Emma is doing within seconds",
      "02": "Inbox: every channel in one list, so staff don't have to jump between phone, WhatsApp and email",
      "03": "Task editor: call flows as plain-language steps, because that's how staff already describe a call",
      "04": "Form builder: a live phone preview, because pet owners fill these forms out on their phones",
      "05": "Contacts: the full history next to the contact details, so staff have context before calling back",
      "06-steps": "Every step type has its own colour and icon, so a long workflow can be scanned without reading every line",
      "07-preview": "The preview updates while you edit, so there's no guessing how the form will look for pet owners",
      "08-badges": "Badges like Repeat caller and a 1-2-3 feedback scale show what matters before anyone reads the transcript",
      "09-conditions": "Conditions read like plain sentences, such as Repeated caller or Emma decides, instead of technical rules",
    },
  },
  {
    slug: "dirigent",
    title: "Dirigent",
    tagline: "The advisory bench startups can’t afford yet.",
    year: "2026 – Present",
    roles: ["Founder", "Product Design", "Engineering"],
    tools: ["Figma", "Next.js", "TypeScript", "Tailwind", "Motion"],
    url: "https://www.usedirigent.com/",
    body: [
      "Dirigent brings senior operators into early-stage startups for scoped pieces of work, like a first senior hire, a launch post, a landing page or a pitch deck. A founder raises a need in Slack, Dirigent turns it into a brief with a clear deliverable, timebox and fee, and a matched advisor takes it or passes. The founder keeps every decision.",
      "I founded Dirigent in 2026 and designed and built the whole product: how founders raise a request and get a brief inside Slack, how advisors are matched and receive the work on WhatsApp, email or Slack, and how outcomes are logged so good work earns the next request. I also created the brand and the website.",
      "The core design problem was trust on both sides. Founders need to know exactly what they get before anything starts, so every brief fixes the deliverable, quality bar, timebox and fee up front. Advisors need work that actually fits, so each brief arrives with the context already written, and passing on it carries no penalty. Everyone works in one shared thread.",
      "The brand makes an abstract service feel tangible. I used paper as the metaphor: requests become briefs, advisors get a desk of them, and taking one stamps it “Yours”. On the website, both heroes are small working simulations of the product instead of screenshots, and motion pauses under the pointer and switches off for anyone who prefers reduced motion.",
    ],
    sections: [
      {
        title: "The product",
        body: [],
        media: ["01", "02", "03", "04"],
      },
    ],
    captions: {
      "01": "Startup hero: a fanned stack of briefs, each matched to an advisor, so the idea lands before anyone reads a word",
      "02": "Advisor hero: briefs land on a desk and can be taken or passed, a working simulation instead of a screenshot",
      "03": "Real advisors from the network up front, because trust is the first question a founder asks",
      "04": "How partnering works in four steps, each ending in a one-line promise like “Your calendar stays yours”",
    },
  },
  {
    slug: "ponto",
    title: "Ponto",
    tagline: "An AI sourcing tool for hiring managers.",
    year: "2025",
    roles: ["Founder", "Product", "Engineering", "Design"],
    tools: ["Figma", "Framer", "TypeScript", "React", "PostHog", "Pen & paper"],
    body: [
      "Ponto helps hiring managers at VC-backed Series A startups find the right candidates on LinkedIn. Instead of building complicated search filters, they describe the person they're looking for in plain language. Ponto finds and ranks matching profiles and then handles the outreach automatically. It works best for teams hiring for several roles at once.",
      "I founded Ponto in 2025 and managed product and engineering, including all of the design. I designed the product in Figma, built the marketing site in Framer, and built the app itself in TypeScript and React.",
      "The hardest problem was turning a vague description into a precise search. I designed a flow where Ponto shows how it understood the request as editable criteria, so users can correct it before any candidates are ranked.",
      "We ran pilots with 10 startups and earned our first revenue. Talking to those hiring managers taught me a lot about what teams will actually pay for, and those lessons led me to my next company, Vetpal.",
    ],
    captions: {
      "01": "Demo: a plain-language description becomes editable search factors, then ranked candidates",
    },
  },
  {
    slug: "ivy-merchant-dashboard",
    title: "Ivy Merchant Dashboard",
    tagline: "Settlement tracking for enterprise merchants on Ivy’s payment network.",
    year: "2024",
    roles: ["Product Design", "Frontend Engineering"],
    tools: ["TypeScript", "React"],
    url: "https://augustus.com/",
    stats: [{ value: "6–7 figures", label: "in settlements tracked per merchant" }],
    cover: { color: "#1f3dff", label: "Ivy, now Augustus" },
    body: [
      "Ivy, now Augustus, is a Berlin fintech that lets merchants accept instant account-to-account payments through open banking, without card networks in between. Founded in 2021, it raised a $20M Series A in 2023 and has since become Augustus, a $1B company building a US clearing bank for the internet era.",
      "In 2024 I built the Merchant Dashboard, where Ivy’s enterprise merchants tracked their settlements. For large merchants, these payouts ranged from a few hundred thousand to a few million dollars, so the dashboard was what finance teams relied on to see what had been paid out, what was still pending and what had arrived in their accounts.",
      "With that much money involved, trust was the main design goal. Every number had to be unambiguous and traceable: a clear status for each settlement, totals that match the underlying transactions, and details a finance team can check line by line.",
    ],
  },
  {
    slug: "lanch-partner-dashboard",
    title: "LANCH Partner Dashboard",
    tagline: "The operations hub for the restaurants behind LANCH’s delivery brands.",
    year: "2023",
    roles: ["Product Design", "Frontend Engineering"],
    tools: ["TypeScript", "React"],
    url: "https://lanch.com/",
    stats: [{ value: "80+", label: "partner businesses" }],
    cover: { color: "#231f42", logo: "/lanch-wordmark.png" },
    body: [
      "LANCH builds delivery food brands with Germany’s biggest creators, like Happy Slice with Knossi and Trymacs, and Loco Chicken with Luciano. Instead of running its own kitchens, LANCH cooks in partner restaurants that act as ghost kitchens, a network that has grown to around 350 delivery locations. Happy Slice alone sold more than 30,000 pizzas in its launch weekend, and LANCH has since raised a €26M Series A.",
      "I built the Partner Dashboard for the restaurants in that network. More than 80 partner businesses used it as the foundation for running LANCH brands in their kitchens: tracking deliveries and order volume, and connecting LANCH orders to their own POS systems.",
      "The users were restaurant operators, not office workers. The dashboard had to answer the essentials at a glance, like how many orders came in and what was delivered, and fit into how a busy kitchen already works instead of adding one more screen to manage.",
    ],
  },
];

const files = import.meta.glob("../assets/projects/*/*.{png,jpg,jpeg,webp,avif,svg,mp4,webm}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export function projectImages(slug: string): ProjectImage[] {
  const prefix = `../assets/projects/${slug}/`;
  return Object.entries(files)
    .filter(([path]) => path.startsWith(prefix))
    .map(([path, src]) => ({
      src,
      name: path.slice(prefix.length).replace(/\.[^.]+$/, ""),
      video: /\.(mp4|webm)$/.test(path),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
}

export const visibleProjects = designProjects.filter((p) => import.meta.env.MODE === "development" || !p.draft);

export function findDesignProject(slug: string): DesignProject | undefined {
  return visibleProjects.find((p) => p.slug === slug);
}

// Shown under the intro on /projects.
export const designPrinciples: { title: string; text: string }[] = [
  {
    title: "Glanceable over complete",
    text: "Practice staff look at the screen between two patients. What matters has to be clear in seconds.",
  },
  {
    title: "Plain language over settings",
    text: "Describe what happens, not how it's configured. Nobody should need a manual.",
  },
  {
    title: "Useful on day one",
    text: "Good defaults for everyone, and deeper options for the people who want them.",
  },
];

export interface Experience {
  name: string;
  years: string;
  url: string;
  logo: string;
  description: string;
}

export const experience: Experience[] = [
  {
    name: "Vetpal",
    years: "2025 – Present",
    url: "https://vetpal.de/",
    logo: "/vetpal.png",
    description:
      "Co-founder & CTO since 2025. I lead product, design and engineering, and built the platform that 120 veterinary practices now use every day.",
  },
  {
    name: "telli",
    years: "2025",
    url: "https://telli.com/",
    logo: "/telli.png",
    description:
      "Engineering and Customer Success. I set up the B2B customer success function from scratch and took on many zero-to-one projects along the way.",
  },
  {
    name: "Augustus",
    years: "2024",
    url: "https://augustus.com/",
    logo: "/augustus.png",
    description:
      "Software engineering. I built dashboards and backend services for e-commerce and crypto companies, alongside an exceptionally strong engineering team.",
  },
  {
    name: "LANCH",
    years: "2023",
    url: "https://lanch.com/",
    logo: "/lanch.png",
    description:
      "Product engineering. I built the Partner Dashboard that 80+ partner restaurants used to run LANCH’s delivery brands, from order tracking to POS integration.",
  },
];
