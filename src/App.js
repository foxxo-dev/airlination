import './css/App.css';
import { Routes, Route } from 'react-router-dom';
import Choose from './pages/choose';
import Wait from './pages/wait';
import Welcome from './pages/Welcome';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Choose />} />
      <Route path='/please-wait/:name/:type/:location' element={<Wait />} />
      <Route path='/main/:name/:id/:location' element={<Welcome />} />
    </Routes>
  );
}

export default App;
