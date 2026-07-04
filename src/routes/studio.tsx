import { Studio } from "sanity";
import config from "../../studio/sanity.config";

export default function StudioRoute() {
  return <Studio config={config} />;
}
