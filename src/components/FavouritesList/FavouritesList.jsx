import React, { useEffect, useState } from "react";
import { FavouriteCard } from "../FavouritesCard/FavouritesCard";
import styles from "./FavouritesList.module.css";

export const FavouritesList = () => {
  const [favouriteAnimals, setFavouriteAnimals] = useState([]);

  useEffect(() => {
    const storageItems = JSON.parse(localStorage.getItem("favourites") || "[]");
    if (storageItems && storageItems.length) {
      setFavouriteAnimals(storageItems);
    }
  }, []);

  const handleRemoveFromFavourites = (animalName) => {
    const updatedFavourites = favouriteAnimals.filter(
      (animal) => animal.name !== animalName
    );
    setFavouriteAnimals(updatedFavourites);
  };

  if (favouriteAnimals) {
    return (
      <div className={styles.favourites}>
        <h1>Favourite Animals</h1>
        <div className={styles.favouritesList}>
          {favouriteAnimals.map((animal) => {
            return (
              <FavouriteCard
                key={animal.name}
                animalInfo={animal}
                onHandleRemoveFromFavourites={handleRemoveFromFavourites}
              />
            );
          })}
        </div>
      </div>
    );
  }
};
