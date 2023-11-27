import React, { useEffect, useState } from 'react';
import unlockAirport from '../script/unlockAirport';
import { getData, getWorldData } from '../script/serverHandleing';

var airports = [];

const AirCost = ({ setXp, airportModal }) => {
  const [airportIcao, setAirportIcao] = useState('');

  async function getUnlockedAirports() {
    const data = await getData();
    const airports = data.unlockedLocations;
    return airports;
  }

  useEffect(() => {
    async function functions() {
      airports = await getUnlockedAirports();
    }
    functions();
    console.log(airports);
  }, []);

  return (
    <div className='buttons_container  airport_container vertical_flex'>
      <span className='window_name'>//airport costs</span>

      <div>
        <input
          type='text'
          maxLength={4}
          placeholder='EPWA'
          onChange={(e) => setAirportIcao(e.target.value)}
        />
        <button
          onClick={() => unlockAirport(airportIcao, setXp, setAirportIcao)}
        >
          Unlock Airport
        </button>
      </div>
      <button onClick={airportModal} style={{ maxWidth: 655 }}>
        See All Airports
      </button>
    </div>
  );
};

export default AirCost;
