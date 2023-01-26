import { NavLink } from "react-router-dom";
import { Icon } from "../icon";
import LogoIcon from "../../assets/svg/logo-no-background.svg";
import css from "./navbar.module.scss";
import { useAuthUser } from "@react-query-firebase/auth";
import { auth } from "../../firebase/firebase";
import { AcccountBox } from "../account-box/account-box";

export const Navbar = () => {
  const user = useAuthUser(["user"], auth);

  return (
    <div className={css.wrapper}>
      <NavLink to="/dashboard">
        <Icon src={LogoIcon} className={css.logo} />
      </NavLink>
      <AcccountBox />
    </div>
  );
};
