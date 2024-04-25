import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='min-h-[100vh] bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 rounded-lg text-black'>
            <header className='pb-6'>
                <nav className='bg-slate-900 p-4 d-flex justify-content-end'>
                    <div className='p-4 d-flex ms-auto'>
                        <Link className='text-white mx-3' to="/">Home</Link>
                        <Link className='text-white mx-3' to="/flightDetails">Add Flight</Link>
                        <Link className='text-white mx-3' to="/searchFlights">Search Flights</Link>
                        <Link className='text-white mx-3' to="/login">Log-in</Link>
                        <Link className='text-white mx-3' to="/signup">Sign up</Link>
                    </div>
                </nav>
            </header>
            <div className='px-4'>
                <Outlet />
            </div>
        </div>
    )
}

export default Navbar