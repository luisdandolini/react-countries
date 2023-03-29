import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './components/Header.jsx';
import Countries from './components/Countries';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header /> 
    <Countries />
  </React.StrictMode>
);
