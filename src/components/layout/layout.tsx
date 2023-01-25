import { useAuthUser } from "@react-query-firebase/auth";
import { auth } from "../../firebase/firebase";
import { Navbar } from "../navbar/navbar";
import css from "./layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const user = useAuthUser(["user"], auth);

  return (
    <div className={css.wrapper}>
      {user.data && <Navbar />}
      <div>{children}</div>
    </div>
  );
};
