import React from "react";
import css from "./recipe-tile.module.scss";
import RecipeInterface from "../../interfaces/recipe";
// TODO JaKa import rating component
// TODO JaKa import like button component

interface RecipeTileInputs {
  isFavorite: boolean; // TODO JaKa what if unregistered user? what if registered user? the icon should change according to the fact that user liked it or not. But unregistered user does not provide this info. Registered user has it in his database document (noSQL) - needed second call for the user records ?
  recipeData: RecipeInterface;
}
export const RecipeTile = ({ isFavorite, recipeData }: RecipeTileInputs) => {
  // TODO JaKa like will be replaced by a like button component
  // TODO JaKa image from a database
  // TODO JaKa rating will be replace by a rating component

  return (
    <div className={css["recipe-tile"]}>
      <button className={isFavorite ? css["add-to-favorite"] : ""}>Like</button>
      <img src="food.webp" className={css["recipe-image"]} /> // TODO binary
      format in db
      <div className={css["recipe-short-info"]}>
        <p className={css["recipe-header"]}>{recipeData.name}</p>
        <div className="rating"> </div>
      </div>
    </div>
  );
};
