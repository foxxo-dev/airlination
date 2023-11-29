import React from 'react';
import PlaneDispatch from './modalElements/PlaneDispatch'; // Adjust the import path as needed

const AircraftModal = ({
  planes,
  onInfoClick,
  onBuyClick,
  set_opened_modal
}) => {
  console.log('Planes: ', planes);

  function checkIfPLaneUsed(plane) {
    if (plane.nextFlightDestination === '') return false;
    return true;
  }

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
          <PlaneDispatch
            key={plane.id}
            plane={plane}
            onInfoClick={onInfoClick}
            onBuyClick={onBuyClick}
            set_opened_modal={set_opened_modal}
            iteration={i}
            isPlaneUsed={() => checkIfPLaneUsed(plane)}
          />
        ))}
      </div>
      <button onClick={onBuyClick}> + </button>
    </>
  );
};

export default AircraftModal;
