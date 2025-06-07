import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/appRoutes';

function App() {
  return (
    <BrowserRouter>
      <div className="p-4">
        <AppRoutes/>
      </div>
    </BrowserRouter>
  );
}

export default App