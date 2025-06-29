import { useEffect } from 'react';
import AppRouter from './routing/AppRouter';
import { useStore } from './store';

function App() {
  const initializeAuth = useStore((state: any) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
