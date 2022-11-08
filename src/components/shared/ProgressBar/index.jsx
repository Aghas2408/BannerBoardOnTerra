import "./styles.scss";

export default function ProgressBar({ progressText = 0 }) {
  const progressPresent = progressText;
  return (
    <div className="progress-box">
      <div className="progress-bar-inner">
        <div
          style={{ width: `${progressPresent}%` }}
          className="progress-bar"
        />
      </div>
      <span className="progress-text">{`${progressText}%`}</span>
    </div>
  );
}
