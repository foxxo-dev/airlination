import React, { useState, useEffect } from 'react';
import { getData, saveData, updateData } from '../../../script/serverHandleing';
import PlaneInfo from '../PlaneInfo';

const PlaneBuyOption = ({
  plane,
  iteration,
  set_opened_modal,
  isPlaneUsed
}) => {
  const [airports, setAirports] = useState([]);
  const [planeDestination, setPlaneDestination] = useState('');

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

  function onInfoClick(plane) {
    set_opened_modal(<PlaneInfo plane={plane} />);
  }

  async function setDestination() {
    if (planeDestination === '' || planeDestination == null) return;

    try {
      const currentData = await getData();
      console.log('data before: ', currentData);

      // Assuming `iteration` is defined somewhere in your code
      currentData.planes[iteration].nextFlightDestination = planeDestination;
      currentData.planes[iteration].nextFlightTime = 120;

      console.log('Data After: ', currentData);

      await saveData(currentData);
      setPlaneDestination('');
      console.log('Finished Operation');
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  }
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
        {!isPlaneUsed && (
          <>
            <select
              style={{ width: 250 }}
              value={planeDestination}
              onChange={(e) => setPlaneDestination(e.target.value)}
            >
              <option value='' selected disabled style={{ opacity: 0.5 }}>
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
            <button onClick={setDestination} style={{ width: 270 }}>
              Set Destination
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PlaneBuyOption;
