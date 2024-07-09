import React from 'react';
import Header from '../../components/Header/Header';
import Search from '../Search/Search';
import './Landing.css';
import { Routes, Route } from 'react-router-dom';

function Landing() {
  return (
    <div>
      <Header />
      <p>hello</p>
      <Routes>
        <Route path='/search'>
          <Route path=':searchParams?' element={<Search/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default Landing;
