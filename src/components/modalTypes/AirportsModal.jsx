import React from 'react';

const AirportsModal = ({ userData, worldData }) => {
  console.log(userData, worldData);
  const unlocked = userData.unlockedLocation;
  const toUnlock = getAirportsToUnlock();

  function getAirportsToUnlock() {
    const airports = worldData;
    const unlocked = userData.unlockedLocation;

    // Use the filter method to get airports that are not unlocked
    const allAirportsNotUnlocked = airports.filter(
      (airport) => !unlocked.includes(airport)
    );

    return allAirportsNotUnlocked;
  }

  console.log(toUnlock);

  return (
    <div>
      <span>Owned Airports</span>
      <hr style={{ marginBlock: 10, opacity: 0.7 }} />
      <ul style={{ listStyle: 'inside', marginLeft: 30 }}>
        {unlocked.map((airport) => (
          <li>{airport.toUpperCase()}</li>
        ))}
      </ul>
      {toUnlock.length !== 0 && (
        <>
          <hr style={{ marginBlock: 10, opacity: 0.7 }} />
          <span>Airports To Unlock</span>
          <hr style={{ marginBlock: 10, opacity: 0.7 }} />
          <ul style={{ listStyle: 'inside', marginLeft: 30 }}>
            {toUnlock.map((airport) => (
              <li key={airport}>{airport.toUpperCase()}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default AirportsModal;
