import { useContext } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "components/contextAPI/CartContext";

import styles from "./Modal.module.css";

const modalRoot = document.getElementById("modal");

const Modal = ({ children }) => {
  const { showCart } = useContext(CartContext);

  return showCart
    ? createPortal(
        <>
          <div className={styles.modalBackdrop} />
          <div className={styles.modalWrapper}>{children}</div>
        </>,
        modalRoot
      )
    : null;
};

export default Modal;
