import Step1 from '@components/Registration/Step1';

function App() {
  const viteExample = import.meta.env.VITE_EXAMPLE;

  // Використовуємо значення в вашому коді
  console.log(viteExample);
  console.log(3)

    // Получаем доступ к переменной окружения VITE_EXAMPLE
    const viteExample2 = process.env.VITE_EXAMPLE;

    // Выводим значение в консоль для проверки
    console.log(viteExample2);

  return (
    <div className="h-screen bg-main-bcg bg-no-repeat bg-cover bg-center">
      <Step1 />
    </div>
  );
}

export default App;
