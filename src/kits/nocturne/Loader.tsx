import "./Loader.css";

const PETALS = [0, 72, 144, 216, 288];

export default function Loader() {
  return (
    <div className="nocturne-loader" role="status" aria-label="Loading NOCTURNE">
      <svg className="nocturne-loader__vine" viewBox="0 0 320 84" aria-hidden="true">
        <path
          className="nocturne-loader__branch"
          pathLength={1}
          d="M160 44C130 32 100 32 72 44 48 54 20 54 0 44"
        />
        <path
          className="nocturne-loader__branch"
          pathLength={1}
          d="M160 44C190 32 220 32 248 44 272 54 300 54 320 44"
        />
        <g className="nocturne-loader__bloom">
          {PETALS.map((a) => (
            <path
              key={a}
              className="nocturne-loader__petal"
              transform={`rotate(${a} 160 44)`}
              d="M160 44C155.6 39.6 155.4 32.8 160 29.2 164.6 32.8 164.4 39.6 160 44Z"
            />
          ))}
          <circle className="nocturne-loader__core" cx="160" cy="44" r="3.4" />
        </g>
      </svg>
      <div className="nocturne-loader__word">NOCTURNE</div>
    </div>
  );
}
