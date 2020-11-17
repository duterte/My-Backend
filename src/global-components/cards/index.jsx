import React from 'react';
import './index.css';
import { HomeForSale } from '../badges/overlay-badges';
import PropertyLocation from '../property-details/property-location';
import PropertyPrice from '../badges/price';
import { InfoSnippets } from '../snippets/snippets';
import { SellerProfile } from '../profiles/profiles';
import frontview from '../../resource-images/frontview.jpg';

export default function Card() {
  function mouseOver(e) {
    const card = e.currentTarget;
    card.firstChild.firstChild.classList.add('active');
  }
  function mouseLeave(e) {
    const card = e.currentTarget;
    card.firstChild.firstChild.classList.remove('active');
  }
  return (
    <div
      className="card-wrapper"
      onMouseEnter={mouseOver}
      onMouseLeave={mouseLeave}
    >
      <figure>
        <img className="lazy" data-src={frontview} alt="frontview" />
      </figure>
      <PropertyLocation />
      <InfoSnippets />
      <HomeForSale />
      <PropertyPrice />
    </div>
  );
}

export function Stab() {
  return (
    <div className="stab">
      <figure>
        <img className="lazy" data-src={frontview} alt="frontview" />
        <HomeForSale />
      </figure>
      <div className="details">
        <PropertyPrice />
        <PropertyLocation />
        <SellerProfile />
        <InfoSnippets />
      </div>
    </div>
  );
}
