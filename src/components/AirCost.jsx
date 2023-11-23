import React, { useState } from 'react';
import unlockAirport from '../script/unlockAirport';

const AirCost = ({ setXp }) => {
  const [airportIcao, setAirportIcao] = useState('');
  return (
    <div className='buttons_container vertical_flex airport_container'>
      <span className='window_name'>//airport costs</span>

      <div>
        <input
          type='text'
          maxLength={4}
          placeholder='EPWA'
          onChange={(e) => setAirportIcao(e.target.value)}
        />
        <button onClick={() => unlockAirport(airportIcao, setXp, setAirportIcao)}>
          Unlock Airport
        </button>
      </div>
    </div>
  );
};

export default AirCost;
