import React from 'react';
import { PisoSign } from '../font-icons';
import './css/price.css';

export default function PropertyPrice() {
  return (
    <div className="property-price">
      <span>
        <PisoSign />
        1,500,000
      </span>
    </div>
  );
}
