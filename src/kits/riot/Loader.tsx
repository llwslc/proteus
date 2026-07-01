import "./Loader.css";

const LETTERS = ["R", "I", "O", "T"];

export default function Loader() {
  return (
    <div className="riot-loader" role="status" aria-label="Loading">
      <div className="riot-loader__stack">
        {LETTERS.map((ch, i) => (
          <span key={ch} className={`riot-loader__letter riot-loader__letter--${i + 1}`}>
            {ch}
          </span>
        ))}
      </div>
      <div className="riot-loader__label">Printing</div>
    </div>
  );
}
