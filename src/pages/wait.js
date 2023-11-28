import { createId } from '../script/createId';
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Wait() {
  const navigate = useNavigate();
  const { name, type, location } = useParams();
  const rando = Math.round(Math.random() * 5 + 2);
  const [timer, setTimer] = useState(rando);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer > 0) setTimer(timer - 1);
      else {
        clearInterval(intervalId);
        const id = createId(type);
        navigate(`/main/${name}/${id}/${location}`);
      }
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [timer]); // Add 'timer' as a dependency to useEffect

  console.log('Name: ', name, ' Type: ', type, ' Location: ', location);

  return (
    <div>
      <h1 style={{ color: 'white', fontSize: 60 }}>
        PLEASE WAIT, <br /> GENERATING YOUR {type} AIRLINE "{name}", <br /> TIME
        REMAINING |<span style={{ minWidth: 500 }}>{timer}</span>| SECONDS
      </h1>
      <br />
      <br />
      <progress
        value={-timer + 7}
        max={7}
        style={{
          width: 500,
          transition: 'width 1s ease-in-out'
        }}
      ></progress>
      <br />
      <br />
      <a href='/' style={{ color: 'white', fontSize: 40 }}>
        GO BACK
      </a>
    </div>
  );
}

export default Wait;
