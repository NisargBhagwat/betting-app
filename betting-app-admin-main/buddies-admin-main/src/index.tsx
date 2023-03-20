import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/bootstrap.min.css";
import "./styles/style.css";
import "./styles/responsive.css";
import "./styles/flaticon.css";
import "./styles/plugins.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);
