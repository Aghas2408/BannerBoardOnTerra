import { useState, useEffect, useContext } from "react";
import { ModalContext } from "../../../context/modalContext";

import "./styles.scss";

export default function Modal({ children }) {
  const { openModal, setOpenModal } = useContext(ModalContext);
  const [scrollPosition, setScrollPosition] = useState(0);

  const getWindowScrollPosition = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", getWindowScrollPosition, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", getWindowScrollPosition);
    };
  }, []);

  return (
    <div
      onClick={() => setOpenModal(!openModal)}
      className="modal-container"
      style={{
        visibility: openModal ? "visible" : "hidden",
        top: scrollPosition,
      }}
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <p className="moadl-title">Add a Banner</p>
        <div className="children-inner">{children}</div>
      </div>
    </div>
  );
}
