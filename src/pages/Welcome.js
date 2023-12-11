import React, { useEffect } from 'react';
import '../css/main.css';
import { useParams } from 'react-router-dom';
import { getWorldData } from '../script/serverHandleing.js';
import Modal_hdl from '../script/modalHandleing.js';
import { Budgeting, AirCost, Map, Modal, AircraftModal } from '../components';
import { fetchDataConverted } from '../script/fetchDataConverted.js';
import {
  responseData,
  worldData,
  setWorldData,
  isModalOpen
} from '../script/appStates.js';

// Imports ToDo: make loading screen do something

const Welcome = () => {
  const { name, id, location } = useParams();
  // const type = id[0] === 'w' ? 'WORLD' : 'DOMESTIC';

  useEffect(() => {
    const fetchWorldData = async () => {
      try {
        const res = await getWorldData();
        setWorldData(JSON.parse(res));
        console.log('World Data: ', res);
      } catch (err) {
        alert('Application Exited With Error: ' + err);
      }
    };

    // Avoid calling window.location.reload() here

    fetchWorldData();
    // name, id, location, setResponseData, setXp, setLvl
    fetchDataConverted(name, id, location);
  }, [name, id, location]); // Add location to dependencies if needed

  const handleInfoClick = (plane) => {
    console.log(`Info clicked for plane: ${plane.name}`);
  };

  const handleBuyClick = (plane) => {
    console.log(`Buy clicked for plane: ${plane.name}`);
  };

  return (
    <div className='container'>
      <Budgeting
        close_modal={Modal_hdl.close_modal()}
        open_aircraft_modal={Modal_hdl.open_aircraft_modal(
          responseData,
          AircraftModal,
          handleInfoClick,
          handleBuyClick
        )}
      />
      <AirCost
        airportModal={Modal_hdl.open_airports_modal(worldData, responseData)}
      />
      <Map />
      {isModalOpen && <Modal close_modal={Modal_hdl.close_modal()} />}
    </div>
  );
};

export default Welcome;
