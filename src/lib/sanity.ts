import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

let client: SanityClient | undefined;
let builder: ReturnType<typeof imageUrlBuilder> | undefined;

function getClient(): SanityClient {
  if (client) return client;
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
  if (!projectId) {
    throw new Error(
      "VITE_SANITY_PROJECT_ID is not set. Add it to .env to enable Sanity image URLs and studio content.",
    );
  }
  client = createClient({
    projectId,
    dataset: import.meta.env.VITE_SANITY_DATASET ?? "production",
    apiVersion: "2024-10-01",
    useCdn: true,
  });
  return client;
}

export function urlForImage(source: unknown) {
  builder ??= imageUrlBuilder(getClient());
  return builder.image(source as never);
}
