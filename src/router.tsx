import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Layout } from "./components/layout";
import { Readme } from "./routes/readme";
import { Principles } from "./routes/principles";
import { Facts } from "./routes/facts";
import { Article } from "./routes/article";

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
      { path: "writing/:slug", element: <Article /> },
    ],
  },
]);
