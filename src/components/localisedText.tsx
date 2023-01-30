import { useAuthUser } from "@react-query-firebase/auth";
import { useFirestoreDocumentData } from "@react-query-firebase/firestore";
import { collection, doc } from "firebase/firestore";
import { getLocalisedText } from "../utils/localisation";
import { auth, firestore } from "../firebase/firebase";

interface LocalisedTextProps {
  textKey: string;
}

export const LocalisedText = ({ textKey }: LocalisedTextProps) => {
  const user = useAuthUser(["user"], auth);

  if (!user.data) return getLocalisedText("english", textKey);

  const userSettingsCollectionRef = collection(firestore, "user-settings");
  const userSettingsRef = doc(userSettingsCollectionRef, user.data?.uid);
  const userSettings = useFirestoreDocumentData(
    ["user-settings", user.data?.uid],
    userSettingsRef
  );

  return getLocalisedText(userSettings.data?.language || "english", textKey);
};
