import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// sets the App.js file as the root of the html document 

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
  <App />
);
