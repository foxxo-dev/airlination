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

const Welcome = () => {
  const { name, id, location } = useParams();
  const type = id[0] === 'w' ? 'WORLD' : 'DOMESTIC';

  const [responseData, setResponseData] = useState();
  const [unlockedAirports, setUnlockedAirports] = useState(['none']);

  async function getUnlockedAirports() {
    const worldData = await getWorldData();
    console.log('WORLD DATA: ', worldData);
    worldData.airports.forEach((airport, i) => {
      if (responseData.unlockedLocations[i] === airport) {
        setUnlockedAirports((prev) => [...prev, airport]);
      }
    });
  }

  useEffect(() => {
    getUnlockedAirports();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData();
        setResponseData(res);
        console.log(
          '%cBEFORE CHECKING RESPONSE ',
          'color: red; font-size: 15px;'
        );
        console.log(res);
        console.log('%cPLANES LIST: ', 'color: red; font-size: 15px;');
        console.log(res?.planes);

        if (
          !res ||
          res === undefined ||
          res === null ||
          // Object.keys(res).length !== 0 ||
          JSON.stringify(res) === '{}'
        ) {
          console.log('No data saved, saving initial data');
          console.log('Initial data:', initData(name, id));
          saveInitialData(initData(name, id, location));

          const newData = await getData();
          setResponseData(newData);

          console.log('%cRES after init', 'color: red; font-size: 15px;');
          console.log(responseData);
          window.location.reload();
        } else {
          console.log('Existing data exists, data is ' + JSON.stringify(res));
        }
      } catch (err) {
        alert('Application Exited With Error: ' + err);
      }
    };

    fetchData();
  }, [name, id]);

  return (
    <div>
      {name} <br /> account: {responseData?.money}$ lvl {responseData?.lvl}{' '}
      <br />
      {responseData && responseData.planes ? (
        <div className='plane_container'>
          {responseData.planes.map((plane, i) => (
            <div className='plane_info_container' key={plane.id}>
              <span className='plane_info_name'>{plane.name}</span> <br />
              <span className='plane_info_id'>{plane.id}</span> <br />
              <span className='plane_info_amount'>{plane.amount}</span> <br />
              <span className='plane_info_price'>{plane.price}$</span> <br />
              <span className='plane_info_speed'>{plane.speed}KTS</span> <br />
              <span className='plane_info_range'>{plane.range}NM</span> <br />
              <span className='plane_info_capacity'>
                {plane.capacity}pax
              </span>{' '}
              <br />
              <span className='plane_info_fuel'>
                {plane.fuel ? 0 : 'no fuel'}T
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <p>Airports to unlock: {unlockedAirports}</p>
    </div>
  );
};

export default Welcome;
