
const PetDetailsList = ({ pet }) => {
  if (!pet || !pet.configData) {
    return <p>Loading pet details...</p>;
  }

  return (
    <div>
      <h1>{pet.configData.name || 'No Name'}</h1>
      <p>Found in: {pet.configData.indexDesc || 'No Description'}</p>
      <p>Egg Type: {pet.configData.fromEgg || 'No Egg Type'}</p>
    </div>
  );
};

export default PetDetailsList;
