import React from 'react';
import PlaneBuyOption from './modalElements/PlaneBuyOption'; // Adjust the import path as needed

const AircraftModal = ({ planes, onInfoClick, onBuyClick }) => {
  console.log('Planes: ', planes);
  return (
    <>
      <div
        style={{
          width: 600,
          gap: 10,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {planes.map((plane) => (
          // todo planeoptions instead of planebuyoption here
          <PlaneBuyOption
            key={plane.id}
            plane={plane}
            onInfoClick={onInfoClick}
            onBuyClick={onBuyClick}
          />
        ))}
      </div>
      <button onClick={onBuyClick}> + </button>
    </>
  );
};

export default AircraftModal;
