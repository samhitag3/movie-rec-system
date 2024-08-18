import React from 'react';
import './Profile.css';
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Profile() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="username">ur fake profile</div>
    </HelmetProvider>
  );
}
