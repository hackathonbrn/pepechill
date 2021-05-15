import React from 'react';
import { Redirect } from 'react-router-dom';

const MainPage = () => {
  if (!false) {
    return <Redirect to="/login" />;
  }
  return <h1>ПОЗДРАВЛЯЮ СО ВХОДОМ!</h1>;
};

export default MainPage;
