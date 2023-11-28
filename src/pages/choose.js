import '../css/App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getData, getWorldData } from '../script/serverHandleing';

const Choose = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkIfData() {
      const preSavedData = await getData();

      console.log(JSON.stringify(preSavedData));

      if (
        preSavedData !== undefined &&
        preSavedData !== null &&
        JSON.stringify(preSavedData) !== '{}' &&
        Object.keys(preSavedData).length !== 0
      ) {
        console.log('JSON IS NOT EMPTY');
        navigate(
          `/main/${preSavedData.name}/${preSavedData.id}/NOTINITIALIZING`
        );
      }
    }

    async function getWorldData_in() {
      const world = JSON.parse(await getWorldData());
      setWorldAirports(world.airports);
      console.log('World Data: ', world.airports);
    }

    checkIfData();
    getWorldData_in();
  }, [navigate]);

  const [isWorld, setIsWorld] = useState(true);
  const [isDomestic, setIsDomestic] = useState(false);
  const [worldAirports, setWorldAirports] = useState(['--PLEASE WAIT--']);
  const [name, setName] = useState('THEBIGWHITESHARK');
  const [location, setLocation] = useState('');

  function checkedWorld() {
    setIsWorld(true);
    setIsDomestic(false);
  }

  function checkedDomestic() {
    setIsWorld(false);
    setIsDomestic(true);
  }

  function finish() {
    if (!name || !location)
      return alert('Please enter a name and choose a location');
    navigate(
      `/please-wait/${name}/${isWorld ? 'world' : 'domestic'}/${location}`
    );
  }

  return (
    <div className='App'>
      <h1>AIRLINATION</h1>
      <form>
        <div id='checkbox_container'>
          <div className='checkbox_label_container'>
            <label>WORLD</label>
            <input
              type='radio'
              name='checkbox_container'
              defaultChecked
              onClick={checkedWorld}
            />
          </div>
          <div className='checkbox_label_container'>
            <label>DOMESTIC</label>
            <input
              type='radio'
              name='checkbox_container'
              onClick={checkedDomestic}
            />
          </div>
        </div>
        <label>NAME</label>
        <input
          type='text'
          placeholder='thebigwhiteshark'
          required
          onChange={(e) => setName(e.target.value)}
        />
        <label>LOCATION</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value='' disabled>
            --PLEASE CHOOSE--
          </option>
          {worldAirports.map((airport, index) => (
            <option key={index} value={airport}>
              {airport}
            </option>
          ))}
        </select>
      </form>
      <button onClick={finish}>CREATE</button>
    </div>
  );
};

export default Choose;
