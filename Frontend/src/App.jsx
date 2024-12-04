import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home2 from "./pages/Home2";
import Services from "./components/Services";
import Footer from "./components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { YogaProvider } from "./YogaContext";
import YogaHome from "./pages/YogaHome";
import Yoga from "./pages/Yoga";
import Tutorials from "./pages/Tutorials";
import YogaCanvas from "./pages/YogaCanvas";
import FirstPage from "./components/FirstPage";
import { ChakraProvider } from "@chakra-ui/react";
import Dashboard from "./components/Dashboard";
import AboutPage from "./components/About";



export default function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <YogaProvider> 
        <ChakraProvider>
        <Routes>  
          <Route path="/" element={<Home2 />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path = "/first" element={<FirstPage />} />
      
          {/* Yoga-related routes */}
          <Route path="/YogaHome" element={<YogaHome />} />
          <Route path="/start" element={<Yoga />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/yoga" element={<YogaCanvas />} />
        </Routes>
        </ChakraProvider>
      </YogaProvider> {/* YogaProvider can wrap the Routes */}

    </div>
  );
}
