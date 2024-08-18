import React from 'react';
import './Landing.css';
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Landing() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Cinemacado</title>
      </Helmet>
      <div className="welcome">u landed this temp</div>
    </HelmetProvider>
  );
}
