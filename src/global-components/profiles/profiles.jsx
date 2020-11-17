import React from 'react';
import './profile.css';
import samsmith from '../../resource-images/sam-smith.jpg';

export function SellerProfile() {
  return (
    <div className="seller-profile">
      <figure>
        <img className="lazy" data-src={samsmith} alt={samsmith} />
      </figure>
      <div className="bio">
        <span className="name">Sam Smith, </span>
        <span className="profession">License Broker</span>
      </div>
    </div>
  );
}
