import React, { useState, useEffect } from 'react';
import { getData } from '../../../script/serverHandleing';

const PlaneBuyOption = ({ plane, onInfoClick, onBuyClick }) => {
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const data = await getData();
        const airports = data.unlockedLocation;
        setAirports(airports);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAirports();
  }, []); // Empty dependency array ensures that the effect runs once when the component mounts

  return (
    <div
      className='plane-buy-option'
      style={{
        width: 600,
        gap: 10,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <span>{plane.name}</span>
      <button onClick={() => onInfoClick(plane)}>Info</button>
      <div className='flex' style={{ width: 600 }}>
        <select style={{ width: 250 }}>
          <option value='' selected disabled>
            --SELECT--
          </option>
          {airports.map((airport, index) => {
            if (plane.location === airport) return <></>;
            return (
              <option key={index} value={airport}>
                {airport}
              </option>
            );
          })}
        </select>
        <button onClick={() => onBuyClick(plane)} style={{ width: 270 }}>
          Set Destination
        </button>
      </div>
    </div>
  );
};

export default PlaneBuyOption;
