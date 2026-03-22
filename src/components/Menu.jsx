import React, { useState } from "react";
import "../css/menu.css";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const allowedYears = [1969, 1989, 2001];

const Menu = ({ selectedMonth, setSelectedMonth, selectedYear, setSelectedYear, isModalOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    if (!isModalOpen) setIsOpen((prev) => !prev);
  };

  const handlePrevMonth = () => {
    setSelectedMonth((prev) => {
      const newMonth = prev === 0 ? 11 : prev - 1;
      if (prev === 0) handlePrevYear();
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setSelectedMonth((prev) => {
      const newMonth = prev === 11 ? 0 : prev + 1;
      if (prev === 11) handleNextYear();
      return newMonth;
    });
  };

  const handlePrevYear = () => {
    const currentIndex = allowedYears.indexOf(selectedYear);
    if (currentIndex > 0) {
      setSelectedYear(allowedYears[currentIndex - 1]);
    }
  };

  const handleNextYear = () => {
    const currentIndex = allowedYears.indexOf(selectedYear);
    if (currentIndex < allowedYears.length - 1) {
      setSelectedYear(allowedYears[currentIndex + 1]);
    }
  };

  const handleYearInput = (e) => {
    const year = Number(e.target.value);
    if (allowedYears.includes(year)) {
      setSelectedYear(year);
    }
  };

  return (
    <div className={`menu-container ${isModalOpen ? "disabled" : ""}`}>
      <button className="menu-button" onClick={toggleMenu}>
        {isOpen ? "Close Menu" : "Open Menu"}
      </button>

      <div className={`menu-options ${isOpen ? "open" : "closed"}`}>
        <div className="menu-item">
          <label>Year</label>

          <div className="year-nav">
            <button className="nav-btn" onClick={handlePrevYear}>❮</button>

            <input
              type="text"
              value={selectedYear}
              onChange={handleYearInput}
            />

            <button className="nav-btn" onClick={handleNextYear}>❯</button>
          </div>

          <div className="month-nav">
            <button className="nav-btn" onClick={handlePrevMonth}>❮</button>
            <div className="month-display">
              {months[selectedMonth]} {selectedYear}
            </div>
            <button className="nav-btn" onClick={handleNextMonth}>❯</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;