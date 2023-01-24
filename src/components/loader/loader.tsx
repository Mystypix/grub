import { Icon } from "../icon";
import LoaderIcon from "../../assets/loader.svg";
import css from "./loader.module.scss";

export const Loader = () => (
  <div className={css.loader}>
    <Icon src={LoaderIcon} />
  </div>
);
