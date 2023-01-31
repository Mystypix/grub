import { useAuthUser } from "@react-query-firebase/auth";
import { useFirestoreDocumentData } from "@react-query-firebase/firestore";
import { collection, doc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase";
import css from "./avatar.module.scss";

export const Avatar = () => {
  const user = useAuthUser(["user"], auth);
  const userSettingsCollectionRef = collection(firestore, "user-settings");
  const userSettingsRef = doc(userSettingsCollectionRef, user.data?.uid);
  const userSettings = useFirestoreDocumentData(
    ["user-settings", user.data?.uid],
    userSettingsRef
  );

  const renderAvatar = () => {
    if (user.data?.photoURL) {
      return (
        <img src={user.data?.photoURL} alt="Avatar" className={css.photo} />
      );
    }

    if (userSettings.data?.firstName || userSettings.data?.displayName) {
      const initialLetter =
        userSettings.data?.firstName.slice(0, 1) ||
        userSettings.data?.displayName.slice(0, 1);
      return <div className={css.initial}>{initialLetter}</div>;
    }
  };

  return <div className={css.wrapper}>{renderAvatar()}</div>;
};
