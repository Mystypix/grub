import { useAuthUser } from "@react-query-firebase/auth";
import { useEffect, useState } from "react";
import { auth, firestore } from "../../firebase/firebase";
import { Input } from "../../components/input/input";
import { collection, doc } from "firebase/firestore";
import {
  useFirestoreDocumentData,
  useFirestoreDocumentMutation,
} from "@react-query-firebase/firestore";
import { Button } from "../../components/button/button";
import { Loader } from "../../components/loader/loader";
import css from "./settings.module.scss";

export const Settings = () => {
  const user = useAuthUser(["user"], auth);
  const userSettingsCollectionRef = collection(firestore, "user-settings");
  const userSettingsRef = doc(userSettingsCollectionRef, user.data?.uid);
  const userSettings = useFirestoreDocumentData(
    ["user-settings", user.data?.uid],
    userSettingsRef
  );

  const mutation = useFirestoreDocumentMutation(userSettingsRef, {
    merge: true,
  });

  const [formData, setFormData] = useState({
    email: user.data?.email || "",
    firstName: "",
    lastName: "",
    displayName: user.data?.displayName || "",
    password: "",
  });

  useEffect(() => {
    setFormData({
      ...formData,
      firstName: userSettings.data?.firstName || "",
      lastName: userSettings.data?.lastName || "",
      displayName:
        userSettings.data?.displayName || user.data?.displayName || "",
    });
  }, [userSettings.isLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    mutation.mutate({
      firstName: formData.firstName,
      lastName: formData.lastName,
      displayName: formData.displayName,
    });
  };

  if (user.isLoading || userSettings.isLoading) {
    return <Loader />;
  }

  return (
    <div className={css.wrapper}>
      <Input label="Email" name="email" value={formData.email} disabled />
      <Input
        label="First name"
        name="firstName"
        onChange={handleChange}
        value={formData.firstName}
      />
      <Input
        label="Last name"
        name="lastName"
        onChange={handleChange}
        value={formData.lastName}
      />
      <Input
        label="Display name"
        name="displayName"
        onChange={handleChange}
        value={formData.displayName}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        onChange={handleChange}
        value={formData.password}
        placeholder="********"
      />
      <Button onClick={handleSubmit}>Save</Button>
    </div>
  );
};
