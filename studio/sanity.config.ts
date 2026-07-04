import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID ?? process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = import.meta.env.VITE_SANITY_DATASET ?? process.env.SANITY_STUDIO_DATASET ?? "production";

export default defineConfig({
  name: "paulos-principles",
  title: "Paulo's Principles",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
