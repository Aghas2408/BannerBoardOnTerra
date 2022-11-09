import { useState, useContext, useEffect } from "react";
import Button from "../Button";
import { plusBtn } from "../../../assets/icons";
import { ModalContext } from "../../../context/modalContext";

import "./styles.scss";

export default function Banner({
  className = "",
  children,
  onBannerClick,
  onBannerButtonClick,
}) {
  const { setOpenModal } = useContext(ModalContext);

  return (
    <div className={`banner-box ${className}`} onClick={onBannerClick}>
      {children ? (
        children
      ) : (
        <Button
          buttonLabel="Add Banner"
          iconSrc={plusBtn}
          onClickButton={(event) => {
            setOpenModal(true);
            onBannerButtonClick(event);
          }}
        />
      )}
    </div>
  );
}
