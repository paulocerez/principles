// Design projects + experience.
//
// Adding a design project:
//   1. Drop screenshots into src/assets/projects/<slug>/ named 01.png, 02.jpg, …
//      They're sorted by filename; the first one is the cover.
//      Supported: png, jpg, jpeg, webp, avif, svg.
//   2. Add an entry to `designProjects` below with the same slug.
//   Captions are optional and keyed by filename without extension ("02").

export interface DesignProject {
  slug: string;
  title: string;
  year: string;
  role: string;
  tools: string[];
  summary: string;
  intro: string;
  captions?: Record<string, string>;
  url?: string;
}

export interface ProjectImage {
  src: string;
  name: string;
}

export const designProjects: DesignProject[] = [
  {
    slug: "example",
    title: "Example Project",
    year: "2026",
    role: "UI/UX Design",
    tools: ["Figma", "Illustrator"],
    summary: "Placeholder — replace with a real project before handing in.",
    intro:
      "A short paragraph about the brief, the problem and the outcome. What was the context, what did you design, and what did you learn along the way?",
    captions: {
      "01": "Cover",
      "02": "Exploration",
      "03": "Final screens",
    },
  },
];

const files = import.meta.glob("../assets/projects/*/*.{png,jpg,jpeg,webp,avif,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export function projectImages(slug: string): ProjectImage[] {
  const prefix = `../assets/projects/${slug}/`;
  return Object.entries(files)
    .filter(([path]) => path.startsWith(prefix))
    .map(([path, src]) => ({ src, name: path.slice(prefix.length).replace(/\.[^.]+$/, "") }))
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
