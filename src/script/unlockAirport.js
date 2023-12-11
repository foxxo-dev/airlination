import { addData, getData, getWorldData, updateData } from './serverHandleing';
import { setXp } from './appStates';

async function unlockAirport(airport, reset) {
  const data = await getData();
  console.log(data);
  let unlocked_airports = await data.unlockedLocation;
  if (!unlocked_airports) unlocked_airports = [];
  const _worldData = await getWorldData();
  const worldData = JSON.parse(_worldData);
  const all_airports = worldData.airports;

  console.log('All airports: ', all_airports);
  console.log('Unlocked airports: ', unlocked_airports);

  all_airports.forEach(async (current_airport) => {
    console.log('Current airport: ', current_airport);
    console.log(airport);

    if (current_airport === airport) {
      if (data.xp - 25 < 0) {
        console.log('Not enough xp');
        alert('Not enough xp');
        return;
      } else {
        console.log("Current airport is airport, let's unlock it!");
        console.log(unlocked_airports);
        const data_xp = data.xp - 25;
        await updateData('xp', data_xp);
        setXp(data.xp - 25);
        await addData('unlockedLocation', current_airport);
        reset('');
        console.log('Updated Airport Data!');
        window.location.reload();
      }
    }
    return;
  });
}

export default unlockAirport;
