import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/product", "/pricing", "/platforms", "/faq"];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
