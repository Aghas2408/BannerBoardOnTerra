import Button from "../Button";
import { plusBtn } from "../../../assets/icons";

import "./styles.scss";

export default function Banner({ className = "", children }) {
  return (
    <div className={`banner-box ${className}`}>
      {children ? (
        children
      ) : (
        <Button buttonLabel="Add Banner" iconSrc={plusBtn} />
      )}
    </div>
  );
}
