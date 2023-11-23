import { getData, getWorldData, updateData } from './serverHandleing';

async function unlockAirport(airport, sxp, reset) {
  const data = await getData();
  const unlocked_airports = data.unlockedLocations;
  const all_airports = await getWorldData();
  console.log(unlocked_airports, all_airports);
  all_airports.airports.forEach(async (current_airport) => {
    if (current_airport === airport) {
      if (data.xp - 5 < 0) {
        console.log('Not enough xp');
        alert('Not enough xp');
        return;
      } else {
        await updateData('xp', data.xp - 5);
        sxp(data.xp - 5);
        await updateData('unlockedLocations', [...unlocked_airports, airport]);
        reset('');
        console.log('Updated Airport Data!');
      }
    }
    return;
  });
}

export default unlockAirport;
