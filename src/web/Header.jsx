import React from 'react';
import './css/style.css';
import Logo from './img/logo.svg';

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="wiki-header">
      <div className="wiki-header-wrapper">
        <div className="wiki-header-left">
          <a href="/" className="logo">
            <img src={Logo} alt="Logo" className="logo-img" />
            <span className="wiki-title">guide</span>
          </a>
        </div>
        <div className="wiki-header-right">
          <button
            className={`tab-link ${activeTab === 'rules' ? 'active' : ''}`}
            onClick={() => setActiveTab('rules')}
          >
            menu1
          </button>
          <button
            className={`tab-link ${activeTab === 'connect' ? 'active' : ''}`}
            onClick={() => setActiveTab('connect')}
          >
            menu2
          </button>
          <button
            className={`tab-link ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            menu3
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;