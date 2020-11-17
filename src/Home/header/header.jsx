import React from 'react';
import { HeaderTop } from '../../global-components/headers/headers';
import SearchInput from '../../global-components/SearchInput/search-input';
import './css/header.css';

function Main() {
  return (
    <div className="main">
      <SearchInput />
    </div>
  );
}

const style = {
  display: 'flex',
  justifyContent: 'center',
  padding: '1em 0',
  color: '#9e9e9e',
  backgroundColor: '#1b1919',
};

function Header() {
  return (
    <>
      <div style={style}>
        This site is still in development. server requests and other
        functionalities may not work as you may expect
      </div>
      <header className="homepage">
        <HeaderTop />
        <Main />
      </header>
    </>
  );
}

export default Header;
