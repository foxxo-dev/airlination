import React from 'react';

const Budgeting = ({ open_aircraft_modal, open_country_modal}) => {
  return (
    <div className='buttons_container vertical_flex budgeting_container'>
      <span className='window_name'>//budgeting</span>
      <div>
        <span className='label'> aircraft / dispatch </span>
        <button onClick={open_aircraft_modal}>open panel</button>
      </div>
    </div>
  );
};

export default Budgeting;
