import { DownloadButton } from "./ui";
import { HeroLogo } from "./HeroLogo";
const tags = ["EXE", "TEX", "PDF", "MAP", "SYNC", "UPD", "BIB"];
export function Hero({ url }: { url: string }) {
  return (
    <section className="hero-track" id="inicio" aria-labelledby="hero-title">
      <div className="hero-sticky grid-field">
        <div className="hero-network" aria-hidden="true">
          <svg viewBox="0 0 1000 700" preserveAspectRatio="none">
            <path d="M80 210 210 520 500 600 805 530 920 220M80 210 240 110M805 530 940 420M210 520 240 110M500 600 940 420" />
          </svg>
          {tags.map((tag, i) => (
            <div
              className={`technical-position tag-${tag.toLowerCase()}`}
              key={tag}
            >
              <div className="technical-scroll">
                <div
                  className="technical-pointer"
                  data-depth={((i % 3) + 1) * 7}
                >
                  <span className="network-node"><span className="node-label">{tag}</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hero-content section-shell">
          <p className="eyebrow hero-intro">
            <span className="status-dot" /> O TEU WORKSPACE DE INVESTIGAÇÃO
          </p>
          <h1 id="hero-title">
            <span className="reveal-line">
              <span className="title-line">A tua investigação,</span>
            </span>
            <span className="reveal-line">
              <span className="title-line accent-text">agora numa app.</span>
            </span>
          </h1>
          <p className="hero-description">
            Instala o PaperGraph para escrever artigos LaTeX, compilar PDFs
            localmente e organizar as ligações entre ideias num mapa
            colaborativo.
          </p>
          <div className="hero-action">
            <DownloadButton url={url} />
            <span className="technical-note">DESKTOP / WINDOWS / .EXE</span>
          </div>
        </div>
        <div className="hero-bottom section-shell">
          <span>
            latex compiler <b>/</b> local preview <b>/</b> paper network
          </span>
          <a className="scroll-indicator" href="#workflow">
            Explorar <span aria-hidden="true">↓</span>
          </a>
        </div>
        <HeroLogo />
      </div>
    </section>
  );
}
