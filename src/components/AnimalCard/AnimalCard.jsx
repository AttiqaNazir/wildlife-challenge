import React, { useEffect, useState } from "react";
import styles from "./AnimalCard.module.css";

export const AnimalCard = ({ animalInfo, onAddTofavourites }) => {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const storageItems = JSON.parse(localStorage.getItem("favourites") || "[]");
    if (storageItems && storageItems.length) {
      const exists = storageItems.find((item) => item.name === animalInfo.name);
      if (exists) {
        setAdded(true);
      }
    }
  }, []);

  const getColor = () => {
    const colors = animalInfo.characteristics.color;

    if (colors) {
      const splitColors = colors.split(/(?=[A-Z])/).join(", ");
      return splitColors;
    }
    return "-";
  };

  const getLocation = () => {
    const locations = animalInfo.locations;
    if (locations) {
      const splitLocations = locations.join(", ");
      return splitLocations;
    }
    return "-";
  };

  const handleAddTofavourites = () => {
    onAddTofavourites(animalInfo);
    setAdded(true);
  };

  if (animalInfo) {
    return (
      <div className={styles.animal}>
        <h2>{animalInfo.name}</h2>

        <div className={styles.attributes}>
          <div className={styles.attribute}>
            <label>Color:</label>
            <div>{getColor()}</div>
          </div>

          <div className={styles.attribute}>
            <label>Locations: </label>
            <div>{getLocation()}</div>
          </div>

          <div className={styles.attribute}>
            <label>Diet: </label>
            <span> {animalInfo.characteristics.diet
                ? animalInfo.characteristics.diet
                : "Not Available"}</span>
          </div>

          <div className={styles.attribute}>
            <label>Skin Type: </label>
            <span>
              {animalInfo.characteristics.skin_type
                ? animalInfo.characteristics.skin_type
                : "Not Available"}
            </span>
          </div>

          <div className={`${styles.attribute} ${styles.attribute__habitat}`}>
            <label>Life Span: </label>
            <div>
              {animalInfo.characteristics.lifespan
                ? animalInfo.characteristics.lifespan
                : "Not Available"}
            </div>
          </div>
        </div>

        <div className={styles.add}>
          {added ? (
            <button className={`${styles.button} ${styles.added}`} disabled>
              Added
            </button>
          ) : (
            <button className={styles.button} onClick={handleAddTofavourites}>
              Add to favourites
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
};
