import React from "react";
import css from "./recipe-tile.module.scss";
import RecipeInterface from "../../interfaces/recipe";
import { useNavigate } from "react-router-dom";
import clsx from "clsx"; //not necessary at last
// TODO JaKa import like button component

export const RecipeTile = (recipe: RecipeInterface) => {
  // TODO I want to pass the whole object inside the component. Component itself will take the data. Is this the right syntax ? I have to try it myself ...
  // TODO JaKa image from a database
  // TODO img will be in binary format in db
  const navigate = useNavigate();

  return (
    <div
      className={css.recipeTile}
      onClick={() => {
        navigate(`/recipe/${recipe.id}`);
      }}
    >
      {recipe.isFavorite && <button className={css.isFavorite}></button>}
      <img src="food.webp" className={css.recipePreview} />
      <h3 className={css.recipeHeader}>{recipe.name}</h3>
    </div>
  );
};
