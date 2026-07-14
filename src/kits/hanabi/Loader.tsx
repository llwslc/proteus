import "./Loader.css";

export default function Loader() {
  return (
    <div className="hanabi-loader" role="status" aria-label="Loading">
      <div className="hanabi-loader__stage">
        <span className="hanabi-loader__burst" />
        <svg className="hanabi-loader__spark" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M24 4c1.4 8.4 5 12.4 13.6 14-8.6 2-12.2 6-13.6 14.6C22.6 24 19 20 10.4 18 19 16.4 22.6 12.4 24 4Z" />
        </svg>
        <span className="hanabi-loader__spark-sm hanabi-loader__spark-sm--a">✦</span>
        <span className="hanabi-loader__spark-sm hanabi-loader__spark-sm--b">✦</span>
      </div>
      <div className="hanabi-loader__label">NOW LOADING…</div>
    </div>
  );
}
