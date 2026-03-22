import React, { useEffect } from "react";
import { useGlobe } from "../context/GlobeContext";
import "../css/modal.css";  

const EventModal = ({ setIsModalOpen }) => {
  const { selectedEvent, setSelectedEvent, setIsSpinning } = useGlobe();

  if (!selectedEvent) return null;

  const handleClose = () => {
    setSelectedEvent(null);
    setIsSpinning(true);
    setIsModalOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content event-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Event image at the top */}
        {selectedEvent.image && (
          <div className="modal-image-container">
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="modal-image"
            />
          </div>
        )}

        <div className="event-modal-body">
          <h2 className="event-modal-title">{selectedEvent.title}</h2>
          <p className="event-modal-date">
            {new Date(selectedEvent.date).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric"
            })}
          </p>
          <p className="event-modal-description">{selectedEvent.description}</p>
          <div><a className="event-modal-link" href={selectedEvent.link}>Learn More ❯</a></div>
        </div>

        <button className="modal-close" onClick={handleClose}>✕</button>
      </div>
    </div>
  );
};

export default EventModal;
