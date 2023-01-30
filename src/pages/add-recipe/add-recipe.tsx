import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { collection } from "firebase/firestore";
import { useState } from "react";
import { auth, firestore } from "../../firebase/firebase";
import { Input } from "components/input/input";
import { useAuthUser } from "@react-query-firebase/auth";

export const AddRecipe = () => {
  const [name, setName] = useState("");
  const user = useAuthUser(["user"], auth);
  const ref = collection(firestore, "recipes");
  const mutation = useFirestoreCollectionMutation(ref);

  const handleSave = () => {
    mutation.mutate({
      name,
      userId: user.data?.uid,
    });
  };

  return (
    <div>
      <form>
        <Input
          label="Name of the recipe"
          name="recipeName"
          onChange={setName}
          type="text"
          value={name}
        />
        {mutation.isError && <p>{mutation.error.message}</p>}
        <button disabled={mutation.isLoading} onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};
