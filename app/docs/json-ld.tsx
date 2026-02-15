const BASE = "https://www.silo.rs";

export function BreadcrumbJsonLd({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "silo", item: BASE },
      { "@type": "ListItem", position: 2, name: "docs", item: `${BASE}/docs` },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${BASE}/docs/${slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function TechArticleJsonLd({
  slug,
  title,
  description,
}: {
  slug: string;
  title: string;
  description: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url: `${BASE}/docs/${slug}`,
    author: {
      "@type": "Organization",
      name: "silo-rs",
      url: "https://github.com/silo-rs",
    },
    publisher: {
      "@type": "Organization",
      name: "silo-rs",
      url: "https://github.com/silo-rs",
    },
    isPartOf: { "@type": "WebSite", name: "silo", url: BASE },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
