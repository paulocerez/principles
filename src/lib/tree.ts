import { listArticles } from "@/lib/articles";

export interface TreeFile {
  name: string;
  to: string;
  external?: boolean;
}

export interface TreeFolder {
  name: string;
  files: TreeFile[];
}

export interface Tree {
  root: TreeFile[];
  folders: TreeFolder[];
}

export function buildTree(): Tree {
  const articles = listArticles();

  const writing: TreeFile[] = articles.map((a) => ({
    name: `${a.slug}.md`,
    to: a.externalUrl ?? `/writing/${a.slug}`,
    external: Boolean(a.externalUrl),
  }));

  return {
    root: [{ name: "README.md", to: "/" }],
    folders: [
      { name: "writing", files: writing },
      { name: "thoughts", files: [
        { name: "principles.md", to: "/principles" },
        { name: "facts.md", to: "/facts" },
      ] },
      { name: "collections", files: [
        { name: "people.md", to: "/people" },
        { name: "books.md", to: "/books" },
        { name: "products.md", to: "/products" },
        { name: "countries.md", to: "/countries" },
        { name: "music.md", to: "/music" },
        { name: "projects.md", to: "/projects" },
      ] },
    ],
  };
}

export function findFileName(tree: Tree, pathname: string): string {
  const all = [...tree.root, ...tree.folders.flatMap((f) => f.files)];
  const match = all.find((f) => !f.external && f.to === pathname);
  if (match) return match.name;
  const seg = pathname.split("/").filter(Boolean);
  if (seg[0] === "countries" && seg[1]) return `${seg[1]}.md`;
  return "README.md";
}
