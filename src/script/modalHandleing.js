import { AircraftModal } from '../components/aircraftModal';
import { setIsModalOpen, setOpenedModal } from './appStates.js';
export class Modal_hdl {
  open_aircraft_modal(
    responseData,
    handleInfoClick,
    handleBuyClick
  ) {
    console.log(responseData, ' RESPONSE DATA');
    console.log(responseData.planes, ' PLANES IN RESPONSE DATA');
    setOpenedModal(
      <AircraftModal
        planes={responseData.planes}
        onInfoClick={handleInfoClick}
        onBuyClick={handleBuyClick}
        set_opened_modal={setOpenedModal}
      />
    );
    setIsModalOpen(true);
  }

  open_airports_modal(worldData, responseData, AirportsModal) {
    if (worldData && worldData.airports) {
      setOpenedModal(
        <AirportsModal userData={responseData} worldData={worldData.airports} />
      );
      setIsModalOpen(true);
    } else {
      console.log('World Data:', worldData);
      console.log("World Data's Airports:", worldData?.airports);
      console.error('worldData or worldData.airports is undefined');
    }
  }

  close_modal() {
    setIsModalOpen(false);
  }
}
