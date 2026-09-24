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
        <a className="github-link" href="https://github.com/Hug00x">
          <svg className="github-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-.89-.01-1.75-2.78.62-3.37-1.38-3.37-1.38-.46-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1.01.08 1.54 1.07 1.54 1.07.9 1.58 2.35 1.12 2.93.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.28 9.28 0 0 1 12 8.96c.85 0 1.71.12 2.51.36 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.8-4.58 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.27 10.27 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
          </svg>
          GitHub
        </a>
      </footer>
    </>
  );
}
