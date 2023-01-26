import { useAuthUser } from "@react-query-firebase/auth";
import { auth } from "../../firebase/firebase";
import css from "./avatar.module.scss";

export const Avatar = () => {
  const user = useAuthUser(["user"], auth);

  return (
    <div className={css.wrapper}>
      {user.data?.photoURL && (
        <img src={user.data?.photoURL} alt="Avatar" className={css.photo} />
      )}
    </div>
  );
};
