import { getData, updateData } from './serverHandleing';

async function unlockAirport(airport) {
  const data = await getData();
  console.log(data);
  const airports = data.unlockedLocations;
  airports.forEach(async (current_airport) => {
    if (current_airport === airport) {
      return;
    }
    if (data.xp - 5 < 0) {
      return;
    } else {
      await updateData('xp', data.xp - 5);
      await updateData('unlockedLocations', [...airports, airport]);
    }
  });
}

export default unlockAirport;
