import AppRouter from '@router/AppRouter';

import useDefaultLanguage from '@hooks/useDefaultLanguage';
import useDefaultTheme from '@hooks/useDefaultTheme';
import useOnAuthStateChanged from '@hooks/useOnAuthStateChanged';
import useServiceWorker from '@hooks/useServiceWorker';

const App = () => {
  useOnAuthStateChanged();
  useDefaultLanguage();
  useDefaultTheme();
  useServiceWorker();

  return <AppRouter />;
};

export default App;
