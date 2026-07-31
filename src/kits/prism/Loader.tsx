import "./Loader.css";

export default function Loader() {
  return (
    <div className="prism-loader" role="status" aria-label="Loading PRISM">
      <div className="prism-loader__forms">
        <span className="prism-loader__form prism-loader__form--square" />
        <span className="prism-loader__form prism-loader__form--circle" />
        <svg
          className="prism-loader__form prism-loader__form--tri"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 3 22 21H2Z" />
        </svg>
      </div>
      <div className="prism-loader__label">Composing</div>
    </div>
  );
}
