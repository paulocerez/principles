import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Layout } from "./components/layout";
import { Readme } from "./routes/readme";
import { Principles } from "./routes/principles";
import { Facts } from "./routes/facts";
import { ListPage } from "./routes/list-page";
import { Article } from "./routes/article";
import { Countries, CountryDetail } from "./routes/countries";
import { people } from "./data/people";
import { books } from "./data/books";
import { products } from "./data/products";
import { music } from "./data/music";

const Studio = lazy(() => import("./routes/studio"));

function StudioRoute() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-neutral-500">Loading Studio…</div>}>
      <Studio />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  { path: "/studio/*", element: <StudioRoute /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Readme /> },
      { path: "principles", element: <Principles /> },
      { path: "facts", element: <Facts /> },
      { path: "people", element: <ListPage file="people.md" title="People" subtitle="People I admire or draw inspiration from." items={people} /> },
      { path: "books", element: <ListPage file="books.md" title="Books" subtitle="Books that shaped how I think." items={books} /> },
      { path: "products", element: <ListPage file="products.md" title="Products" subtitle="Products I love using." items={products} /> },
      { path: "countries", element: <Countries /> },
      { path: "countries/:slug", element: <CountryDetail /> },
      { path: "music", element: <ListPage file="music.md" title="Music" subtitle="Music I keep coming back to." items={music} /> },
      { path: "writing/:slug", element: <Article /> },
    ],
  },
]);
