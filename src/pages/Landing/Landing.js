import React from 'react';
import './Landing.css';
import { Helmet, HelmetProvider } from "react-helmet-async";

function Landing() {
  return (
    <HelmetProvider>
        <Helmet>Cinemacado</Helmet>
        <p>hello</p>
    </HelmetProvider>
  );
}

export default Landing;
