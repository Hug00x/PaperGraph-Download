import { useRef } from "react";
import { Hero } from "./components/Hero";
import { ResearchFlow } from "./components/ResearchFlow";
import { ProductShowcase } from "./components/ProductShowcase";
import { DownloadSection } from "./components/DownloadSection";
import { Logo } from "./components/ui";
import { useRelease } from "./hooks/useRelease";
import { useMotion } from "./animations/useMotion";
export function App() {
  const root = useRef<HTMLDivElement>(null);
  const url = useRelease();
  useMotion(root);
  return (
    <div ref={root}>
      <a className="skip-link" href="#download">
        Ir para o download
      </a>
      <header className="navbar">
        <nav className="section-shell" aria-label="Navegação principal">
          <a href="#inicio" aria-label="PaperGraph — início">
            <Logo />
          </a>
          <a className="nav-download" href="#download">
            Download <span aria-hidden="true">↘</span>
          </a>
        </nav>
      </header>
      <main>
        <Hero url={url} />
        <ResearchFlow />
        <ProductShowcase />
        <DownloadSection url={url} />
      </main>
    </div>
  );
}
