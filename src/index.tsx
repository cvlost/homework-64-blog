import React from 'react';
import ReactDOM from 'react-dom/client';
import Blog from './Blog';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Blog />
  </React.StrictMode>
);
