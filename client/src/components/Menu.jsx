import React, { useState } from "react";
import "../css/menu.css";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Menu = ({ selectedMonth, setSelectedMonth, selectedYear, setSelectedYear, isModalOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    if (!isModalOpen) setIsOpen((prev) => !prev);
  };

  const handlePrevMonth = () => {
    setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (selectedMonth === 0) setSelectedYear((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (selectedMonth === 11) setSelectedYear((prev) => prev + 1);
  };

  return (
    <div className={`menu-container ${isModalOpen ? "disabled" : ""}`}>
      <button className="menu-button" onClick={toggleMenu}>
        {isOpen ? "Close Menu" : "Open Menu"}
      </button>

      <div className={`menu-options ${isOpen ? "open" : "closed"}`}>
        <div className="menu-item">
          <label>Month</label>
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
            {months.map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>
        </div>

        <div className="menu-item">
          <label>Year</label>
          <input 
            type="number" 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(Number(e.target.value))} 
          />
        </div>

        <div className="button-group">
          <button onClick={handlePrevMonth}>❮</button>
          <button onClick={handleNextMonth}>❯</button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
