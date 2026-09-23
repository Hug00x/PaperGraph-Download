import { SectionLabel } from "./ui";
export function ProductShowcase() {
  return (
    <section
      className="product-track"
      id="produto"
      aria-labelledby="product-title"
    >
      <div className="product-sticky section-shell">
        <div className="product-heading">
          <div>
            <SectionLabel number="02">DENTRO DO MESMO WORKSPACE</SectionLabel>
            <h2 id="product-title">As ideias ganham forma.</h2>
          </div>
          <p>
            Escrita LaTeX, preview PDF e mapa de investigação num workspace
            desktop.
          </p>
        </div>
        <div className="workspace">
          <div className="workspace-bar">
            <span>
              <span className="status-dot" /> PAPERGRAPH{" "}
              <span className="workspace-desktop">/ WORKSPACE</span>
            </span>
            <span className="workspace-caption">Representação do workflow</span>
            <span aria-hidden="true">− &nbsp; □ &nbsp; ×</span>
          </div>
          <div className="workspace-body">
            <div className="workspace-aside" aria-hidden="true">
              <span className="active">TEX</span>
              <span>PDF</span>
              <span>MAP</span>
              <span>BIB</span>
              <span className="aside-bottom">SYNC</span>
            </div>
            <div className="stage" aria-hidden="true">
              <svg
                className="research-edges"
                viewBox="0 0 1000 500"
                preserveAspectRatio="none"
              >
                <g>
                  <path
                    pathLength="1"
                    d="M500 250 210 120 160 340 500 250 795 130 840 350 500 250M210 120 795 130M160 340 840 350"
                  />
                </g>
              </svg>
              <div className="paper-document">
                <div className="document-tab">
                  <span className="tex-tab">investigação.tex</span>
                  <span className="pdf-tab">investigação.pdf</span>
                  <span>↗</span>
                </div>
                <div className="tex-content">
                  <span className="code-comment">% Uma ideia começa aqui.</span>
                  <code>
                    {
                      "\\documentclass{article}\n\n\\begin{document}\n\n\\title{A tua investigação}\n\\maketitle\n\n\\section{Introdução}\nAs ideias não existem\nisoladamente.\n\n\\cite{referencia}\n\n\\end{document}"
                    }
                  </code>
                  <span className="text-cursor" />
                </div>
                <div className="pdf-content">
                  <span className="paper-kicker">PAPERGRAPH / RESEARCH</span>
                  <h3>
                    A tua
                    <br />
                    investigação
                  </h3>
                  <span className="paper-rule" />
                  <p>1. Introdução</p>
                  <div className="paper-lines">
                    {Array.from({ length: 6 }, (_, i) => (
                      <i key={i} />
                    ))}
                  </div>
                  <div className="paper-figure">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="paper-page">01</span>
                </div>
              </div>
              {["Referências", "Artigos", "Ideias", "Ligações"].map(
                (label, i) => (
                  <div className={`research-node node-${i}`} key={label}>
                    <span className="node-orbit">
                      <span>{["BIB", "PDF", "TEX", "MAP"][i]}</span>
                    </span>
                    <small>{label}</small>
                  </div>
                ),
              )}
              <span className="stage-coordinate">
                DOCUMENTO / LIGAÇÕES / MAPA
              </span>
            </div>
          </div>
          <div className="workspace-status">
            <span>LOCAL PREVIEW</span>
            <span>latex → pdf → research graph</span>
            <span className="sync-status">
              <span className="status-dot" /> SHARED WORKSPACE
            </span>
          </div>
        </div>
        <ol className="story-steps">
          <li className="step-tex">
            <span>01</span>
            <strong>Escrever em LaTeX</strong>
          </li>
          <li className="step-pdf">
            <span>02</span>
            <strong>Compilar em PDF</strong>
          </li>
          <li className="step-map">
            <span>03</span>
            <strong>Ligar as ideias</strong>
          </li>
        </ol>
      </div>
    </section>
  );
}
