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
}

export interface ProjectImage {
  src: string;
  name: string;
  video: boolean;
}

export const designProjects: DesignProject[] = [
  {
    slug: "vetpal",
    title: "Vetpal",
    tagline: "An AI communication platform for veterinary clinics.",
    year: "2025 – Present",
    roles: ["Product Development", "Engineering", "Design"],
    tools: ["Figma", "TypeScript", "React", "PostHog", "Pen & paper"],
    url: "https://vetpal.de/",
    body: [
      "Vetpal is an AI communication platform for veterinary clinics. Its voice assistant, Emma, answers calls around the clock, books, moves and cancels appointments, and routes emergencies to the right person. Practice teams can focus on the animals in front of them instead of a phone that never stops ringing.",
      "I co-founded Vetpal in 2025 and lead product development, engineering and design. I built the entire product on my own, from the first sketches to the version practices use every day. User experience is at the centre of my daily work.",
      "Before I design anything, I talk to the people who will use it. I've run a large number of customer calls and interviews with vets and front-desk staff. I turn what I learn into hand-drawn sketches and user stories, which help me work out how someone between two appointments can understand a screen at a glance. Those sketches become designs in Figma, and I build them myself in TypeScript and React.",
      "After launch, I use PostHog to watch how practices actually use the platform and to find where they get stuck, then feed that back into the next iteration. Today Vetpal is used by 120 practices and brings in more than €600k in annual recurring revenue.",
    ],
    captions: {
      "01": "Dashboard: every call Emma handled, at a glance",
      "02": "Inbox: calls, WhatsApp, email and forms in one place",
      "03": "Task editor: practices set up how Emma handles each type of call",
      "04": "Form builder with a live mobile preview",
      "05": "Contacts with the full history of every interaction",
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
      "01": "Demo: describing the role in a guided, step-by-step flow",
    },
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

export function findDesignProject(slug: string): DesignProject | undefined {
  return designProjects.find((p) => p.slug === slug);
}

export interface Experience {
  name: string;
  url: string;
  logo: string;
  description: string;
}

export const experience: Experience[] = [
  {
    name: "Vetpal",
    url: "https://vetpal.de/",
    logo: "/vetpal.png",
    description:
      "First venture. Doing essentially everything, especially technical stuff. Focussing on how to build a product from scratch that 100 people (vets) love. Still work in progress, but we're doing good I guess.",
  },
  {
    name: "telli",
    url: "https://telli.com/",
    logo: "/telli.png",
    description:
      "Did Engineering and Customer Success work. Learned a lot, especially from Seb. Focussed on setting up a b2b cs function from scratch and did lots of things 0 to 1.",
  },
  {
    name: "Augustus",
    url: "https://augustus.com/",
    logo: "/augustus.png",
    description:
      "Did Engineering. Felt like an impostor, was surrounded by some absolute beasts. Built dashboards and backend services for ecommerce and crypto firms.",
  },
];
