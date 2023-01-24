import React, { SyntheticEvent } from "react";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { collection } from "firebase/firestore";
import { useState } from "react";
import { auth, firestore } from "../../firebase/firebase";
import { useAuthUser } from "@react-query-firebase/auth";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";
import css from "./add-recipe.module.scss";

export const AddRecipe = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState("");

  const user = useAuthUser(["user"], auth);
  const ref = collection(firestore, "recipes");
  const mutation = useFirestoreCollectionMutation(ref);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    mutation.mutate({
      // TODO JaKa what is this doing ?
      name,
      userId: user.data?.uid,
    });

    console.log(e);
  };

  // TODO testing onClick button event vs onSubmit form
  // input needs to have type, and id for htmlFor
  return (
    <form className={css.newRecipeForm} onSubmit={onSubmit}>
      {mutation.isError && <p>{mutation.error.message}</p>}
      <Input
        label="Recipe title"
        name="recipeTitle"
        onChange={setName}
        placeholder="Delicious name for your meal"
        value={name}
      ></Input>
      <Input
        label="Description"
        name="recipeDescription"
        onChange={setDescription}
        placeholder="This meal is the best !"
        value={description}
      ></Input>
      <Input
        label="Servings"
        name="recipeServings"
        onChange={setServings}
        placeholder="f.e. 4"
        value={servings}
      ></Input>

      <Button
        type="submit"
        variant="primary"
        name="saveButton"
        onClick={onSubmit}
        disabled={mutation.isLoading}
      >
        Save the grub!
      </Button>
    </form>
  );
};
