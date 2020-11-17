import React from 'react';
import './main.css';
import Card from '../../global-components/cards';
// import Map from '../../global-components/map/map';
import { HomeForSale } from '../../global-components/badges/overlay-badges';
import { InfoSnippets } from '../../global-components/snippets/snippets';
import { SellerProfile } from '../../global-components/profiles/profiles';
import PropertyLocation from '../../global-components/property-details/property-location';
import PropertyDesc from '../../global-components/property-details/property-description';
import PropertyPrice from '../../global-components/badges/price';
import withpool from '../../resource-images/with-pool.webp';
import familyhome from '../../resource-images/family-home.webp';

function First() {
  return (
    <div className="first">
      <div className="wrapper">
        <span>Lorem1</span>
        <span>Lorem2</span>
        <span>Lorem3</span>
        <span>Lorem4</span>
      </div>
    </div>
  );
}

function Second() {
  return (
    <div className="second">
      <h3>The Best Deals</h3>
      <h1>Featured Properties</h1>
      <div className="featured">
        <div className="cards">
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}

function MapSection() {
  return (
    <div className="map-section">
      <div className="map-underlay"></div>
      {/* <Map googleapiskey="AIzaSyCtvzYw4vsyoWfF3YBTRABvPC6TYXdK9f8" /> */}
    </div>
  );
}

function HotDeals() {
  function mouseOver(e) {
    const element = e.currentTarget;
    element.firstChild.firstChild.classList.add('active');
  }
  function mouseLeave(e) {
    const element = e.currentTarget;
    element.firstChild.firstChild.classList.remove('active');
  }

  return (
    <div className="hotdeals">
      <h1>this month's hot deals</h1>
      <div
        className="content"
        onMouseOver={mouseOver}
        onMouseLeave={mouseLeave}
      >
        <figure>
          <img
            className="lazy"
            data-src={withpool}
            alt="House with swimming pool"
          />
          <HomeForSale />
        </figure>
        <div className="details">
          <PropertyPrice />
          <h3>Villa For Sale</h3>
          <PropertyLocation />
          <PropertyDesc />
          <SellerProfile />
          <InfoSnippets />
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <div className="testimonials">
      <div className="content">Content Here</div>
      <figure>
        <img className="lazy" data-src={familyhome} alt="family at home" />
      </figure>
    </div>
  );
}

function Main() {
  return (
    <main>
      <First />
      <Second />
      <MapSection />
      <HotDeals />
      <Testimonials />
    </main>
  );
}

export default Main;
