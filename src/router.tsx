import { createBrowserRouter, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Home } from "./routes/home";
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
  {
    path: "/",
    element: <Outlet />,
    children: [
      { index: true, element: <Home /> },
      { path: "writing/:slug", element: <Article /> },
      { path: "studio/*", element: <StudioRoute /> },
    ],
  },
]);
