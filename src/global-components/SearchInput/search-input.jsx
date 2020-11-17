import React, { useState, useEffect } from 'react';
import './search-input.css';
import './sticky-header.css';
import { FaSearch } from 'react-icons/fa';
import { FaSort, FaFilter } from 'react-icons/fa';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

export default function SearchInput() {
  return (
    <div id="search-wrapper">
      <input type="search" className="search-input" placeholder="search..." />
      <FaSearch className="search-icon" />
    </div>
  );
}

function Btn(props) {
  const { visible, toggle } = props;
  return (
    <span onClick={toggle}>
      {visible ? <IoIosArrowUp /> : <IoIosArrowDown />}
    </span>
  );
}

export function StickyHeader() {
  const [eligible, setEligible] = useState(false);
  const [bool, setBool] = useState(true);

  function toggleHide(e) {
    if (bool) {
      e.currentTarget.parentElement.parentElement.classList.add('sticky');
      setBool(false);
    } else {
      e.currentTarget.parentElement.parentElement.classList.remove('sticky');
      setBool(true);
    }
  }

  function onWindowScroll() {
    if (window.scrollY > 100) {
      setEligible(true);
    } else {
      setEligible(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', onWindowScroll);
    return () => window.removeEventListener('scroll', onWindowScroll);
  }, []);

  return (
    <div className="sticky-header">
      <SearchInput />
      <div className="plugin">
        <span>
          <FaFilter />
        </span>
        {eligible ? <Btn visible={bool} toggle={toggleHide} /> : null}
        <span>
          <FaSort />
        </span>
      </div>
    </div>
  );
}
