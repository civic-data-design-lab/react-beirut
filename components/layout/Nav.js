import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';

import {useTranslation} from "react-i18next";


/***
 * TODO: update dual language
 */

const Nav = ({changeLanguage}) => {

  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add drop shadow effect when scrolled to a certain position
  const [isActive, setIsActive] = useState(false);
  const [width, setWidth] = useState(null);

  const headerRef = useRef();

  const {t} = useTranslation();

  const handleResize = () => {
      setWidth(window.innerWidth)
    }


  useEffect(()=>{
    if (isMenuOpen) {
      console.log(`-${window.scrollY}px`)
      const scrollPos = -window.scrollY

        // document.body.style.position = 'fixed';
        //document.body.style.overflow = 'hidden';
        document.body.style.top = `${scrollPos}px`;


    } else {
      const scrollY = document.body.style.top;
      //document.body.style.position = '';
      //document.body.style.overflow = 'auto';
      document.body.style.top = '';

      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isMenuOpen])


  useEffect(()=>{
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, [])

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
    if (path === 'map') return true;
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
        className={`container-fluid ${
          isMenuOpen || hideBg() ? ' hide-background' : ''
        } ${isActive ? 'active' : ''}`}
      >
        <div className={'nav-parent-container container'}>
                  <div className={'nav-left-container'}>
          <Link href="/">
          <a
            onClick={() => {
              toggleMenu(false);
            }}
          >
            <div className="container-logo">
              {width>590 ? (<img
                src={isMenuOpen ? '/LHA_logo-horiz-invert.png' : '/LHA_logo-horiz.png'}
                className="logo-text"
              />) : (<img
                src={isMenuOpen ? '/favicon.png' : '/favicon.png'}
                className="logo-text"
              />)

              }
            </div>
          </a>
        </Link>

          {getPath() ? <div className={`nav-divider vr ${isMenuOpen ? ' hide-background':''}`}/> : null}

        <div className="page-location">
          {t(getPath().charAt(0).toUpperCase()+getPath().slice(1))}
        </div>
        </div>
        <div className={'nav-left-container'}>
        <div
          className={
            isMenuOpen ? 'container-lang light' : 'container-lang dark'
          }
        >
          <button className="btn-language" onClick={()=>{changeLanguage('en')}}>En</button>
          <button className="btn-language" onClick={()=>{changeLanguage('ar')}}>عربي</button>
        </div>
        <button
          className={isMenuOpen ? 'toggle-menu active' : 'toggle-menu'}
          onClick={() => toggleMenu(!isMenuOpen)}
        >
          <span></span>
        </button>
        </div>
        </div>
      </header>

      <div id="menu" className={isMenuOpen ? 'open' : ''}>
        <nav className="main-nav">
          <div className='justify-content-center d-flex container-links' style={{margin: "auto"}}><ul>
            <li
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className={router.pathname === '/map' ? 'active nav-list-item' : 'nav-list-item'}
            >
              <div className='container'>
                <div className='item-line'></div>
                <div className='item-text-1'><Link  href="/map">{t('Map')}</Link></div>
                <div className='item-text-2'> {t('the spatial presence of craftsmanship in Beirut')} </div>
              </div>
            </li>
            <li
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className={router.pathname === '/discover' ? 'active nav-list-item' : 'nav-list-item'}
            >
              <div className="container">
                <div className='item-line'></div>
                <div className='item-text-1'><Link href="/discover">{t('Discover')}</Link></div>
                <div className='item-text-2'> {t('current workshops and archival images of craftsmanship')} </div>
              </div>
            </li>
            <li
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className={router.pathname === '/contribute' ? 'active nav-list-item' : 'nav-list-item'}
            >
              <div className='container'>
                <div className='item-line'></div>
                <div className='item-text-1'><Link href="/contribute">{t('Contribute')}</Link></div>
                <div className='item-text-2'> {t('to the Living Heritage Atlas with photos of craftsmanship')} </div>
              </div>
            </li>
            <li
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className={router.pathname === '/download' ? 'active nav-list-item' : 'nav-list-item'}
            >
              <div className='container'>
                <div className='item-line'></div>
                <div className='item-text-1'><Link href="/download">{t('Download')}</Link></div>
                <div className='item-text-2'> {t('data from the Living Heritage Atlas')} </div>
              </div>
            </li>
            <li
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className={router.pathname === '/about' ? 'active nav-list-item' : 'nav-list-item'}
            >
              <div className='container'>
                <div className='item-line'></div>
                <div className='item-text-1'><Link href="/about">{t('About')}</Link></div>
                <div className='item-text-2'> {t('the Living Heritage Atlas | Beirut')} </div>
              </div>
            </li>
          </ul></div>
        </nav>

        <footer className="menu-footer">
          <nav className="footer-nav">
            <div className={'footer-logos'}>
              <a href="https://civicdatadesignlab.mit.edu/" target="_blank">
                <img id="CDDL-Logo" src="/CDDL Logo_white.png" />
              </a>
              <a href="https://www.futureheritagelab.com/" target="_blank">
                <img id="FHL-Logo" src="/FH Logo_white.png" />
              </a>
              <a href="https://sap.mit.edu/" target="_blank">
                <img id="SAP-Logo" src="/MIT SA+P Logo_white.png" />
              </a>
            </div>
            <br />
            <div className={'footer-contact'}>
              {t("Contact us at livingheritage@mit.edu with any questions or comments about the Living Heritage Atlas | Beirut.")}
            <br />
            <small>
              &copy; {t("2022 Living Heritage Atlas 2022. All rights reserved.")}
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
              </div>
          </nav>
        </footer>
      </div>
    </>
  );
};

export default Nav;
