import { useContext, useEffect, useRef } from "react";
import { CartContext } from "contextAPI/CartContext";
import { createPortal } from "react-dom";

import styles from "./Modal.module.css";

const modalRoot = document.getElementById("modal");

const Modal = ({ children }) => {
  const modalRef = useRef(null);
  const { hideCart } = useContext(CartContext);

  const handleEscapeKeyPress = (e) => {
    if (e.code === "Escape") {
      hideCart();
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleEscapeKeyPress, true);

    return () => {
      document.removeEventListener("keypress", handleEscapeKeyPress, true);
    };
  });

  return createPortal(
    <div className={styles.modalWrapper} ref={modalRef}>
      {children}
    </div>,
    modalRoot
  );
};

export default Modal;
