import React from 'react';
import './index.css';
import {
  FaFacebook,
  FaTwitterSquare,
  FaInstagram,
  FaPinterest,
} from 'react-icons/fa';
import { AiFillPhone, AiOutlineMail } from 'react-icons/ai';
import Card from '../cards';
import { FooterNav } from '../site-map/site-map';

export default function Footer() {
  return (
    <footer>
      <div className="middle">
        <div className="wrapper">
          <div className="heading">
            <h1>Property Template</h1>
          </div>
          <div className="context">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit,
              rem! Praesentium nihil excepturi quas numquam amet reiciendis
              libero aperiam natus!
            </p>
          </div>
          <div className="social-media">
            <FaFacebook /> <FaTwitterSquare /> <FaInstagram /> <FaPinterest />
          </div>
          <div className="btn-section">
            <button>SUMBIT LISTING</button>
          </div>
          <div className="contact-info">
            <h2>Contact Information</h2>
            <div className="content">
              <div className="phone">
                <AiFillPhone className="contact-icon" />

                <span>0915 123 4567</span>
              </div>
              <div className="email">
                <AiOutlineMail className="contact-icon" />

                <span>marketing_administrator@contact.com</span>
              </div>
            </div>
          </div>
          <div className="useful-links">
            <h2>Useful Links</h2>
            <div className="group-link">
              <FooterNav />
            </div>
          </div>
          <div className="propery-types">
            <h2>Properties Type</h2>
            <div className="group-link">
              <a href="https://www.example.com">Properties for rent</a>
              <a href="https://www.example.com">Properties for sale</a>
              <a href="https://www.example.com">Properties for Commercial</a>
              <a href="https://www.example.com">Homes</a>
              <a href="https://www.example.com">Villas</a>
              <a href="https://www.example.com">Office</a>
              <a href="https://www.example.com">Residential</a>
              <a href="https://www.example.com">Appartments</a>
              <a href="https://www.example.com">Off plan</a>
            </div>
          </div>
          <div className="featured">
            <h2>Featured Property</h2>
            <div className="cards">
              <Card />
            </div>
          </div>
        </div>
      </div>

      <div className="bottom">
        <p>
          This website was designed and developed by German Ochea. All Right
          Reserve &copy; 2020.
        </p>
      </div>
    </footer>
  );
}
