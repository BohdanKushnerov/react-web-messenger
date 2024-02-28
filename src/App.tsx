import AppRouter from '@router/AppRouter';
import useOnAuthStateChanged from '@hooks/useOnAuthStateChanged';
import useDefaultLanguage from '@hooks/useDefaultLanguage';
import useDefaultTheme from '@hooks/useDefaultTheme';

const App = () => {
  useOnAuthStateChanged();
  useDefaultLanguage();
  useDefaultTheme();

  return <AppRouter />;
};

export default App;
