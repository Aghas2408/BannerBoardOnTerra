import "./styles.scss";

export default function Button({
  iconSrc,
  labelStyle,
  buttonLabel,
  onClickButton,
  buttonStyle = "",
}) {
  return (
    <div className={`button-box ${buttonStyle}`}>
      <button onClick={onClickButton}>
        {iconSrc && (
          <img type="image" src={`${iconSrc}`} alt="image not found" />
        )}
        <p className={labelStyle}>{buttonLabel}</p>
      </button>
    </div>
  );
}
