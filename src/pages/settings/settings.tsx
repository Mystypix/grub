import { useAuthUser } from "@react-query-firebase/auth";
import { useForm } from "react-hook-form";
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
    userSettingsRef,
    {
      subscribe: true,
    }
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: userSettings.data?.firstName || "",
      lastName: userSettings.data?.lastName || "",
      displayName:
        userSettings.data?.displayName || user.data?.displayName || "",
    },
  });

  const mutation = useFirestoreDocumentMutation(userSettingsRef, {
    merge: true,
  });

  const onSubmit = (data) => {
    const { firstName, lastName, displayName } = data;

    mutation.mutate({
      firstName,
      lastName,
      displayName,
    });
  };

  if (user.isLoading || userSettings.isLoading) {
    return <Loader />;
  }

  return (
    <div className={css.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Email" name={"email"} register={register} disabled />
        <Input label="First name" name="firstName" register={register} />
        <Input label="Last name" name="lastName" register={register} />
        <Input label="Display name" name="displayName" register={register} />
        <Input
          label="Password"
          name="password"
          type="password"
          register={register}
          placeholder="********"
        />
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};
