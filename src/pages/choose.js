import '../css/App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getData } from '../script/saveGame';

const Choose = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkIfData() {
      const preSavedData = await getData();

      console.log(JSON.stringify(preSavedData));

      if (JSON.stringify(preSavedData) !== undefined) {
        navigate(`/main/${preSavedData.name}/${preSavedData.id}`);
      }
    }
    checkIfData();
  }, []);

  const [isWorld, setIsWorld] = useState(true);
  const [isDomestic, setIsDomestic] = useState(false);
  const [name, setName] = useState('THEBIGWHITESHARK');

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
    navigate(`/please-wait/${name}/${isWorld ? 'world' : 'domestic'}`);
  }

  return (
    <div className='App'>
      <h1>AIRLINNERTION</h1>
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
      </form>
      <button onClick={finish}>CREATE</button>
    </div>
  );
};

export default Choose;
