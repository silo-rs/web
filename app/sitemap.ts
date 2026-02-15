import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.silo.rs",
      lastModified: new Date("2026-02-16"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.silo.rs/docs",
      lastModified: new Date("2026-02-15"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.silo.rs/docs/worktrees",
      lastModified: new Date("2026-02-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.silo.rs/docs/how-it-works",
      lastModified: new Date("2026-02-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.silo.rs/docs/reference",
      lastModified: new Date("2026-02-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.silo.rs/docs/troubleshooting",
      lastModified: new Date("2026-02-15"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://www.silo.rs/docs/guides",
      lastModified: new Date("2026-02-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.silo.rs/docs/ecosystem",
      lastModified: new Date("2026-02-15"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
