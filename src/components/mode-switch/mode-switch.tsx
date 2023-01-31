import { Icon } from "../icon";
import css from "./mode-switch.module.scss";
import SunIcon from "../../assets/svg/sun-1.svg";
import MoonIcon from "../../assets/svg/moon.svg";
import { collection, doc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase";
import {
  useFirestoreDocumentData,
  useFirestoreDocumentMutation,
} from "@react-query-firebase/firestore";
import { useState } from "react";
import { useAuthUser } from "@react-query-firebase/auth";

export const ModeSwitch = () => {
  const user = useAuthUser(["user"], auth);

  const collectionRef = collection(firestore, "user-settings");
  const ref = doc(collectionRef, user.data?.uid);
  const userSettings = useFirestoreDocumentData(
    ["user-settings", user.data?.uid],
    ref,
    {
      subscribe: true,
    }
  );
  const isDarkMode = userSettings.data && userSettings.data.darkMode;

  const mutation = useFirestoreDocumentMutation(ref);
  const [checked, setChecked] = useState(isDarkMode);

  const handleToggle = () => {
    setChecked(!checked);
    mutation.mutate({
      darkMode: !checked,
    });
  };

  return (
    <label className={css.wrapper}>
      <Icon className={css.icon} src={SunIcon} />
      <input
        type="checkbox"
        className={css.input}
        onChange={handleToggle}
        checked={checked}
      />
      <div className={css.toggle} />
      <Icon className={css.icon} src={MoonIcon} />
    </label>
  );
};
