import AppRouter from '@router/AppRouter';

import useDefaultLanguage from '@hooks/useDefaultLanguage';
import useDefaultTheme from '@hooks/useDefaultTheme';
import useOnAuthStateChanged from '@hooks/useOnAuthStateChanged';

const App = () => {
  useOnAuthStateChanged();
  useDefaultLanguage();
  useDefaultTheme();

  return <AppRouter />;
};

export default App;
