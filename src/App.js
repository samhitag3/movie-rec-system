import React from 'react';
import Header from './components/Header/Header';
import Search from './pages/Search/Search';
import Discover from './pages/Discover/Discover';
import Landing from './pages/Landing/Landing';
import Profile from './pages/Profile/Profile';
import './App.css';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/search'>
          <Route path=':searchParams?' element={<Search/>}/>
        </Route>
        <Route path='/discover'>
          <Route path=':discoverParams?' element={<Discover/>}/>
        </Route>
        <Route path='/' element={<Landing/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  );
}