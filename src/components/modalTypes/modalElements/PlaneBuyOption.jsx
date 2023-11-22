import React from 'react';

const PlaneBuyOption = ({ plane, onInfoClick, onBuyClick }) => (
  <div className='plane-buy-option'>
    <span>{plane.name}</span>
    <button onClick={() => onInfoClick(plane)}>Info</button>
    <button onClick={() => onBuyClick(plane)}>Set Destination</button>
  </div>
);

export default PlaneBuyOption;