import articlesData from "@/data/articles.json";
import type { PortableTextBlock } from "@portabletext/react";

export interface ArticleSummary {
  _id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  publishedAt: string | null;
  externalUrl: string | null;
}

export interface Article extends ArticleSummary {
  body: PortableTextBlock[];
  coverImage: {
    asset: { _ref: string };
    alt?: string | null;
  } | null;
}

const articles = articlesData as Article[];

export function listArticles(): ArticleSummary[] {
  return articles
    .slice()
    .sort((a, b) => {
      const ta = a.publishedAt ? Date.parse(a.publishedAt) : 0;
      const tb = b.publishedAt ? Date.parse(b.publishedAt) : 0;
      return tb - ta;
    })
    .map(({ body: _body, coverImage: _coverImage, ...rest }) => rest);
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
