import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { AppRoutes } from './router/AppRoutes';
import { useSession } from './hooks/useSession';
import { IndexProvider } from './context/IndexProvider';
import { Banner } from './components/common/Banner';

function App() {
  
  const [started, setStarted] = useState(false)

  useSession(setStarted)

  return (
    started ? 
    <IndexProvider>
      <AppRoutes />
    </IndexProvider>
    :
    <Banner />
  );
}

export default App;