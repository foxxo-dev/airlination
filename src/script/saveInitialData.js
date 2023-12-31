import { saveData } from './serverHandleing';
export const saveInitialData = async (body) => {
  try {
    console.log(body);
    const response = await saveData(body);

    // Check if the save was successful
    if (response.status === 200) {
      console.log('Data saved successfully');
    } else {
      console.error('Failed to save data:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred during data save:', error.message);
  }
};
