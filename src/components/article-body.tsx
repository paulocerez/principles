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
      <h2 className="mt-10 mb-3 text-[20px] font-semibold tracking-tight text-[#1A1A18]">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-2 text-[16px] font-semibold tracking-tight text-[#1A1A18]">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-5 border-l-2 border-[#E4E3DE] pl-4 italic text-[#706F6A]">{children}</blockquote>
    ),
    normal: ({ children }) => (
      <p className="my-4 leading-[1.75] text-[14px] text-[#3A3A35]">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-4 list-disc pl-5 text-[14px] text-[#3A3A35]">{children}</ul>,
    number: ({ children }) => <ol className="my-4 list-decimal pl-5 text-[14px] text-[#3A3A35]">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-[#C8C7C2] underline-offset-2 hover:decoration-[#1A1A18]"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="rounded bg-[#F1EFEA] px-1.5 py-0.5 text-[12px]">{children}</code>
    ),
  },
};

export function ArticleBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
