import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";
import PuffLoader from "react-spinners/PuffLoader";
import styles from "./Loader.module.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #fff;
`;

const Loader = ({
  loading,
  size = 50,
  loaderMessage,
  variant = "primary",
  background = "#fff",
}) => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.Loader} style={{ background }}>
        <h3>{loaderMessage}</h3>
        {variant === "primary" ? (
          <PacmanLoader
            color="#4b5548"
            loading={loading}
            css={override}
            size={size}
          />
        ) : (
          <PuffLoader
            color="#4b5548"
            loading={loading}
            css={override}
            size={size}
          />
        )}
      </div>
    </div>
  );
};

export default Loader;
