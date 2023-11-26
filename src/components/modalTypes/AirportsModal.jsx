import React from 'react';

const AirportsModal = ({ userData, worldData }) => {
  console.log(userData, worldData);
  const unlocked = userData.unlockedLocation;
  return (
    <div>
      <span>Owned Airports</span>
      <hr style={{marginBlock: 10, opacity: 0.7}} />
      <ul style={{ listStyle: 'inside', marginLeft: 30 }}>
        {unlocked.map((airport) => (
          <li>{airport.toUpperCase()}</li>
        ))}
      </ul>
    </div>
  );
};

export default AirportsModal;
