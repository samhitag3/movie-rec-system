import React from 'react';
import Header from './components/Header/Header';
import Search from './pages/Search/Search';
import Landing from './pages/Landing/Landing';
import Profile from './pages/Profile/Profile';
import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/search'>
          <Route path=':searchParams?' element={<Search/>}/>
        </Route>
        <Route path='/'>
          <Route element={<Landing/>}/>
        </Route>
        <Route path='/profile'>
          <Route element={<Profile/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
