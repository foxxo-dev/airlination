import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function Wait() {
  const { name, type } = useParams();
  const [timer, setTimer] = useState(0);
  setInterval(() => setTimer(timer + 1), 1000);

  return (
    <div>
      <h1 style={{ color: 'white', fontSize: 60 }}>
        PLEASE WAIT, <br /> GENERATING YOUR {type} AIRLINE "{name}", <br /> TIME
        PASSED |<span style={{ minWidth: 500 }}>{timer}</span>| SECONDS
      </h1>
      <a href='/' style={{ color: 'white', fontSize: 40 }}>
        GO BACK
      </a>
    </div>
  );
}

export default Wait;
