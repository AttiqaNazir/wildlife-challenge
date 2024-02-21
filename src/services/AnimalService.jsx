class AnimalService {
    async fetchAnimalData(animalName) {
    
      const url = `https://api.api-ninjas.com/v1/animals?name=${animalName}`;
      try {
        const response = await fetch(url, {
          headers: {
            "X-Api-Key": "O44e9wIGMQJtsOi1A4SzNA==ULJ53e5dbNxCv6af",
          },
        });
  
        const data = await response.json();
        return data;

      } catch (error) {
         throw new Error(error);
      }
    }
  }
  
  export default AnimalService;