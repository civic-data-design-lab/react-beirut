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

  return (
    <>
      {!isMenu ? (
        <nav className='header'>
          <div>
            <div>
              <Link href='/'>
                <a
                  onClick={() => {
                    setIsMenu(false);
                  }}
                >
                  <div className='container-logo'>
                    <div className='logo-icon dark'></div>
                    <img src='/logo.png' className='logo-text' />
                  </div>
                </a>
              </Link>
            </div>

            <div className='page-location'>| {getPath()}</div>
          </div>

          <div>
            <div className='container-lang'>
              <button className='btn-language dark active'>
                <small>En</small>
              </button>
              <button className='btn-language dark'>
                <small>عربي</small>
              </button>
            </div>
            <button className='btn-menu' onClick={() => setIsMenu(!isMenu)}>
              !<FontAwesomeIcon icon={faBars} className='fa-2x' />
            </button>
          </div>
        </nav>
      ) : (
        <div>
          <div className='header dark'>
            <Link href='/'>
              <a
                onClick={() => {
                  setIsMenu(false);
                }}
              >
                <div className='container-logo'>
                  <div className='logo-icon light'></div>
                  <img src='/logo-light.png' className='logo-text' />
                </div>
              </a>
            </Link>
            <div className='container-lang '>
              <div>
                <button className='btn-language light active'>
                  <small>En</small>
                </button>
                <button className='btn-language light'>
                  <small>عربي</small>
                </button>
              </div>
            </div>
            <button
              className='container__right'
              onClick={() => setIsMenu(!isMenu)}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className='fa-2x btn-menu btn-close'
              />
            </button>
          </div>
          <div className='nav'>
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
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
