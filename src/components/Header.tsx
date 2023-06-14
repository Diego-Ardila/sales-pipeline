import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className='app-header'>
      <img src="/addi-logo.svg" className="App-logo" alt="logo" />
      <div className='app-header--user-container'>
        <img src="/generic-user-icon.jpg" className="user-img" alt="User image" />
        <span>User name</span>
      </div>
    </header>
  );
}

export default Header;
