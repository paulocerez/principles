import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
    document.title = article ? `${article.title} — Paulo Ramirez` : "Not Found — Paulo Ramirez";
  }, [article]);

  if (!article) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAF8F4" }}>
        <div className="text-center">
          <p style={{ fontSize: "14px", color: "#706F6A" }}>Article not found.</p>
          <Link to="/" className="mt-3 inline-block text-[12px] text-[#1A1A18] underline">
            Back
          </Link>
        </div>
      </main>
    );
  }

  const coverUrl = article.coverImage
    ? urlForImage(article.coverImage).width(1200).fit("max").auto("format").url()
    : null;

  return (
    <main
      className="relative min-h-screen"
      style={{
        backgroundColor: "#FAF8F4",
        backgroundImage: "radial-gradient(circle, rgba(175,162,142,0.35) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      <div className="relative mx-auto max-w-2xl px-6 py-20 sm:py-28">
        <Link
          to="/"
          className="animate-fade-up flex items-center gap-1.5 text-[12px] font-medium tracking-tight text-[#A8A7A2] hover:text-[#1A1A18] transition-colors mb-10"
        >
          <ArrowLeft size={12} />
          <span>Back</span>
        </Link>

        <article className="animate-fade-up-delay-1">
          <header>
            <h1 style={{ fontWeight: 800, fontSize: "36px", letterSpacing: "-0.035em", color: "#1A1A18", lineHeight: 1.1 }}>
              {article.title}
            </h1>
            {article.publishedAt ? (
              <p className="mt-2" style={{ fontSize: "12px", color: "#B0AFA9", letterSpacing: "-0.01em" }}>
                {formatDate(article.publishedAt)}
              </p>
            ) : null}
          </header>

          {coverUrl ? (
            <img
              src={coverUrl}
              alt={article.coverImage?.alt ?? article.title}
              className="mt-8 w-full rounded-lg"
              loading="lazy"
            />
          ) : null}

          <div className="mt-8">
            <ArticleBody value={article.body} />
          </div>
        </article>
      </div>
    </main>
  );
}
