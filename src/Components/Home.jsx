import React from 'react';

const Home = () => {
  return (
    <div className="flex justify-center items-center text-black h-full flex-col">
      <div className="text-center max-w-md mx-auto p-6 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 rounded-md shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">Welcome to Our Application</h1>
        <p className="text-md text-left text-gray-700 mb-8 px-2">
          Flight search platform with user-friendly interface.<br/>
          Allows quick searches based on Arrival/Departure Information, Altitude, and Historical Information.<br/>
          Real-time feedback, error handling, and seamless user experience.<br/>
          The app presents flight data through visualizations, enabling users to switch between textual and graphical representations.<br />
          It enhances data exploration with interactive features and ensures a seamless user journey.<br />
          The visualization component dynamically updates based on user inputs, providing efficient insights into flight metrics.<br />
        </p>
        <div className="flex justify-center">
          <a href="/flightDetails" className="m-3 bg-gradient-to-r from-slate-400 via-gray-400 to-slate-400 shadow-lg text-black hover:scale-110 transition duration-300 ease-in-out font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline">Get Started</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
