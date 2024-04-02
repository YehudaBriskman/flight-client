import React, { useContext, useEffect, useState } from 'react'
import flightContext from './context/flightContext';

const TextView = () => {
    // Initialize state variables and context
    const { flightData } = useContext(flightContext);
    const [sky, setSky] = useState(flightData.ADI);
    const [arrow, setArrow] = useState(flightData.His)
    const [AltitudeArrow, setAltitudeArrow] = useState(flightData.Altitude)
    const [_, setLoadedFromLocalStorage] = useState(false);

    // Update state variables when flightData changes
    useEffect(() => {
        // Check if flightData exists in local storage
        const storedFlightData = JSON.parse(localStorage.getItem('LS-FlightData'));
        if (storedFlightData) {
            // Update flightData context with data from local storage
            setLoadedFromLocalStorage(true);
            console.log(storedFlightData);
            setSky(storedFlightData.ADI);
            setArrow(storedFlightData.His);
            setAltitudeArrow(storedFlightData.Altitude);
        }
        else{
            setSky(flightData.ADI);
            setArrow(flightData.His);
            setAltitudeArrow(flightData.Altitude);
        }
    }, []);

    return (
        <div className='w-full p-4 pb-0 text-center items-center'>
            <p className='p-3 text-xl'>Altitude: {AltitudeArrow >= 0 && AltitudeArrow <= 3000 ? AltitudeArrow : "No Data"}</p>
            <p className='p-3 text-xl'>HIS: {arrow >= 0 && arrow <= 3000 ? arrow : "No Data"}</p>
            <p className='p-3 text-xl'>AID: {sky >= 0 && sky <= 3000 ? sky : "No Data"}</p>
        </div>
    )
}

export default TextView
