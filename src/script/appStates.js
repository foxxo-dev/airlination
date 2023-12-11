import { useState } from 'react';
import { AircraftModal } from '../components';

function CreateUseStates() {
  const [responseData, setResponseData] = useState({ planes: [''] });
  const [worldData, setWorldData] = useState({ airports: [''] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openedModal, setOpenedModal] = useState(
    <AircraftModal aircraft_data={responseData.planes} />
  );
  const [xp, setXp] = useState(0);
  const [lvl, setLvl] = useState(0);
  return {
    responseData,
    setResponseData,
    worldData,
    setWorldData,
    isModalOpen,
    setIsModalOpen,
    openedModal,
    setOpenedModal,
    xp,
    setXp,
    lvl,
    setLvl
  };
}

const states = CreateUseStates();

export default states;
