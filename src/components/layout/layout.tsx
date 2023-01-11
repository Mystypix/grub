import { useAuthSignOut, useAuthUser } from "@react-query-firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import css from "./layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const mutation = useAuthSignOut(auth);
  const user = useAuthUser(["user"], auth);

  const handleLogout = () => {
    mutation.mutate();

    if (mutation.isSuccess) {
      navigate("/");
    }
  };

  return (
    <div className={css.wrapper}>
      {user.data && (
        <button className={css.logout} onClick={handleLogout}>
          Logout
        </button>
      )}
      <div>{children}</div>
    </div>
  );
};
