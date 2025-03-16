import { createContext, useContext, useState } from "react";

const GlobeContext = createContext();

export const GlobeProvider = ({ children }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isSpinning, setIsSpinning] = useState(true);

  return (
    <GlobeContext.Provider value={{ selectedEvent, setSelectedEvent, isSpinning, setIsSpinning }}>
      {children}
    </GlobeContext.Provider>
  );
};

// Custom hook for easier use
export const useGlobe = () => useContext(GlobeContext);
