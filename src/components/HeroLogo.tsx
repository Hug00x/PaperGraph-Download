// Vector reconstruction of the existing PaperGraph icon: document + five graph nodes.
export function HeroLogo() {
  return (
    <div className="hero-resolution" aria-hidden="true">
      <svg className="hero-logo" viewBox="0 0 120 96" fill="none">
        <g className="logo-strokes" strokeLinecap="round" strokeLinejoin="round">
          <path className="logo-paper" pathLength="1" d="M15 86H8a4 4 0 0 1-4-4V26L24 6h36a3 3 0 0 1 3 3v16M4 26h20V6M15 37h23M15 46h16" />
          <path className="logo-links" pathLength="1" d="M27 64 43 53M66 38 75 22M65 49 98 40M63 58 73 66M32 75 52 86 70 77M58 63 72 69M58 34 73 21M82 22 101 32M49 62 27 69M74 63 79 24" />
          <circle className="logo-node" data-logo-anchor="0" cx="20" cy="72" r="10" />
          <circle className="logo-node logo-center" data-logo-anchor="1" cx="53" cy="48" r="15" />
          <circle className="logo-node" data-logo-anchor="2" cx="79" cy="73" r="10" />
          <circle className="logo-node" data-logo-anchor="3" cx="80" cy="14" r="8" />
          <circle className="logo-node" data-logo-anchor="4" cx="108" cy="38" r="10" />
        </g>
      </svg>
    </div>
  );
}
