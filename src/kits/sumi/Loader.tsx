import "./Loader.css";

export default function SumiLoader() {
  return (
    <div className="sumi-loader" role="status" aria-label="Loading SUMI">
      <svg className="sumi-loader__enso" viewBox="0 0 64 64" width="64" height="64">
        <circle className="sumi-loader__ring" cx="32" cy="32" r="25" pathLength="100" />
        <circle className="sumi-loader__seal" cx="32" cy="32" r="4.5" />
      </svg>
      <span className="sumi-loader__label">研墨</span>
    </div>
  );
}
