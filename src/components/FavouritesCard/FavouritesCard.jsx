import React, { useEffect, useState } from "react";
import styles from "../FavouritesCard/FavouritesCard.module.css";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa"; // Import thumbs-up and thumbs-down icons

export const FavouriteCard = ({
  animalInfo,
  onAddTofavourites,
  onHandleRemoveFromFavourites,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [favouritesData, setFavouritesData] = useState({});

  useEffect(() => {
    const storageItems = JSON.parse(localStorage.getItem("favourites") || "[]");
    if (storageItems && storageItems.length) {
      const exists = storageItems.find((item) => item.name === animalInfo.name);
      if (exists) {
        setIsAdded(true);
      }
    }
  }, []);

  const getColor = () => {
    const colors = animalInfo.characteristics.find(
      (characteristic) => Object.keys(characteristic)[0] === "color"
    );

    if (colors) {
      const splitColors = colors.color.value.split(/(?=[A-Z])/).join(", ");
      return splitColors;
    }
    return "Not Available";
  };

  const getAttributeValue = (attributeName) => {
    const characteristic = animalInfo.characteristics.find(
      (characteristic) => Object.keys(characteristic)[0] === attributeName
    );
    return characteristic
      ? characteristic[attributeName].value
      : "Not Available";
  };

  const handleAddTofavourites = () => {
    onAddTofavourites(animalInfo);
    setIsAdded(true);
  };

  const removeFromFavourites = () => {
    const storageItems = JSON.parse(localStorage.getItem("favourites") || "[]");
    const updatedItems = storageItems.filter(
      (item) => item.name !== animalInfo.name
    );
    localStorage.setItem("favourites", JSON.stringify(updatedItems));
    setIsAdded(false);
    onHandleRemoveFromFavourites(animalInfo.name);
  };

  const checkIsLiked = (attributeName) => {
    const favouritesData = JSON.parse(localStorage.getItem("favourites")) || [];
    const index = favouritesData.findIndex(
      (item) => item.name === animalInfo.name
    );

    const characteristics = favouritesData[index].characteristics;

    const attributeObject = characteristics.find(
      (characteristic) => Object.keys(characteristic)[0] === attributeName
    );
    const isColorLiked = attributeObject
      ? attributeObject[attributeName].isLiked
      : null;
    return isColorLiked;
  };

  const checkIsDisliked = (attributeName) => {
    const favouritesData = JSON.parse(localStorage.getItem("favourites")) || [];
    const index = favouritesData.findIndex(
      (item) => item.name === animalInfo.name
    );

    const characteristics = favouritesData[index].characteristics;

    const attributeObject = characteristics.find(
      (characteristic) => Object.keys(characteristic)[0] === attributeName
    );

    const isColorDisliked = attributeObject
      ? attributeObject[attributeName].isDisliked
      : null;
    return isColorDisliked;
  };

  const handleLike = (attributeName) => {
    const favouritesData = JSON.parse(localStorage.getItem("favourites")) || [];

    const index = favouritesData.findIndex(
      (item) => item.name === animalInfo.name
    );

    if (index !== -1) {
      const updatedData = [...favouritesData];

      const characteristicsArray = updatedData[index].characteristics;

      const characteristicToUpdate = characteristicsArray.find(
        (characteristic) => Object.keys(characteristic)[0] === attributeName
      );

      if (characteristicToUpdate) {
        characteristicToUpdate[attributeName].isLiked =
          !characteristicToUpdate[attributeName].isLiked;

        if (characteristicToUpdate[attributeName].isLiked) {
          characteristicToUpdate[attributeName].isDisliked = false;
        }

        localStorage.setItem("favourites", JSON.stringify(updatedData));
        setFavouritesData(updatedData);
      }
    }
  };
  const handleDislike = (attributeName) => {
    const favouritesData = JSON.parse(localStorage.getItem("favourites")) || [];

    const index = favouritesData.findIndex(
      (item) => item.name === animalInfo.name
    );

    if (index !== -1) {
      const updatedData = [...favouritesData];

      const characteristicsArray = updatedData[index].characteristics;

      const characteristicToUpdate = characteristicsArray.find(
        (characteristic) => Object.keys(characteristic)[0] === attributeName
      );

      if (characteristicToUpdate) {
        characteristicToUpdate[attributeName].isDisliked =
          !characteristicToUpdate[attributeName].isDisliked;

        if (characteristicToUpdate[attributeName].isDisliked) {
          characteristicToUpdate[attributeName].isLiked = false;
        }

        localStorage.setItem("favourites", JSON.stringify(updatedData));
        setFavouritesData(updatedData);
      }
    }
  };

  if (animalInfo) {
    return (
      <div className={styles.animal}>
        <h2>{animalInfo.name}</h2>

        <div className={styles.attributes}>
          <div className={styles.attribute}>
            <label>Color:</label>
            <div className={styles.attributeContent}>
              <div className={styles.colorValue}>{getColor()}</div>
              {getColor() !== "Not Available" && (
                <div className={styles.iconContainer}>
                  <FaThumbsUp
                    className={
                      checkIsLiked("color") ? styles.iconLiked : styles.icon
                    }
                    onClick={() => handleLike("color")}
                  />
                  <FaThumbsDown
                    className={
                      checkIsDisliked("color")
                        ? styles.iconDisliked
                        : styles.icon
                    }
                    onClick={() => handleDislike("color")}
                  />
                </div>
              )}
            </div>
          </div>

          <div className={styles.attribute}>
            <label>Lifespan: </label>
            <div className={styles.attributeValue}>
              {getAttributeValue("lifespan")}
            </div>
            {getAttributeValue("lifespan") !== "Not Available" && (
              <div className={styles.iconContainer}>
                <FaThumbsUp
                  className={
                    checkIsLiked("lifespan") ? styles.iconLiked : styles.icon
                  }
                  onClick={() => handleLike("lifespan")}
                />
                <FaThumbsDown
                  className={
                    checkIsDisliked("lifespan")
                      ? styles.iconDisliked
                      : styles.icon
                  }
                  onClick={() => handleDislike("lifespan")}
                />
              </div>
            )}
          </div>

          <div className={styles.attribute}>
            <label>Diet: </label>
            <div className={styles.attributeValue}>
              {getAttributeValue("diet")}
            </div>
            {getAttributeValue("diet") !== "Not Available" && (
              <div className={styles.iconContainer}>
                <FaThumbsUp
                  className={
                    checkIsLiked("diet") ? styles.iconLiked : styles.icon
                  }
                  onClick={() => handleLike("diet")}
                />
                <FaThumbsDown
                  className={
                    checkIsDisliked("diet") ? styles.iconDisliked : styles.icon
                  }
                  onClick={() => handleDislike("diet")}
                />
              </div>
            )}
          </div>

          <div className={`${styles.attribute} ${styles.attribute__habitat}`}>
            <label>Skin Type: </label>
            <div className={styles.attributeValue}>
              {getAttributeValue("skin_type")}
            </div>
            {getAttributeValue("skin_type") !== "Not Available" && (
              <div className={styles.iconContainer}>
                <FaThumbsUp
                  className={
                    checkIsLiked("skin_type") ? styles.iconLiked : styles.icon
                  }
                  onClick={() => handleLike("skin_type")}
                />
                <FaThumbsDown
                  className={
                    checkIsDisliked("skin_type")
                      ? styles.iconDisliked
                      : styles.icon
                  }
                  onClick={() => handleDislike("skin_type")}
                />
              </div>
            )}
          </div>
        </div>

        <div className={styles.add}>
          {isAdded ? (
            <button
              className={`${styles.button} ${styles.added}`}
              onClick={removeFromFavourites}
            >
              Remove from favourites
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
