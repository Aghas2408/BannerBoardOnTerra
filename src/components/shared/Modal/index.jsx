import { useRef, useState, useEffect, useContext } from "react";
import { ModalContext } from "../../../context/modalContext";

import "./styles.scss";

export default function Modal({ children }) {
  const childrenRef = useRef(null);
  const { openModal, setOpenModal } = useContext(ModalContext);

  const [modalHeight, setModalHeight] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const getWindowScrollPosition = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const returnModalStyle = () => {
    return {
      opacity: openModal ? 1 : 0,
      height: openModal ? modalHeight : 0,
      padding: openModal ? "20px 10px" : 0,
      visibility: openModal ? "visible" : "hidden",
    };
  };

  useEffect(() => {
    const children = childrenRef.current.children[0];
    if (typeof children === "object" && openModal) {
      // this 50 related parent duble padding
      setModalHeight(children.clientHeight + 50);
    }
  }, [children]);

  useEffect(() => {
    if (openModal) {
      window.addEventListener("scroll", getWindowScrollPosition, {
        passive: true,
      });
    }
    return () => {
      window.removeEventListener("scroll", getWindowScrollPosition);
    };
  }, [openModal]);

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
        <div
          className="children-inner"
          ref={childrenRef}
          style={returnModalStyle()}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
