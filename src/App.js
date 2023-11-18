import './css/App.css';
import { Route, Routes } from 'react-router-dom';
import Choose from './pages/choose';
import Wait from './pages/wait';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Choose />} />
      <Route path='/please-wait/:name/:type' element={<Wait />} />
    </Routes>
  );
}

export default App;
