import css from "./loader.module.scss";

export const Loader = () => (
  <div className={css.loader}>
    <img alt="Loader" src="../../assets/loader.svg" />
  </div>
);
