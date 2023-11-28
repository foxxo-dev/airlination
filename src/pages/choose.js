import '../css/App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getData } from '../script/serverHandleing';

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
    checkIfData();
  }, []);

  const [isWorld, setIsWorld] = useState(true);
  const [isDomestic, setIsDomestic] = useState(false);
  const [name, setName] = useState('THEBIGWHITESHARK');
  const [location, setLocation] = useState('EPWA');

  function checkedWorld() {
    setIsWorld(true);
    setIsDomestic(false);
  }
  function checkedDomestic() {
    setIsWorld(false);
    setIsDomestic(true);
  }
  function finish() {
    if (!name) return alert('Please enter a name');
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
        <input
          type='text'
          placeholder='EPWA'
          value={location}
          required
          onChange={(e) => setLocation(e.target.value)}
        />
      </form>
      <button onClick={finish}>CREATE</button>
    </div>
  );
};

export default Choose;
