import { createClient } from "@sanity/client";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const outFile = resolve(rootDir, "src/data/articles.json");

const mode = process.env.NODE_ENV ?? "production";
const env = loadEnv(mode, rootDir, "");

const projectId = env.VITE_SANITY_PROJECT_ID;
const dataset = env.VITE_SANITY_DATASET ?? "production";

async function main() {
  if (!projectId) {
    console.warn(
      "[articles] VITE_SANITY_PROJECT_ID not set — writing empty articles list. " +
        "Set it in .env to fetch from Sanity at build time.",
    );
    await mkdir(dirname(outFile), { recursive: true });
    await writeFile(outFile, "[]\n");
    return;
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-10-01",
    useCdn: false,
    token: env.SANITY_READ_TOKEN,
  });

  const query = `*[_type == "article" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    externalUrl,
    coverImage,
    body
  }`;

  const articles = await client.fetch(query);
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, JSON.stringify(articles, null, 2) + "\n");
  console.log(`[articles] Wrote ${articles.length} article(s) to ${outFile}`);
}

main().catch((err) => {
  console.error("[articles] Failed to build articles:", err);
  process.exit(1);
});
