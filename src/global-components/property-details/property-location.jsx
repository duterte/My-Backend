import React from 'react';
import { GoLocation } from 'react-icons/go';
import './css/property-location.css';

export default function PropertyLocation() {
  return (
    <div className="property-location">
      <GoLocation className="location" />
      <span>123 Groove St Los Santos San Andreas</span>
    </div>
  );
}
