import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PetDetailPage = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://ps99.biggamesapi.io/api/collection/Pets/${petId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch pet details: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setPet(data);
      } catch (error) {
        console.error('Error fetching pet details:', error);
        setError(error);
      }
    };

    fetchPetDetails();
  }, [petId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{pet.configData.name}</h1>
      <p>Found in: {pet.configData.indexDesc}</p>
      <p>Egg Type: {pet.configData.fromEgg}</p>
     
    </div>
  );
};

export default PetDetailPage;