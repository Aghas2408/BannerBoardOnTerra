import { createContext, useState, useMemo } from "react";

export const ModalContext = createContext({
  openModal: false,
  setOpenModal: () => {},
});

export default function ModalContextProvider({ children }) {
  const [openModal, setOpenModal] = useState();

  const value = useMemo(() => ({ openModal, setOpenModal }), [openModal]);

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
