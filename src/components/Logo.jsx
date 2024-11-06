import React from 'react';
import './components.css';

export default function Logo() {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="../../../images/main_logo.png" alt="Bootstrap" width="100" height="55"/>
        </a>
        <button className="logout-button ms-auto">
          로그아웃
        </button>
      </div>
    </nav>
  );
}