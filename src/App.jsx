import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './Routes/AppRoutes';
import flightContext from './Components/context/flightContext';

function App() {
  // State to manage fly data
  const [flightData, setFlightData] = useState({});

  // Effect to log changes in flightData
  useEffect(() => {
    console.log("flightData: ", flightData);
  }, [flightData]);

  return (
    // Providing fly data to child components using flightContext
    <flightContext.Provider value={{//check if the local storage is available in the Incognito (anonimos)
      flightData,
      setFlightData
    }}>
      {/* Root BrowserRouter component for routing */}
      <BrowserRouter>
        {/* Rendering AppRoutes for defining routes */}
        <AppRoutes />
      </BrowserRouter>
    </flightContext.Provider>
  );
}

export default App;
