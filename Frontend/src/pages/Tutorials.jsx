import React from 'react';

import { tutorials, fixCamera } from '../utils/data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Tutorials() {
    return (
        <>

        <Navbar />
        <div className="overflow-hidden w-full h-screen bg-gray-100">
            <h1 className="text-4xl text-teal-700 font-semibold text-center font-poppins lg:text-6xl">
                Basic Tutorials
            </h1>
            <div className="w-full pb-12">
                {tutorials.map((tutorial, index) => (
                    <p key={index} className="text-gray-700 text-base ml-16 mt-1 lg:text-lg lg:ml-24">
                        {tutorial}
                    </p>
                ))}
            </div>
            <h1 className="text-4xl text-teal-700 font-semibold text-center font-poppins lg:text-6xl">
                Camera Not Working?
            </h1>
            <div className="w-full pb-12">
                {fixCamera.map((points, index) => (
                    <p key={index} className="text-gray-700 text-base ml-16 mt-1 lg:text-lg lg:ml-24">
                        {points}
                    </p>
                ))}
            </div>
        </div>
        <Footer />
        </>
    );
}
