import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { handleFetch } from '../adapters/fetchPetData';

const HomePage = () => {
    const [petsList, setPetsList] = useState([]); // State to store pets
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // STATE to track users search inputs
    const [filteredPets, setFilteredPets] = useState([]); // state to store filtered lists of pets that people search


    // fetching my pets 
    useEffect(() => {
        const fetchPetsList = async () => {
            try {
                const [data, fetchError] = await handleFetch('https://ps99.biggamesapi.io/api/collection/Pets');

                if (fetchError) {
                    setError(fetchError.message);
                    return;
                }

                if (data?.status === 'ok' && Array.isArray(data.data)) {
                    setPetsList(data.data);
                    setFilteredPets(data.data);
                } else {
                    setError("Unexpected data format from API."); // handling errors
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchPetsList();
    }, []);


    // filter pets when search query gets input
    useEffect(() => {
        if (searchQuery) {
            setFilteredPets(
                petsList.filter((pet) =>
                    pet.configName.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredPets(petsList.slice(0, 30)); // filtering default list of 30 in homepage 
        }
    }, [searchQuery, petsList]); 

    if (error) return <div>Error: {error}</div>;
    if (petsList.length === 0) return <div>Loading...</div>; // while api is loading show actual loading on pG

    return (
        <div>
            <h1>Pet Dashboard</h1>
            <input
                type="text"
                placeholder="Search pets by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ul>
                {filteredPets.length > 0 ? (
                    filteredPets.map((pet) => (
                        <li key={pet.configName}>
                            <Link to={`/pet/${encodeURIComponent(pet.configName)}`}>
                                <h2>{pet.configName || 'No Name'}</h2>
                            </Link>
                        </li>
                    ))
                ) : (
                    <p>No pets found.</p>
                )}
            </ul>
        </div>
    );
};

export default HomePage;
