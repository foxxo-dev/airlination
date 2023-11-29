import { getData, saveData } from './serverHandleing';

export async function updateLocation(location, id) {
  try {
    // Fetch the current data
    const data = await getData();

    // Get the specific plane data
    const planeData = data.planes[id];

    // Update the location in the planeData
    planeData.location = location;

    // Save the modified data back to the original data
    data.planes[id] = planeData;

    // Save the updated data to the server
    await saveData(data);

    console.log('Updated Location Data!');
  } catch (error) {
    console.error('Error updating location:', error);
    // Handle the error as needed
  }
}
