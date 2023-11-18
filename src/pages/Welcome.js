import React, { useEffect, useState } from 'react';
import '../css/main.css';
import { useParams } from 'react-router-dom';
import { getData } from '../script/saveGame';
import { saveInitialData } from '../script/saveInitialData';

const Welcome = () => {
  const { name, id } = useParams();
  const type = id[0] === 'w' ? 'WORLD' : 'DOMESTIC';

  const [responseData, setResponseData] = useState({
    money: 0,
    lvl: 0,
    planes: []
  });

  useEffect(() => {
    getData()
      .then((res) => {
        setResponseData(res);
        if (!responseData || responseData === undefined) {
          saveInitialData({
            name: name,
            id: id,
            lvl: 1,
            money: 100000,
            planes: [
              {
                name: 'Embrayer 190',
                id: 'ERJ190',
                amount: 1,
                price: 100000,
                speed: 0,
                range: 15200,
                capacity: 182,
                fuel: 0,
                maintenance: 1
              }
            ]
          });
        }
      })
      .catch((err) => {
        alert('Application Exited With Error: ' + err);
      });
  }, []); // Dependencies for useEffect

  return (
    <div>
      {name} <br /> account: {responseData.money}$ lvl {responseData.lvl} <br />
      <div className='plane_container'>
        {responseData.planes.map((plane) => (
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
    </div>
  );
};

export default Welcome;
