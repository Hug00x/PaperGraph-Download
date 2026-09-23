import { DownloadButton, Logo, SectionLabel } from "./ui";
const features = [
  ["TEX", "Preview LaTeX", "PDF local sem setup manual."],
  ["UPD", "Atualizações", "Versões novas quando estiverem prontas."],
  ["SYNC", "Workspaces", "Artigos, ficheiros e mapas sincronizados."],
];
export function DownloadSection({ url }: { url: string }) {
  return (
    <>
      <section
        id="download"
        className="download-section section-shell"
        aria-labelledby="download-title"
      >
        <div className="download-copy">
          <SectionLabel number="03">O TEU PRÓXIMO WORKSPACE</SectionLabel>
          <h2 id="download-title">
            PaperGraph
            <br />
            <span className="accent-text">para Windows.</span>
          </h2>
          <p>
            Escrita LaTeX, preview PDF e mapa de investigação num workspace
            desktop.
          </p>
          <DownloadButton url={url} />
          <span className="technical-note">INSTALAR / ESCREVER / LIGAR</span>
        </div>
        <div className="feature-list">
          {features.map(([tag, title, copy], i) => (
            <article className="feature-row" key={tag}>
              <span className="feature-number">0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
              <span className="feature-tag" aria-hidden="true">
                {tag}
              </span>
            </article>
          ))}
        </div>
      </section>
      <footer className="section-shell">
        <a href="#inicio" aria-label="PaperGraph — início">
          <Logo />
        </a>
        <span>© {new Date().getFullYear()} PaperGraph</span>
        <a href="https://github.com/Hug00x/PaperGraph">
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </>
  );
}
