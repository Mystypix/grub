import { useAuthUser } from "@react-query-firebase/auth";
import { useFirestoreDocumentData } from "@react-query-firebase/firestore";
import { collection, doc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase";
import { Navbar } from "../navbar/navbar";
import css from "./layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const user = useAuthUser(["user"], auth);
  const collectionRef = collection(firestore, "user-settings");
  const ref = user.data && doc(collectionRef, user.data.uid);
  const userSettings = useFirestoreDocumentData(
    ["user-settings", user.data?.uid],
    ref
  );
  const isDarkMode = userSettings?.data?.darkMode;

  return (
    <div className={css.wrapper} data-theme={isDarkMode ? "dark" : "light"}>
      {user.data && <Navbar />}
      <div>{children}</div>
    </div>
  );
};
