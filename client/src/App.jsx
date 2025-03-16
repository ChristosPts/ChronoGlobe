import React, { useState } from "react";
import Globe from "./components/Globe";
import EventModal from "./components/EventModal";
import { GlobeProvider, useGlobe } from "./context/GlobeContext"; // Import context
 import './App.css'
import Menu from "./components/Menu";

const App = () => {

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <GlobeProvider>
      <div className="App"> 
        <Globe />
        <EventModal setIsModalOpen={setIsModalOpen}/>
        <Menu 
        selectedMonth={selectedMonth} 
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        isModalOpen={isModalOpen} 
      />
      </div>
    </GlobeProvider>
  );
};

export default App;
