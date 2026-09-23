import logo from "../../assets/papergraph-logo-text.png";
export function Logo() {
  return (
    <span className="logo-frame">
      <img src={logo} alt="PaperGraph" width="1536" height="1024" />
    </span>
  );
}
export function DownloadButton({ url }: { url: string }) {
  return (
    <a className="magnetic-target" href={url} data-download-link>
      <span className="primary-action">
        <svg
          width="17"
          height="17"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M1 3l8-1v7H1zm10-1 8-1v8h-8zM1 11h8v7l-8-1zm10 0h8v8l-8-1z" />
        </svg>
        Descarregar para Windows
        <span className="action-arrow" aria-hidden="true">
          ↗
        </span>
      </span>
    </a>
  );
}
export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: string;
}) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}
