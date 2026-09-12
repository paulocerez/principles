// Projects I've built or worked on.

export interface Project {
  name: string;
  url: string;
  logo: string;
  description: string;
}

export const projects: Project[] = [
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
