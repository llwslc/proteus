import "./Loader.css";

const LEAF = "M0 0 C 10 -9, 26 -11, 38 -2 C 26 8, 10 8, 0 0 Z";
const LEAF_VEIN = "M3 0 C 13 -3, 24 -4, 34 -2";
const BUD = "M0 0 C -6 -8, -6 -18, 0 -24 C 6 -18, 6 -8, 0 0 Z";
const BUD_VEIN = "M-4 -2 C -2 -8, -1 -13, 0 -20 M4 -2 C 2 -8, 1 -13, 0 -20";
const BUD_CALYX = "M-5 0 C -2 -4, 2 -4, 5 0";
const TENDRIL = "M0 0 C 10 -7, 22 -7, 25 2 C 27 9, 19 14, 13 10 C 8 7, 10 1, 15 2";
const PETAL = "M0 0 C -7.8 -9.36, -8.32 -19.76, 0 -26 C 8.32 -19.76, 7.8 -9.36, 0 0 Z";

function Leaf({ t, d }: { t: string; d: string }) {
  return (
    <g className="nocturne-loader__sprout" style={{ animationDelay: d }} transform={t}>
      <path d={LEAF} fill="url(#nlLeaf)" stroke="#8a6b3a" strokeWidth="1" />
      <path d={LEAF_VEIN} fill="none" stroke="#c69a4e" strokeWidth="0.8" opacity="0.7" />
    </g>
  );
}

function Half({ flip }: { flip?: boolean }) {
  return (
    <g transform={flip ? "translate(760,0) scale(-1,1)" : undefined}>
      <path
        className="nocturne-loader__branch"
        pathLength={1}
        d="M380 45 C 340 28, 300 28, 262 45 C 224 62, 186 62, 150 45 C 118 30, 86 32, 58 44"
        fill="none"
        stroke="#c69a4e"
        strokeWidth="1.6"
        opacity="0.8"
      />
      <Leaf t="translate(320,32) rotate(-125) scale(.72)" d="0.62s" />
      <Leaf t="translate(238,53) rotate(110) scale(.68)" d="1.08s" />
      <g className="nocturne-loader__sprout" style={{ animationDelay: "1.22s" }} transform="translate(208,57) rotate(-126) scale(.8)">
        <path d={TENDRIL} fill="none" stroke="#c69a4e" strokeWidth="1.2" opacity="0.75" />
      </g>
      <Leaf t="translate(179,55) rotate(-113) scale(.6)" d="1.38s" />
      <Leaf t="translate(112,40) rotate(130) scale(.55)" d="1.78s" />
      <g className="nocturne-loader__sprout" style={{ animationDelay: "2.1s" }} transform="translate(58,44) rotate(-78) scale(.85)">
        <path d={BUD} fill="url(#nlPetal)" stroke="#8a6b3a" strokeWidth="1" />
        <path d={BUD_VEIN} fill="none" stroke="#c69a4e" strokeWidth="0.8" opacity="0.65" />
        <path d={BUD_CALYX} fill="none" stroke="#8a6b3a" strokeWidth="1.2" />
      </g>
    </g>
  );
}

export default function Loader() {
  return (
    <div className="nocturne-loader" role="status" aria-label="The night garden is waking">
      <div className="nocturne-loader__art">
        <svg viewBox="0 0 760 90" fill="none" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="nlPetal" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#8a2a48" />
              <stop offset="1" stopColor="#55152b" />
            </linearGradient>
            <linearGradient id="nlPetalLit" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#a63a5c" />
              <stop offset="1" stopColor="#6b1e38" />
            </linearGradient>
            <linearGradient id="nlLeaf" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#6e5a2e" />
              <stop offset="1" stopColor="#3e3118" />
            </linearGradient>
          </defs>
          <Half />
          <Half flip />
          <g className="nocturne-loader__crown" transform="translate(380,45)">
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i} transform={`rotate(${i * 72})`}>
                <path
                  className="nocturne-loader__petal"
                  style={{ animationDelay: `${(0.2 + i * 0.16).toFixed(2)}s` }}
                  d={PETAL}
                  fill="url(#nlPetalLit)"
                  stroke="#8a6b3a"
                  strokeWidth="1"
                />
              </g>
            ))}
            <g className="nocturne-loader__core" style={{ animationDelay: "1.1s" }}>
              <circle r="4.7" fill="#e9cc8a" stroke="#8a6b3a" strokeWidth="1" />
              {[0, 1, 2, 3, 4].map((j) => {
                const a = ((j * 72 - 90) * Math.PI) / 180;
                return (
                  <circle
                    key={j}
                    cx={Number((Math.cos(a) * 7.8).toFixed(2))}
                    cy={Number((Math.sin(a) * 7.8).toFixed(2))}
                    r="1.43"
                    fill="#c69a4e"
                  />
                );
              })}
            </g>
          </g>
        </svg>
      </div>
      <p className="nocturne-loader__word">NOCTURNE</p>
    </div>
  );
}
