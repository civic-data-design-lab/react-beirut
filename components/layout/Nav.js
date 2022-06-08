import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';

/***
 * TODO: update dual language
 */

const Nav = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add drop shadow effect when scrolled to a certain position
  const [isActive, setIsActive] = useState(false);
  const headerRef = useRef();

  useEffect(() => {
    const { offsetHeight } = headerRef.current;

    window.addEventListener('scroll', () => {
      if (window.scrollY > offsetHeight) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    });
  });

  // dynamically showing the page location
  const getPath = () => {
    const path = router.pathname.split('/')[1];

    let pageLocation = path;
    if (path === '') {
      pageLocation = '';
    }

    return pageLocation;
  };

  const hideBg = () => {
    const path = getPath();
    if (path === '' || path === 'map') return true;
    return false;
  };

  const toggleMenu = (isMenu) => {
    setIsMenuOpen(isMenu);
  };

  return (
    <>
      <header
        ref={headerRef}
        id="header"
        className={`container ${isMenuOpen || hideBg() ? ' hide-background' : ''} ${
          isActive ? 'active' : ''
        }`}
      >
        <Link href="/">
          <a
            onClick={() => {
              toggleMenu(false);
            }}
          >
            <div className="container-logo">
              <div
                className={isMenuOpen ? 'logo-icon light' : 'logo-icon dark'}
              ></div>
              <img
                src={isMenuOpen ? '/logo-light.png' : '/logo.png'}
                className="logo-text"
              />
            </div>
          </a>
        </Link>
        <div className="page-location">
          {getPath() ? '|' : ''} {getPath()}
        </div>
        <div
          className={isMenuOpen ? 'container-lang light' : 'container-lang dark'}
        >
          <button className="btn-language active">En</button>
          <button className="btn-language">عربي</button>
        </div>
        <button
          className={isMenuOpen ? 'toggle-menu active' : 'toggle-menu'}
          onClick={() => toggleMenu(!isMenuOpen)}
        >
          <span></span>
        </button>
      </header>

      <div id="menu" className={isMenuOpen ? 'open' : ''}>
        <nav className="main-nav">
          <ul>
            <li
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className={router.pathname === '/map' ? 'active' : ''}
            >
              <Link href="/map">Map</Link>
            </li>
            <li
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className={router.pathname === '/work' ? 'active' : ''}
            >
              <Link href="/work">Work</Link>
            </li>
            <li
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className={router.pathname === '/discover' ? 'active' : ''}
            >
              <Link href="/discover">Discover</Link>
            </li>
            <li
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className={router.pathname === '/contribute' ? 'active' : ''}
            >
              <Link href="/contribute">Contribute</Link>
            </li>
            <li
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className={router.pathname === '/about' ? 'active' : ''}
            >
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>

        <footer className="menu-footer">
          <nav className="footer-nav">
            <ul>
              <li>
                <a href="#">
                  <i className="fa fa-twitter fa-fw"></i>
                  Twitter
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-envelope fa-fw"></i>
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
