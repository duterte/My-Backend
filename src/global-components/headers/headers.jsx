import React from 'react';
import { HeaderNav } from '../site-map/site-map';
import { TiThMenu } from 'react-icons/ti';
import './headers.css';

function mobileFn() {
  const overlay = document.querySelector('#portal > .overlay');
  overlay.style.display = 'grid';
}

export function HeaderTop() {
  return (
    <div className="header-top-wrapper">
      <div className="header-top">
        <HeaderNav />
        <span className="mobile-menu hamburger-menu" onClick={mobileFn}>
          <TiThMenu />
        </span>
      </div>
    </div>
  );
}

export default HeaderTop;
