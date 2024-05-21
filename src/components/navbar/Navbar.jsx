import React, { Component } from 'react';
import './navbar.css';
import image from '../../assets/image.png'

class Navbar extends Component {
  render() {
    return (
      <section className="header">
        <nav className="navbar">
          <div className="navbar-brand">
            <a href="/">AliExpress</a>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/">каталог</a>
            </li>
            <li>
              <input type="text" placeholder='серьги ' />
            </li>
            <li className="nav-item">
              <a href="/about">заказы </a>
            </li>
            <li className="nav-item">
              <a href="/services">корзина</a>
            </li>
            <li className="nav-item">
              <a href="/contact">войти </a>
            </li>
          </ul>
        </nav>
        <div className="hero">
            <img src={image} alt="" />
        </div>
      </section>
    );
  }
}

export default Navbar;
