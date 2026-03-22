import { createContext, useContext, useState } from "react";
const GlobeContext = createContext();

export const GlobeProvider = ({ children }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isSpinning, setIsSpinning] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(1969);

  return (
    <GlobeContext.Provider value={{
      selectedEvent, setSelectedEvent,
      isSpinning, setIsSpinning,
      selectedMonth, setSelectedMonth,
      selectedYear, setSelectedYear,
    }}>
      {children}
    </GlobeContext.Provider>
  );
};

export const useGlobe = () => useContext(GlobeContext);