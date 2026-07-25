import "./Loader.css";

const PETALS = [0, 72, 144, 216, 288];

export default function Loader() {
  return (
    <div className="nocturne-loader" role="status" aria-label="Opening NOCTURNE">
      <div className="nocturne-loader__stage">
        <span className="nocturne-loader__halo" />
        <svg
          className="nocturne-loader__bloom"
          viewBox="-24 -24 48 48"
          aria-hidden="true"
        >
          {PETALS.map((a, i) => (
            <g key={a} transform={`rotate(${a})`}>
              <path
                className="nocturne-loader__petal"
                style={{ animationDelay: `${i * 0.16}s` }}
                d="M0 0 C -7 -7,-7.4 -18,0 -23 C 7.4 -18,7 -7,0 0 Z"
              />
            </g>
          ))}
          <circle className="nocturne-loader__core" r="5" />
        </svg>
      </div>
      <div className="nocturne-loader__label">NOW OPENING…</div>
    </div>
  );
}
