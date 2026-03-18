import { loadConfig } from "@/lib/config";
import { renderComponent } from "@/lib/renderComponent";

export default function HomePage() {
  const config = loadConfig();
  const components = config.components["home"] ?? [];
  return <>{components.map((name, i) => renderComponent(name, config, i))}</>;
}
