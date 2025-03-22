// src/pages/PetDetailPage.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import usePetStatus from '../components/PetStatus'; // Import the custom hook
import PetGif from '../components/PetGif'; // Import the PetGif component

const PetDetailPage = () => {
  const { id } = useParams(); // Get pet ID from the URL
  const navigate = useNavigate(); 
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);

  // Use the custom pet status hook
  const {
    hungerStatus,
    happinessStatus,
    cleanlinessStatus,
    feedPet,
    playWithPet,
    cleanPet,
  } = usePetStatus();

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        console.log("Fetching pet with ID:", id); 

        const response = await fetch(`https://ps99.biggamesapi.io/api/collection/Pets`);
        if (!response.ok) {
          throw new Error("Failed to fetch pet data");
        }

        const data = await response.json();
        console.log("Fetched all pets:", data); // Debug

        const petDetails = data.data.find(p => p.configData?.name === id || p.configName === id);
        console.log("Found pet:", petDetails); // Debug

        if (!petDetails) {
          throw new Error("Pet not found");
        }

        setPet(petDetails); // Storing pet details in state
      } catch (err) {
        console.error("Error fetching pet:", err);
        setError(err.message);
      }
    };

    fetchPetDetails();
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!pet) return <div>Loading pet details...</div>;

  // Function to go back to the homepage
  const goBack = () => {
    navigate('/'); // Navigate to homepage 
  };

  return (
    <div className="container">
      {/* Back Button */}
      <button onClick={goBack} className="button back-button">
        Go Back to Homepage
      </button>

      {/* Pet Name */}
      <h1 className="pet-name">{pet.configData?.name || 'No Name'}</h1>

      {/* Pet INFO */}
      <p className="pet-description">{pet.configData?.indexDesc || 'No Description'}</p>
      <p className="pet-egg">{pet.configData?.fromEgg || 'No Egg Type'}</p>

      {/* TEMP GIF */}
      <PetGif />

      {/* Pet Status */}
      <div className="status">
        <h3 className="status-heading">Status</h3>
        <p>{`Hunger Status: ${hungerStatus}`}</p>
        <p>{`Happiness Status: ${happinessStatus}`}</p>
        <p>{`Cleanliness Status: ${cleanlinessStatus}`}</p>
      </div>

 
      <div className="button-container">
        <button onClick={feedPet} className="button">
          Feed Pet
        </button>
        <button onClick={playWithPet} className="button">
          Play with Pet
        </button>
        <button onClick={cleanPet} className="button">
          Clean Pet
        </button>
      </div>
    </div>
  );
};

export default PetDetailPage;
