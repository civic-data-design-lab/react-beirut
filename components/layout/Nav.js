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
        className={`container ${
          isMenuOpen || hideBg() ? ' hide-background' : ''
        } ${isActive ? 'active' : ''}`}
      >
        <Link href="/">
          <a
            onClick={() => {
              toggleMenu(false);
            }}
          >
            <div className="container-logo">
              <img
                src={isMenuOpen ? '/LHA_logo-horiz-invert.png' : '/LHA_logo-horiz.png'}
                className="logo-text"
              />
            </div>
          </a>
        </Link>
        <div className="page-location">
          {getPath() ? '|' : ''} {getPath()}
        </div>
        <div
          className={
            isMenuOpen ? 'container-lang light' : 'container-lang dark'
          }
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
          <div className='justify-content-center d-flex' style={{margin: "auto"}}><ul>
            <li
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className={router.pathname === '/map' ? 'active' : ''}
            >
              <div className='container'>
                <div className='item-line'></div>
                <div className='item-text-1'><Link  href="/map">Map</Link></div>
                <div className='item-text-2'> the spatial presence of craftsmanship in Beirut </div>
              </div>
            </li>
            <li
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className={router.pathname === '/discover' ? 'active' : ''}
            >
              <div className="container">
                <div className='item-line'></div>
                <div className='item-text-1'><Link href="/discover">Discover</Link></div>
                <div className='item-text-2'> current workshops and archival images of craftsmanship </div>
              </div>
            </li>
            <li
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className={router.pathname === '/contribute' ? 'active' : ''}
            >
              <div className='container'>
                <div className='item-line'></div>
                <div className='item-text-1'><Link href="/contribute">Contribute</Link></div>
                <div className='item-text-2'> to the Living Heritage Atlas with photos of craftsmanship </div>
              </div>
            </li>
            <li
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className={router.pathname === '/download' ? 'active' : ''}
            >
              <div className='container'>
                <div className='item-line'></div>
                <div className='item-text-1'><Link href="/download">Download</Link></div>
                <div className='item-text-2'> data from the Living Heritage Atlas </div>
              </div>
            </li>
            <li
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className={router.pathname === '/about' ? 'active' : ''}
            >
              <div className='container'>
                <div className='item-line'></div>
                <div className='item-text-1'><Link href="/about">About</Link></div>
                <div className='item-text-2'> the Living Heritage Atlas | Beirut </div>
              </div>
            </li>
          </ul></div>
        </nav>

        <footer className="menu-footer">
          <nav className="footer-nav">
            <div>
              <a href="https://civicdatadesignlab.mit.edu/" target="_blank">
                <img id="CDDL-Logo" src="/CDDL Logo.png" />
              </a>
              <a href="https://www.futureheritagelab.com/" target="_blank">
                <img id="FHL-Logo" src="/FHL Logo.png" />
              </a>
              <a href="https://sap.mit.edu/" target="_blank">
                <img id="SAP-Logo" src="/MIT SA+P Logo.png" />
              </a>
            </div>
            <br />
            Contact us at{' '}
            <a href="mailto:livingheritage@mit.edu">
              livingheritage@mit.edu
            </a>{' '}
            with any questions or comments about the Living Heritage Atlas |
            Beirut.
            <br />
            <small>
              &copy; 2022 Living Heritage Atlas 2022. All rights reserved.
            </small>
            {/* <ul>
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
            </ul> */}
          </nav>
        </footer>
      </div>
    </>
  );
};

export default Nav;
