import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { TiThMenu } from 'react-icons/ti';

function Menu({ meta }) {
  const { routePath, viewText } = meta;
  return (
    <span>
      <Link to={routePath} target="_top">
        {viewText}
      </Link>
    </span>
  );
}

export function HeaderNav() {
  const bgscreen = useRef();

  return (
    <>
      <span className="logo">
        <Link to="/" target="_top">
          <img src="/logo192.png" alt="company logo" />
        </Link>
      </span>
      <div className="menu-area">
        <Menu meta={{ routePath: '/listings', viewText: 'View Listing' }} />
        <Menu
          meta={{
            routePath: '/featuredproperty',
            viewText: 'Featured Properties',
          }}
        />
        <span className="dropdown-menu-holder">
          <span className="bigscreen-menu hamburger-menu">
            <TiThMenu />
          </span>
          <ul ref={bgscreen} className="dropdown-menu appear-right">
            <li>
              <Link to="/draft" target="_top">
                Submit Listing
              </Link>
            </li>
            <li>
              <Link to="/login" target="_top">
                Log-in
              </Link>
            </li>
          </ul>
        </span>
      </div>
    </>
  );
}

export function FooterNav() {
  return (
    <>
      <Link to="/" target="_top">
        Home Page
      </Link>
      <Link to="/login" target="_top">
        Log-in
      </Link>
      <Link to="/listings" target="_top">
        View Listings
      </Link>
      <Link to="/featuredproperty" target="_top">
        Featured Properties
      </Link>
      <Link to="/draft" target="_top">
        Submit Listing
      </Link>
      <Link to="/about" target="_top">
        About Us
      </Link>
    </>
  );
}
