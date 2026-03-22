import React, { useState } from 'react'

const controls = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    action: "Left Mouse",
    description: "Drag to rotate globe",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="2" width="8" height="14" rx="4" />
        <line x1="12" y1="6" x2="12" y2="9" strokeWidth="2" strokeLinecap="round" />
        <path d="M5 17.5A7 7 0 0 0 12 22a7 7 0 0 0 7-4.5" />
      </svg>
    ),
    action: "Scroll Wheel",
    description: "Zoom in & out",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="10" r="2.5" />
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      </svg>
    ),
    action: "Click Marker",
    description: "View event details",
  },
]

function InfoBox() {

  return (
    <div className="info-box">
      <p className="info-box-heading">HOW TO EXPLORE</p>
      <div className="info-box-controls">
        {controls.map((c) => (
          <div className="info-box-row" key={c.action}>
            <span className="info-box-icon">{c.icon}</span>
            <div className="info-box-text">
              <span className="info-box-action">{c.action}</span>
              <span className="info-box-desc">{c.description}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="info-box-footer">
        Navigate to a month &amp; year to reveal historical events
      </p>
    </div>
  )
}

export default InfoBox