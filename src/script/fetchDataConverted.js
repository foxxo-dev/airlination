import { initData } from '../constants/initData';
import { saveInitialData } from './saveInitialData';
import { getData } from './serverHandleing';
import { setResponseData, setXp, setLvl } from './appStates';

export const fetchDataConverted = async (name, id, location) => {
  try {
    const res = await getData();
    console.log('BEFORE CHECKING RESPONSE: ', res);
    console.log('PLANES LIST: ', res?.planes);

    if (!res || JSON.stringify(res) === '{}') {
      console.log('No data saved, saving initial data');
      console.log('Initial data:', initData(name, id));
      saveInitialData(initData(name, id, location));

      const newData = await getData();
      setResponseData(newData);

      console.log('RES after init: ', newData); // Use newData instead of responseData

      // Do not reload the entire page
      window.location.reload();
    } else {
      console.log('Existing data exists, data is ' + JSON.stringify(res));
      setResponseData(res);
      setXp(res.xp);
      setLvl(res.lvl);
    }
  } catch (err) {
    alert('Application Exited With Error: ' + err);
  }
};
