import React, { useState, useEffect } from 'react';
import { Network, URLS } from '../Routes/NetworkService';
import { getAxiosStatus } from '../utils/utils';
import FlightsDashForWarnOk from './FlightsDashForWarnOk';

const Home = () => {
  const [flights, setFlights] = useState([]);
  const [warningFlightsCount, setWarningFlightsCount] = useState(0);
  const [okFlightsCount, setOkFlightsCount] = useState(0);
  const [okFlights, setOkFlights] = useState([]);
  const [warnFlights, setWarnFlights] = useState([]);
  const [isDash1Open, setIsDash1Open] = useState(false);
  const [isDash2Open, setIsDash2Open] = useState(false);

  const getAllFlights = async () => {
    try {
      // Fetch all flights data from the server
      const response = await Network.post(URLS.ALL_FLIGHTS);
      const allFlights = response.data;

      // Filter warning flights based on altitude and ADI values
      const warnFlights = allFlights.filter(flight => (
        parseInt(flight.Altitude) <= 300 || parseInt(flight.Altitude) >= 2700 ||
        parseInt(flight.ADI) <= 10 || parseInt(flight.ADI) >= 90
      ));

      // Filter OK flights by excluding warning flights
      const okFlights = allFlights.filter(flight => !warnFlights.includes(flight));

      // Update state variables with fetched data and counts
      setWarnFlights(warnFlights);
      setFlights(allFlights);
      setOkFlights(okFlights);
      setWarningFlightsCount(warnFlights.length);
      setOkFlightsCount(okFlights.length);
    } catch (error) {
      console.error(getAxiosStatus(error) + ": ", error);
    }
  };

  // Fetch flights data when the component mounts
  useEffect(() => {
    getAllFlights();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="flex justify-center items-center text-black h-full flex-col pb-6">

      <div className="text-center max-w-md mx-auto p-6 pb-3 bg-gradient-to-r from-slate-300 to-slate-500 rounded-md shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">Welcome back to Flights!</h1>

        {/* Dashboard section */}

        {/* Container for total flights status */}
        <div className="text-center my-4 mx-2 py-5 px-3 relative bg-gradient-to-r from-slate-200 to-slate-400 rounded-xl border border-black shadow-lg">
          <div className="text-lg font-semibold text-gray-800 mb-4">
            Total Flights Status:
          </div>
          {/* Circle displaying the percentage of OK flights */}
          <div className="flex items-center justify-center">
            <div
              className="w-52 h-52 rounded-full flex items-center justify-center border-black border shadow-2xl"
              style={{
                background: `conic-gradient( 
                  #ff0000 ${((warningFlightsCount / flights.length) * 100).toFixed(2)}%, 
                  #00ff00 ${((warningFlightsCount / flights.length) * 100).toFixed(2)}%
                )`
              }}
            >
              <div className="text-2xl font-semibold text-gray-800">
                {(100 - (warningFlightsCount / flights.length) * 100).toFixed(2)}%
              </div>
            </div>
          </div>

          {/* Dashboard elements for warning and OK flights */}
          <div className="text-center mt-4 flex justify-around">
            {/* Warning flights dashboard element */}
            <div
              onClick={() => setIsDash1Open(!isDash1Open)}
              className="w-48 h-20 text-lg font-semibold p-3 m-2 bg-slate-100 border border-red-700 rounded-lg shadow-lg shadow-red-700 text-center cursor-pointer flex items-center justify-center"
            >
              Warning Flights: {warningFlightsCount}
            </div>
            {/* OK flights dashboard element */}
            <div
              onClick={() => setIsDash2Open(!isDash2Open)}
              className="w-48 h-20 text-lg font-semibold p-3 m-2 bg-slate-100 border border-green-700 rounded-lg shadow-lg shadow-green-700 text-center cursor-pointer flex items-center justify-center"
            >
              Ok Flights: {okFlightsCount}
            </div>
            {/* Add more dashboard elements if needed */}
          </div>

        </div>

        {/* Button to add more flights */}
        <div className="flex justify-center">
          <a href="/flightDetails" className="m-3 bg-gradient-to-r from-slate-400 via-gray-400 to-slate-400 shadow-lg text-black hover:scale-110 transition duration-300 ease-in-out font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline">Add More Flights</a>
        </div>

      </div>

      {/* Conditional rendering of FlightsDashForWarnOk */}
      {(isDash1Open && warningFlightsCount > 0) && <FlightsDashForWarnOk flights={warnFlights} onClose={() => setIsDash1Open(false)} />}
      {(isDash2Open && okFlightsCount > 0) && <FlightsDashForWarnOk flights={okFlights} onClose={() => setIsDash2Open(false)} />}

    </div>
  );
};

export default Home;
