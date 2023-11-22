import React from 'react';
import PlaneBuyOption from './modalElements/PlaneBuyOption'; // Adjust the import path as needed

const AircraftModal = ({ planes, onInfoClick, onBuyClick }) => {
  return (
    <>
      {planes.map((plane) => (
        <PlaneBuyOption
          key={plane.id}
          plane={plane}
          onInfoClick={onInfoClick}
          onBuyClick={onBuyClick}
        />
      ))}
    </>
  );
};

export default AircraftModal;
