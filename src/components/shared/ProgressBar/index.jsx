import "./styles.scss";

export default function ProgressBar({ progresstext = 0 }) {
  const progressPresent = progresstext;
  return (
    <div className="progress-box">
      <div className="progress-bar-inner">
        <div
          style={{ width: `${progressPresent}%` }}
          className="progress-bar"
        />
      </div>
      <span className="progress-text">{`${progresstext}%`}</span>
    </div>
  );
}
