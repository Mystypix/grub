import React from "react";
import css from "./recipe-tile.module.scss";
// TODO JaKa import rating component
// TODO JaKa import like button component

interface RecipeTileInputs {
  favorite: boolean; // TODO JaKa what if unregistered user? what if registered user - second call for the user records ?
  id: number; // TODO JaKa for routers navigation ??
  image: any; // TODO JaKa what kind of data - base64 format?
  name: string;
  rating: number;
}
export const RecipeTile = ({
  favorite,
  id,
  image,
  name,
  rating,
}: RecipeTileInputs) => {
  // TODO JaKa like will be replaced by a like button component
  // TODO JaKa image from a database
  // TODO JaKa rating will be replace by a rating component

  return (
    <div className={css["recipe-tile"]}>
      <button className={css["add-to-favorite"]}>Like</button>
      <img src="food.webp" className={css["recipe-image"]} />
      <div className={css["recipe-short-info"]}>
        <p className={css["recipe-header"]}>{name}</p>
        <div className="rating"> </div>
      </div>
    </div>
  );
};
