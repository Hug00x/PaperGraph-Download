import { SectionLabel } from "./ui";
export function ResearchFlow() {
  return (
    <section
      id="workflow"
      className="workflow section-shell"
      aria-labelledby="workflow-title"
    >
      <SectionLabel number="01">UM PROCESSO. TUDO LIGADO.</SectionLabel>
      <div className="workflow-heading">
        <h2 id="workflow-title">
          Da escrita
          <br />
          às ligações.
        </h2>
        <p>
          Escrever artigos LaTeX.
          <br />
          Compilar PDFs localmente.
          <br />
          Organizar ligações entre ideias.
        </p>
      </div>
      <div className="workflow-rail">
        <div>
          <span>01 / ESCREVER</span>
          <strong>LaTeX</strong>
        </div>
        <i aria-hidden="true">→</i>
        <div>
          <span>02 / COMPILAR</span>
          <strong>PDF</strong>
        </div>
        <i aria-hidden="true">→</i>
        <div>
          <span>03 / LIGAR</span>
          <strong>Mapa</strong>
        </div>
        <span className="rail-fill" aria-hidden="true" />
      </div>
    </section>
  );
}
