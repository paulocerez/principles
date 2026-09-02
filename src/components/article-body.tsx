import { PortableText, type PortableTextComponents, type PortableTextBlock } from "@portabletext/react";
import { urlForImage } from "@/lib/sanity";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      const src = urlForImage(value).width(1200).fit("max").auto("format").url();
      return (
        <img
          src={src}
          alt={value.alt ?? ""}
          className="my-6 w-full rounded-lg"
          loading="lazy"
        />
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 mb-3 text-[22px] font-bold tracking-[-0.03em] text-ink">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-9 mb-2 text-[17px] font-semibold tracking-[-0.02em] text-ink">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="my-6 rounded-r-lg pl-5 pr-4 py-1 text-[15px] italic"
        style={{ borderLeft: "2px solid var(--accent)", color: "var(--muted)" }}
      >
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="my-4 text-[15.5px] leading-[1.75]" style={{ color: "#33332f" }}>{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 list-disc pl-5 text-[15.5px] leading-[1.7]" style={{ color: "#33332f" }}>{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 list-decimal pl-5 text-[15.5px] leading-[1.7]" style={{ color: "#33332f" }}>{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-[3px] transition-colors"
        style={{ color: "var(--accent)", textDecorationColor: "var(--accent-soft)" }}
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="rounded-md px-1.5 py-0.5 font-mono text-[12.5px]" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
        {children}
      </code>
    ),
  },
};

export function ArticleBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
