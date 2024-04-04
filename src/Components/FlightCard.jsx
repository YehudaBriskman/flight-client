import React, { useState } from 'react';
import { LuCopy } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";

const FlightCard = ({ flight }) => {
    // State to manage the copied status
    const [copied, setCopied] = useState(false);

    // Function to handle copying flight details
    const copyHandler = () => {
        // Copy flight details to clipboard
        copyFlightDetails();
        // Set copied status to true
        setCopied(true);
        // Reset copied status after 2 seconds
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    // Function to copy flight details to clipboard
    const copyFlightDetails = () => {
        // Construct flight details string
        const flightDetails = `ADI: ${flight.ADI}\nAltitude: ${flight.Altitude}\nHis: ${flight.His}\nCreated At: ${flight.createdAt}\nUpdated At: ${flight.updatedAt}`;
        // Copy flight details to clipboard
        navigator.clipboard.writeText(flightDetails);
    };

    return (
        <div className="bg-gray-100 p-4 m-3 rounded-lg max-w-80 shadow-lg">
            <div className='flex justify-between'>
                <h2 className="text-lg font-semibold mb-4">Flight Details</h2>
                {/* Render copy icon if details are not copied */}
                {!copied && <LuCopy className='cursor-pointer' onClick={copyHandler} />}
                {/* Render checkmark icon if details are copied */}
                {copied && <LuCopyCheck className='cursor-pointer' />}
            </div>
            {/* Display flight details */}
            <p className="mb-2"><strong className="font-semibold">ADI:</strong> {flight.ADI}</p>
            <p className="mb-2"><strong className="font-semibold">Altitude:</strong> {flight.Altitude}</p>
            <p className="mb-2"><strong className="font-semibold">His:</strong> {flight.His}</p>
            <p className="mb-2"><strong className="font-semibold">Created At:</strong> {flight.createdAt}</p>
            <p className="mb-2"><strong className="font-semibold">Updated At:</strong> {flight.updatedAt}</p>
        </div>
    );
};

export default FlightCard;
