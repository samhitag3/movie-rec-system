import React, { useEffect } from 'react';
import './Profile.css';
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Profile() {

  useEffect(() => {
    fetch("/test").then(
      res => res.json()
    ).then(
      data => console.log(data)
    );
  }, [])

  return (
    <HelmetProvider>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="username">ur fake profile</div>
    </HelmetProvider>
  );
}
