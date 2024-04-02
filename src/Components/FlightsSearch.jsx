import React, { useState } from 'react';
import Loading from '../shared/Loading';
import { useForm } from 'react-hook-form';
import { getAxiosStatus } from '../utils/utils';
import { URLS, Network } from '../Routes/NetworkService';
import FlightCard from './FlightCard';

const FlightSearch = () => {
    const [response, setResponse] = useState(null); // State for storing flight search results
    const [searchType, setSearchType] = useState("ADI"); // State for storing the type of search selected by the user
    const maxValue = {
        ADI: 100,
        His: 360,
        Altitude: 3000
    }

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({ // Setting up form handling using react-hook-form
        mode: "onSubmit",
        reValidateMode: "onChange"
    });

    const search = async (data) => { // Function to handle flight search based on user input

        const searchObject = {
            ADI: { url: URLS.FIND_BY_ADI, body: { ADI: data.ADI } },
            His: { url: URLS.FIND_BY_HIS, body: { His: data.His } },
            Altitude: { url: URLS.FIND_BY_ALTITUDE, body: { Altitude: data.Altitude } }
        }
        const currentData = searchObject[searchType || 'ADI'];

        try {
            const response = await Network.post(currentData.url, currentData.body)
            setResponse((response).data)
        } catch (error) {
            console.error(getAxiosStatus(error) + ": ", error); // Handling Axios errors and logging them
            setError("error", { message: "network error" }); // Setting an error message in case of network issues
        }
    };

    // JSX code for rendering the flight search form and displaying search results
    return (
        <div className='pb-5'>
            <Loading on={isSubmitting} /> {/* Displaying a loading spinner while submitting the form */}
            <div className="max-w-sm mx-auto mt-8 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 rounded-lg">
                <form onSubmit={handleSubmit(search)} className=" shadow-md rounded px-8 pt-6 pb-3 mb-4 items-center">
                    <div className='w-full text-center'><h1 className='text-black font-medium text-3xl pb-2'>Search Flight</h1></div>
                    <div className="mb-2 pb-2 border-b-2 border-black shadow-md p-1 pt-3 rounded">
                        <div className='flex justify-between items-center p-2'>
                            <label className="ps-1 block text-gray-700 text-sm font-bold ">
                                Search By -
                            </label>
                            <select
                                style={{ border: "0px" }}
                                onChange={(e) => setSearchType(e.target.value)} // Setting the search type based on user selection
                                className="bg-transparent border border-black px-3 text-gray-700 focus:border-none focus:outline-none cursor-pointer font-bold"
                            >
                                <option value="ADI">ADI</option>
                                <option value="Altitude">Altitude</option>
                                <option value="His">His</option>
                            </select>
                        </div>
                        {/* Conditional rendering based on the selected search type */}
                        <input
                            type="number"
                            className="bg-transparent appearance-none border-none w-full px-3 pt-2 pb-1 text-gray-700 focus:border-none focus:outline-none hover:border-none"
                            {...register(searchType, {
                                valueAsNumber: true,
                                type: "number",
                                required: true,
                                validate: (value) => {
                                    if (value < 0) return "ADI must be Minimum 0";
                                    if (value > maxValue[searchType]) return "ADI can't reach 100";
                                }
                            })}
                        />
                    </div>
                    <div className='min-h-8 mb-1 text-center'>
                        {errors.ADI && <span className='text-xs text-red-700'>{errors.ADI.message}</span>}
                        {errors.His && <span className='text-xs text-red-700'>{errors.His.message}</span>}
                        {errors.Altitude && <span className='text-xs text-red-700'>{errors.Altitude.message}</span>}
                    </div>
                    <div className="mb-2 pb-2 text-center w-full">
                        <button type="submit" className="bg-gradient-to-r from-slate-400 via-gray-400 to-slate-400 shadow-lg text-black hover:scale-110 transition duration-300 ease-in-out font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline">
                            Done
                        </button>
                    </div>
                    {errors.error && <span className='text-red-600'>{errors.error.message}</span>} {/* Displaying network error message */}
                </form>
            </div>
            {/* Displaying flight search results */}
            {response &&
                <div className='flex flex-row flex-wrap justify-around md:max-w-[90%] p-3 mx-auto'>
                    {response.map((flight, index) => (
                        <div key={index}>
                            <FlightCard flight={flight} />
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

export default FlightSearch;
