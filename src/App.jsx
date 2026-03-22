import React from "react";
import Globe from "./components/Globe";
import EventModal from "./components/EventModal";
import { GlobeProvider } from "./context/GlobeContext";
import { useGlobe } from "./context/GlobeContext";
import './App.css';
import Menu from "./components/Menu";

const AppInner = () => {
  const { selectedMonth, setSelectedMonth, selectedYear, setSelectedYear } = useGlobe();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="App">
      <Globe />
      <EventModal setIsModalOpen={setIsModalOpen} />
      <Menu
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        isModalOpen={isModalOpen}
      />
    </div>
  );
};

const App = () => (
  <GlobeProvider>
    <AppInner />
  </GlobeProvider>
);

export default App;