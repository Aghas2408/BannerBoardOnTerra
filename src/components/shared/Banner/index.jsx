import { useState, useContext, useEffect } from "react";
import Button from "../Button";
import { plusBtn } from "../../../assets/icons";
import { ModalContext } from "../../../context/modalContext";

import "./styles.scss";

export default function Banner({ className = "", onBannerClick, children }) {
  const { setOpenModal } = useContext(ModalContext);

  return (
    <div className={`banner-box ${className}`}>
      {children ? (
        children
      ) : (
        <Button
          buttonLabel="Add Banner"
          iconSrc={plusBtn}
          onClickButton={() => {
            onBannerClick();
            setOpenModal(true);
          }}
        />
      )}
    </div>
  );
}
