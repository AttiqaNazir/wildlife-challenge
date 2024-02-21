import React, { useState } from "react";

import { AnimalCard } from "../AnimalCard/AnimalCard";
import AnimalService from "../../services/AnimalService";
import styles from "./AnimalList.module.css";

const AnimalList = () => {
  const [animals, setAnimals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const animalService = new AnimalService();

  const handleInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const animalData = await animalService.fetchAnimalData(searchTerm);
      if (animalData.error || animalData.length === 0) {
        alert("No Animal Found");
      } else {
        setAnimals(animalData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTofavourites = (animal) => {
    const favouritesData = JSON.parse(localStorage.getItem("favourites")) || [];

    const characteristicsArray = Object.entries(animal.characteristics).map(
      ([key, value]) => ({
        [key]: { value, isLiked: false, isDisliked: false },
      })
    );
    favouritesData.push({
      ...animal,
      characteristics: characteristicsArray,
    });
    localStorage.setItem("favourites", JSON.stringify(favouritesData));
  };

  const AnimalsDiv = () => {
    return (
      <div className={styles["animal-list__cards-container"]}>
        {animals.length > 0 &&
          animals.map((animal) => {
            return (
              <AnimalCard
                key={animal.name}
                animalInfo={animal}
                onAddTofavourites={handleAddTofavourites}
              />
            );
          })}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          type="text"
          value={searchTerm}
          placeholder="search animals..."
          onChange={handleInput}
          className={styles.input}
        />
        <button onClick={fetchData} className={styles.button}>
          Search
        </button>
      </div>

      {loading ? <div>Loading...</div> : <AnimalsDiv />}
    </div>
  );
};

export default AnimalList;
