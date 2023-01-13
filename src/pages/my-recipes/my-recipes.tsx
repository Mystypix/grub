import { useAuthUser } from "@react-query-firebase/auth";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { collection, query, limit, where } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase";

export const MyRecipes = () => {
  const user = useAuthUser(["user"], auth);

  const ref = query(
    collection(firestore, "recipes"),
    limit(10),
    where("userId", "==", `${user.data?.uid}`)
  );

  const result = useFirestoreQuery(["products"], ref);

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  const snapshot = result.data;

  if (!snapshot) return <div>Fuck</div>;

  return (
    <div>
      {snapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();

        return <div key={docSnapshot.id}>{data.name}</div>;
      })}
    </div>
  );
};
