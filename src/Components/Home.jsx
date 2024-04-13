import React, { useState, useEffect } from 'react';
import { Network, URLS } from '../Routes/NetworkService';
import { getAxiosStatus } from '../utils/utils';
import FlightsDashForWarnOk from './FlightsDashForWarnOk';

const Home = () => {
  const [flights, setFlights] = useState([]);
  const [warningFlightsCount, setWarningFlightsCount] = useState(0);
  const [okFlightsCount, setOkFlightsCount] = useState(0);
  const [isDash1Open, setIsDash1Open] = useState(false);
  const [isDash2Open, setIsDash2Open] = useState(false);

  const getAllFlights = async () => {
    try {
      const response = await Network.post(URLS.ALL_FLIGHTS);
      const allFlights = response.data;

      // Filter flights to get only warning flights
      const warningFlights = allFlights.filter(flight => {
        return (
          parseInt(flight.Altitude) <= 300 || parseInt(flight.Altitude) >= 2700 ||
          parseInt(flight.ADI) <= 10 || parseInt(flight.ADI) >= 90
        );
      });

      // Set the flights and counts
      setFlights(allFlights);
      setWarningFlightsCount(warningFlights.length);
      setOkFlightsCount(allFlights.length - warningFlights.length);
    } catch (error) {
      console.error(getAxiosStatus(error) + ": ", error);
    }
  };

  useEffect(() => {
    getAllFlights();
  }, []); // Fetch flights on component mount

  return (
    <div className="flex justify-center items-center text-black h-full flex-col">

      {/* Other content */}
      <div className="text-center max-w-md mx-auto p-6 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 rounded-md shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">Welcome back to Flights!</h1>

        {/* Dashboard section */}
        <div className="text-center my-4 flex justify-around">
          <div
            onClick={() => setIsDash1Open(!isDash1Open)}
            className="w-48 h-20 text-lg font-semibold p-3 m-2 bg-slate-100 border border-red-700 rounded-lg shadow-lg shadow-red-700 text-center cursor-pointer">
            Warning Flights: {warningFlightsCount}
          </div>
          <div
            onClick={() => setIsDash2Open(!isDash2Open)}
            className="w-48 h-20 text-lg font-semibold p-3 m-2 bg-slate-100 border border-green-700 rounded-lg shadow-lg shadow-green-700 text-center cursor-pointer">
            Ok Flights: {okFlightsCount}
          </div>
          {/* Add more dashboard elements if needed */}
        </div>
        <div className="flex justify-center">
          <a href="/flightDetails" className="m-3 bg-gradient-to-r from-slate-400 via-gray-400 to-slate-400 shadow-lg text-black hover:scale-110 transition duration-300 ease-in-out font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline">Add More Flights</a>
        </div>
      </div>

      {/* Conditional rendering of FlightsDashForWarnOk */}
      {isDash1Open && <FlightsDashForWarnOk flights={flights.filter(flight => {
        return (
          parseInt(flight.Altitude) <= 300 || parseInt(flight.Altitude) >= 2700 ||
          parseInt(flight.ADI) <= 10 || parseInt(flight.ADI) >= 90
        );
      })} onClose={() => setIsDash1Open(false)} />}
      {isDash2Open && <FlightsDashForWarnOk flights={flights.filter(flight => {
        return (
          parseInt(flight.Altitude) > 300 && parseInt(flight.Altitude) < 2700 &&
          parseInt(flight.ADI) > 10 && parseInt(flight.ADI) < 90
        );
      })} onClose={() => setIsDash2Open(false)} />}

    </div>
  );
};

export default Home;
