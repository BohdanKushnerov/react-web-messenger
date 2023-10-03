import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './index.css';
import Loader from '@components/Loader/Loader.jsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <div className="bg-main-bcg2 bg-no-repeat bg-cover bg-center"> */}
      <App />
      <Loader />
    {/* </div> */}
  </React.StrictMode>
);
