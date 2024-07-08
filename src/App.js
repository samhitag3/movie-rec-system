import './App.css';

import { Routes, Route } from 'react-router-dom';
import SearchPage from './pages/search';

function App() {
  return (
    <>
      <Routes>
        <Route path='/search'>
          <Route path=':searchParams?' element={<SearchPage/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
