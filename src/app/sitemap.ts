import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { destinationsData } from "@/config/destinations";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "#destinations", "#features", "#planner", "#pricing", "#faq"].map(
    (route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1.0 : 0.8,
    })
  );

  const destinationRoutes = destinationsData.map((dest) => ({
    url: `${siteConfig.url}#destinations?id=${dest.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...destinationRoutes];
}
