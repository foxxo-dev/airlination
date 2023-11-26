import React, { useEffect, useState } from 'react';
import '../css/main.css';
import { useParams } from 'react-router-dom';
import {
  getData,
  getWorldData,
  updateData
} from '../script/serverHandleing.js';
import { saveInitialData } from '../script/saveInitialData';
import { initData } from '../constants/initData.js';
import {
  Budgeting,
  AirCost,
  Map,
  Modal,
  AircraftModal,
  CountryModal
} from '../components';
import AirportsModal from '../components/modalTypes/AirportsModal.jsx';

const Welcome = () => {
  const { name, id, location } = useParams();
  const type = id[0] === 'w' ? 'WORLD' : 'DOMESTIC';

  const [responseData, setResponseData] = useState({});
  const [worldData, setWorldData] = useState({ airports: [''] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openedModal, setOpenedModal] = useState(
    <AircraftModal aircraft_data={responseData.planes} />
  );
  const [xp, setXp] = useState(0);
  const [lvl, setLvl] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData();
        console.log('BEFORE CHECKING RESPONSE: ', res);
        console.log('PLANES LIST: ', res?.planes);

        if (!res || JSON.stringify(res) === '{}') {
          console.log('No data saved, saving initial data');
          console.log('Initial data:', initData(name, id));
          saveInitialData(initData(name, id, location));

          const newData = await getData();
          setResponseData(newData);

          console.log('RES after init: ', responseData);
        } else {
          console.log('Existing data exists, data is ' + JSON.stringify(res));
          setResponseData(res);
          setXp(res.xp);
          setLvl(res.lvl);
        }
      } catch (err) {
        alert('Application Exited With Error: ' + err);
      }
    };

    const fetchWorldData = async () => {
      try {
        const res = await getWorldData();
        setWorldData(res);
        console.log('World Data: ', res);
      } catch (err) {
        alert('Application Exited With Error: ' + err);
      }
    };
    fetchWorldData();
    fetchData();
  }, [name, id]);

  const open_aircraft_modal = () => {
    setOpenedModal(
      <AircraftModal
        planes={responseData.planes}
        onInfoClick={handleInfoClick}
        onBuyClick={handleBuyClick}
      />
    );
    setIsModalOpen(true);
  };

  const open_airports_modal = () => {
    setOpenedModal(
      <AirportsModal userData={responseData} worldData={worldData.airports} />
    );
    setIsModalOpen(true);
  };

  const close_modal = () => {
    setIsModalOpen(false);
  };

  const handleInfoClick = (plane) => {
    console.log(`Info clicked for plane: ${plane.name}`);
  };

  const handleBuyClick = (plane) => {
    console.log(`Buy clicked for plane: ${plane.name}`);
  };

  return (
    <div className='container'>
      <Budgeting
        close_modal={close_modal}
        open_aircraft_modal={open_aircraft_modal}
      />
      <AirCost setXp={setXp} airportModal={open_airports_modal} />
      <Map lvl={lvl ? lvl : 0} xp={xp ? xp : 0} />
      {isModalOpen && (
        <Modal modalContent={openedModal} close_modal={close_modal} />
      )}
    </div>
  );
};

export default Welcome;
