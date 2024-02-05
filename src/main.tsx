import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App.tsx';
import MainChatLoader from '@components/MainChatLoader/MainChatLoader.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <>
      <App />
    <ToastContainer />
    <MainChatLoader />
  </>
  // </React.StrictMode>
);
