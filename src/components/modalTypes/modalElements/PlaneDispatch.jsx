import React, { useState, useEffect } from 'react';
import { getData, saveData, updateData } from '../../../script/serverHandleing';
import PlaneInfo from '../PlaneInfo';
import displayTimeFormat from '../../../script/planeDispatchScripts';
import { updateLocation } from '../../../script/updateLocation';

const PlaneDispatch = ({ plane, iteration, set_opened_modal }) => {
  const [airports, setAirports] = useState([]);
  const [planeDestination, setPlaneDestination] = useState('');
  const [arrivalHandled, setArrivalHandled] = useState(false);

  const [remainingTime, setRemainingTime] = useState(
    plane.nextFlightTime || null
  );

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
  }, []);

  useEffect(() => {
    let timer;

    if (plane.nextFlightTime) {
      const updateRemainingTime = () => {
        let currentTime = Math.round(new Date().getTime());
        if (plane.nextFlightTime > currentTime) {
          setRemainingTime(
            displayTimeFormat(plane.nextFlightTime - currentTime)
          );
        } else {
          setRemainingTime(null);
        }
      };

      const handleArrival = () => {
        if (
          (remainingTime === 0 && !arrivalHandled) ||
          (remainingTime === '0s' && !arrivalHandled)
        ) {
          console.log('MODAL -- ARRIVED');
          setRemainingTime(-1);
          console.log(plane.nextFlightDestination);
          console.log(plane.location);
          updateLocation(plane.nextFlightDestination, iteration);
          console.log(plane.location);
          clearInterval(timer);
          addXp(15);
          setArrivalHandled(true);

          // Additional logic to reset nextFlightDestination and nextFlightTime in the data
          // getData().then((data) => {
          //   const currentData = data;
          //   currentData.planes[iteration].nextFlightDestination = null;
          //   currentData.planes[iteration].nextFlightTime = null;
          //   saveData(currentData).then(() => {
          //     // Perform any additional actions after saving data
          //   });
          // });
        }
      };

      // Start a timer to update remaining time every second
      timer = setInterval(() => {
        updateRemainingTime();
        handleArrival();
      }, 1000);

      // Call it initially to set the remaining time
      updateRemainingTime();
    }

    return () => {
      clearInterval(timer);
    };
  }, [plane.nextFlightTime, remainingTime]);

  function onInfoClick(plane) {
    set_opened_modal(<PlaneInfo plane={plane} />);
  }

  async function addXp(amount) {
    setRemainingTime(null);

    try {
      const currentData = await getData();
      if (currentData.xp === undefined || currentData.xp === null) {
        currentData.xp = 0;
      }
      currentData.xp = currentData.xp + amount;
      await saveData(currentData);
    } catch (error) {
      console.error('Error in addXp:', error);
    }
  }

  async function setDestination() {
    if (!planeDestination) return;

    try {
      const currentData = await getData();
      currentData.planes[iteration].nextFlightDestination = planeDestination;

      const currentTime = Math.round(new Date().getTime());
      const timeInMsToAdd = 60000;
      currentData.planes[iteration].nextFlightTime =
        currentTime + timeInMsToAdd;

      await saveData(currentData);
      setPlaneDestination('');
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
        {plane.nextFlightDestination == null ||
        remainingTime == null ||
        remainingTime === -1 ? (
          <>
            <select
              style={{ width: 250 }}
              value={planeDestination}
              onChange={(e) => setPlaneDestination(e.target.value)}
              defaultValue=''
            >
              <option value='' disabled style={{ opacity: 0.5 }}>
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
        ) : (
          <>
            <hr />
            <span>
              {remainingTime === 0 ? (
                'Ready to dispatch'
              ) : (
                <>
                  <span>
                    Aircraft is Enroute to {plane.nextFlightDestination}
                  </span>
                  <br />
                  <strong>{remainingTime}</strong>
                </>
              )}
            </span>
            <hr />
          </>
        )}
      </div>
    </div>
  );
};

export default PlaneDispatch;
