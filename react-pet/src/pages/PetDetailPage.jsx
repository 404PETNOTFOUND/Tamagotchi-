import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import usePetStatus from '../components/PetStatus'; // Import the custom hook

const PetDetailPage = () => {
  const { id } = useParams(); // Get pet ID from the URL
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

  return (
    <div>
      {/* a mess */}
      <h1 className="text-4xl font-bold font-[Press-Start-2P font-normal">{pet.configData?.name || 'No Name'}</h1>

      {/* Pet Description */}
      <p className="mt-4 text-lg">{pet.configData?.indexDesc || 'No Description'}</p>
      <p className="mt-2 text-lg">{pet.configData?.fromEgg || 'No Egg Type'}</p>

      {/* TEMP GIF */}
      <div className="mt-6">
        <div className="tenor-gif-embed" data-postid="2317318051051074411" data-share-method="host" data-aspect-ratio="0.85743" data-width="100%">
          <a href="https://tenor.com/view/charles-leclerc-staring-smooth-formula-one-ferrari-gif-2317318051051074411">
            Charles Leclerc Staring GIF
          </a> from 
          <a href="https://tenor.com/search/charles+leclerc-gifs">Charles Leclerc GIFs</a>
        </div>
        <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
      </div>

      {/* Pet Status */}
      <div className="mt-6">
        <h3 className="text-2xl font-[Press-Start-2P]">Status</h3>
        <p className="mt-2">{`Hunger Status: ${hungerStatus}`}</p>
        <p className="mt-2">{`Happiness Status: ${happinessStatus}`}</p>
        <p className="mt-2">{`Cleanliness Status: ${cleanlinessStatus}`}</p>
      </div>

      {/* Buttons to interact with the pet */}
      <div className="mt-6 space-x-4">
        <button 
          onClick={feedPet} 
          className="px-6 py-2 bg-blue-500 text-white font-[Press-Start-2P] rounded-md"
        >
          Feed Pet
        </button>
        <button 
          onClick={playWithPet} 
          className="px-6 py-2 bg-green-500 text-white font-[Press-Start-2P] rounded-md"
        >
          Play with Pet
        </button>
        <button 
          onClick={cleanPet} 
          className="px-6 py-2 bg-yellow-500 text-white font-[Press-Start-2P] rounded-md"
        >
          Clean Pet
        </button>
      </div>
    </div>
  );
};

export default PetDetailPage;
