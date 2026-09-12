import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticle } from "@/lib/articles";
import { ArticleBody } from "@/components/article-body";
import { urlForImage } from "@/lib/sanity";

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function Article() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticle(slug) : undefined;

  useEffect(() => {
    document.title = article ? `${article.title} - Paulo Ramirez` : "Not Found - Paulo Ramirez";
  }, [article]);

  if (!article) {
    return (
      <div className="text-center">
        <p className="text-[14px]" style={{ color: "var(--muted)" }}>
          This piece wandered off.
        </p>
        <Link
          to="/"
          className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.12em] underline underline-offset-4"
          style={{ color: "var(--ink)" }}
        >
          Back home
        </Link>
      </div>
    );
  }

  const coverUrl = article.coverImage
    ? urlForImage(article.coverImage).width(1200).fit("max").auto("format").url()
    : null;

  return (
    <article>
      <header>
        {article.publishedAt ? (
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--accent)" }}>
            {formatDate(article.publishedAt)}
          </p>
        ) : null}
        <h1
          className="text-[34px] leading-[1.05] sm:text-[42px]"
          style={{ fontWeight: 500, letterSpacing: "-0.04em", color: "var(--ink)" }}
        >
          {article.title}
        </h1>
      </header>

      {coverUrl ? (
        <img
          src={coverUrl}
          alt={article.coverImage?.alt ?? article.title}
          className="mt-10 w-full rounded-2xl"
          style={{ border: "1px solid var(--hairline)", boxShadow: "var(--shadow-cover)" }}
          loading="lazy"
        />
      ) : null}

      <div className="mt-10">
        <ArticleBody value={article.body} />
      </div>
    </article>
  );
}
