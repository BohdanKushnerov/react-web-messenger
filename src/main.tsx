import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import MainChatLoader from '@components/MainChatLoader/MainChatLoader.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <MainChatLoader />
  </React.StrictMode>
);
