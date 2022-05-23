import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

// TODO: 1) complete language selection; 2) fix active link and page-location indication; 3) add hover text to the nav-expand on web
const Nav = () => {
  const router = useRouter();
  const [isMenu, setIsMenu] = useState(false);

  const getPath = () => {
    const path = router.pathname.substring(1);

    // TODO: Change the displayed name based on the path if necessary, e.g.
    let pageLocation = path;
    if (path === '') {
      pageLocation = 'Home';
    }

    return pageLocation;
  };

  const toggleMenu = (isMenu) => {
    setIsMenu(isMenu);
  };

  return (
    <>
      <header id='header'>
        <nav className='nav'>
          <Link href='/'>
            <a
              onClick={() => {
                toggleMenu(false);
              }}
            >
              <div className='container-logo'>
                <div
                  className={isMenu ? 'logo-icon light' : 'logo-icon dark'}
                ></div>
                <img
                  src={isMenu ? '/logo-light.png' : '/logo.png'}
                  className='logo-text'
                />
              </div>
            </a>
          </Link>
          <div className='page-location'>| {getPath()}</div>
          <button
            className={isMenu ? 'toggle-menu active' : 'toggle-menu'}
            onClick={() => toggleMenu(!isMenu)}
          >
            <span></span>
          </button>
          <div
            className={isMenu ? 'container-lang light' : 'container-lang dark'}
          >
            <button className='btn-language active'>En</button>
            <button className='btn-language'>عربي</button>
          </div>
        </nav>
      </header>

      <div id='menu' className={isMenu ? 'open' : ''}>
        <nav className='main-nav'>
          <ul>
            <li
              onClick={() => {
                setIsMenu(false);
              }}
            >
              <Link href='/explore'>Explore</Link>
            </li>
            <li
              onClick={() => {
                setIsMenu(false);
              }}
            >
              <Link href='/trace'>Trace</Link>
            </li>
            <li
              onClick={() => {
                setIsMenu(false);
              }}
            >
              <Link href='/discover'>Discover</Link>
            </li>
            <li
              onClick={() => {
                setIsMenu(false);
              }}
            >
              <Link href='/contribute'>Contribute</Link>
            </li>
            <li
              onClick={() => {
                setIsMenu(false);
              }}
            >
              <Link href='/about'>About</Link>
            </li>
          </ul>
        </nav>

        <footer className='menu-footer'>
          <nav className='footer-nav'>
            <ul>
              <li>
                <a href='#'>
                  <i className='fa fa-twitter fa-fw'></i>
                  Twitter
                </a>
              </li>
              <li>
                <a href='#'>
                  <i className='fa fa-envelope fa-fw'></i>
                  Subscribe
                </a>
              </li>
            </ul>
          </nav>
        </footer>
      </div>
    </>
  );
};

export default Nav;
