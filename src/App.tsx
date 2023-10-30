import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Pokemon from './pages/Pokemon';
import Flow from './pages/Canvas/Flow';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={ <Home /> } />
        <Route path='/pokemon/:id' element={ <Pokemon /> } />
        {/* <Route path='/canvas' element={ <Flow /> } /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
