import React, { useEffect } from "react";
import { useGlobe } from "../context/GlobeContext";
import "../css/modal.css";  

const EventModal = ({setIsModalOpen} ) => {
  const { selectedEvent, setSelectedEvent, setIsSpinning } = useGlobe();

  

  useEffect(() => {
    if (selectedEvent) {
      setIsModalOpen(true);
    }
    return () => setIsModalOpen(false);
  }, [selectedEvent, setIsModalOpen]);

  if (!selectedEvent) return null;
  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
    setIsSpinning(true)
  };

  return (
    <div className="event-modal">
      <h3>{selectedEvent.description}</h3>
      <p>Date: {selectedEvent.date}</p>
      <button className="close-button" onClick={closeModal}>Close</button>
    </div>
  );
};

export default EventModal;
