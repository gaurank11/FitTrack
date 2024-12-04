import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Services = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <section className="px-6 py-8 bg-gray-100">
      <div className="text-center">
        <h1 className="uppercase text-gray-800 font-semibold text-5xl">Our Services</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
        <div className="bg-gray-300 p-4 rounded-lg text-center">
          <img src="fitness_tracker.png"className="w-20 h-20 mx-auto md:w-40 md:h-40" alt="Appointment" />
          <h3 className="font-semibold my-2 md:text-xl">Track Fitness </h3>
          <p className="text-sm text-gray-500 md:text-base">
          Track your fitness progress by syncing data from Google Fit for accurate tracking of your height, weight, and step count. Additionally, monitor your health metrics like blood pressure, glucose levels, and heart rate through your smartwatch, ensuring a good well-being.
          </p>
          <button
            className="mt-4 bg-teal-700 text-white px-8 py-2 rounded-full focus:outline-none"
            onClick={() => navigate('/first')} // Use navigate instead of history.push
          >
            Let's Go
          </button>
        </div>

        <div className="bg-gray-300 p-4 rounded-lg text-center">
          <img src="yoga_ai.png" className="w-20 h-20 mx-auto md:w-40 md:h-40" alt="AI Trainer" />
          <h4 className="font-semibold my-2 md:text-xl">AI Yoga Trainer</h4>
          <p className="text-gray-500 text-sm md:text-base">
          The AI Yoga Trainer helps you achieve perfect pose accuracy by providing real-time feedback on your alignment. It also tracks your session time, ensuring you stay focused and maintain proper timing for each posture, enhancing your yoga practice.
          </p>
          <button
  className="mt-4 bg-teal-700 text-white px-8 py-2 rounded-full focus:outline-none"
  onClick={() => navigate('/YogaHome')}
>
  Let's Go
</button>


        </div>

        <div className="bg-gray-300 p-4 rounded-lg text-center">
        <img src="gym_ai.png"className="w-20 h-20 mx-auto md:w-40 md:h-40" alt="Meditation" />
          <h4 className="font-semibold my-2 md:text-xl">AI Gym Trainer</h4>
          <p className="text-gray-500 text-sm md:text-base">
          
The Gym and Sports Trainer tracks your exercise form by monitoring pose accuracy, ensuring each movement is performed correctly. It also counts the number of repetitions, helping you stay on track and maximize the effectiveness of your workout.
          </p>
          <button
  className="mt-4 bg-teal-700 text-white px-8 py-2 rounded-full focus:outline-none"
  onClick={() => window.location.href = 'https://gym-trainer-alpha.vercel.app'}
>
  Let's Go
</button>

        </div>

      
      </div>

    </section>
  );
};

export default Services;
