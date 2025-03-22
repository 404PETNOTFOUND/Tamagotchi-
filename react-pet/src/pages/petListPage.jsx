import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

const PetListPage = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('https://ps99.biggamesapi.io/api/collection/Pets'); 
        const petsData = await response.json();
        setPets(petsData);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };
    fetchPets();
  }, []);

  return (
    <div>
      <h1>Pet List</h1>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            <Link to={`/pet/${pet.id}`}>{pet.name}</Link> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PetListPage;
