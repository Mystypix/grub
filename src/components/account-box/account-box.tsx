import { Icon } from "../icon";
import ArrowIcon from "assets/svg/arrow-down.svg";
import LogoutIcon from "assets/svg/logout.svg";
import SettingsIcon from "assets/svg/setting-2.svg";
import { useState } from "react";
import { Avatar } from "../avatar/avatar";
import clsx from "clsx";
import css from "./account-box.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuthSignOut } from "@react-query-firebase/auth";
import { auth } from "../../firebase/firebase";
import { ModeSwitch } from "../mode-switch/mode-switch";

export const AcccountBox = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const mutation = useAuthSignOut(auth);

  const handleLogout = () => {
    mutation.mutate();

    if (mutation.isSuccess) {
      navigate("/");
    }
  };

  return (
    <div className={css.wrapper}>
      <div
        onClick={() => setOpen(!open)}
        className={clsx(css.avatarWrapper, { [css.open]: open })}
      >
        <Avatar />
        <Icon className={css.icon} src={ArrowIcon} />
      </div>
      {open && (
        <div className={css.menu}>
          <ModeSwitch />
          <Link to="/settings">
            <div className={css.menuItem}>
              <Icon className={css.icon} src={SettingsIcon} />
              Settings
            </div>
          </Link>
          <div onClick={handleLogout} className={css.menuItem}>
            <Icon className={css.icon} src={LogoutIcon} />
            Logout
          </div>
        </div>
      )}
    </div>
  );
};
