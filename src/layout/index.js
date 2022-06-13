import { Helmet } from "react-helmet";
import { Header } from "../components";
import styles from "./index.module.scss";

export const Layout = ({ children, title }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className={styles.layout__main}>{children}</main>
    </>
  );
};
