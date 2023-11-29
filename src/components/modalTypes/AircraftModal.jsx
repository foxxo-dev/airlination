import React from 'react';
import PlaneBuyOption from './modalElements/PlaneBuyOption'; // Adjust the import path as needed

const AircraftModal = ({
  planes,
  onInfoClick,
  onBuyClick,
  set_opened_modal
}) => {
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
        {planes.map((plane, i) => (
          // todo planeoptions instead of planebuyoption here
          <PlaneBuyOption
            key={plane.id}
            plane={plane}
            onInfoClick={onInfoClick}
            onBuyClick={onBuyClick}
            set_opened_modal={set_opened_modal}
            iteration={i}
          />
        ))}
      </div>
      <button onClick={onBuyClick}> + </button>
    </>
  );
};

export default AircraftModal;
