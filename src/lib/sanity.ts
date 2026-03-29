import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// GROQ queries
export const projectsQuery = `*[_type == "project"] | order(order asc) {
  _id,
  title,
  description,
  tags,
  image,
  liveUrl,
  githubUrl,
  order
}`;

export const experiencesQuery = `*[_type == "experience"] | order(order asc) {
  _id,
  title,
  company,
  period,
  description,
  type,
  order
}`;
