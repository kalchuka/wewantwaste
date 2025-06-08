/**
 *  @file App.tsx
 *  @description Main application component that sets up the routing for the application.
 *   This file uses React Router to define the main routes of the application.
 * @author Chuka <kalchuka@gmail.com>
 * 
 */
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/appRoutes';

function App() {
  return (
    <BrowserRouter>
      <div className="">
        <AppRoutes/>
      </div>
    </BrowserRouter>
  );
}

export default App