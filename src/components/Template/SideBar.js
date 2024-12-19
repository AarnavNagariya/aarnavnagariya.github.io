import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/me_3.jpg`} alt="" />
      </Link>
      <header>
        <h2>Aarnav Nagariya</h2>
        <p>
          <a href="mailto:nagariyaaarnav@gmail.com">nagariyaaarnav@gmail.com</a>
        </p>
      </header>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p>
        Hi, I&apos;m Aarnav. I am a 4th year student at {' '}
        <a href="https://www.iiit.ac.in/"> International Institute of Information Technology Hyderabad.</a> {' '}
        I am a passionate programmer and a quick learner. {' '}
        I like playing and developing games in the free time.
      </p>
      <ul className="actions">
        <li>
          {!window.location.pathname.includes('/resume') ? (
            <Link to="/resume" className="button">
              Learn More
            </Link>
          ) : (
            <Link to="/about" className="button">
              About Me
            </Link>
          )}
        </li>
      </ul>
    </section>

    <section id="footer">
      <ContactIcons />
      <p className="copyright">
        &copy; Aarnav Nagariya
      </p>
    </section>
  </section>
);

export default SideBar;
