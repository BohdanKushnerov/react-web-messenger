import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App.tsx';
import './index.css';

import MainChatLoader from '@components/MainChatLoader/MainChatLoader.jsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <ToastContainer />
    <MainChatLoader />
  </>
);
