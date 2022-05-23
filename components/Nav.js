import Link from 'next/link'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

const Nav = () => {
  const [isMenu, setIsMenu] = useState(false)

  return (
    <>
      {!isMenu ? (
        <nav className='header'>
          <Link href='/'>
            <a onClick={() => setIsMenu(false)}>
              <div className='container-logo'>
                <div className='logo-icon dark'></div>
                <img src='/logo.png' className='logo-text' />
              </div>
            </a>
          </Link>
          <div>
            <div className='container-lang'>
              <button className='btn-language dark'>
                <small>En</small>
              </button>
              <button className='btn-language dark'>
                <small>عربي</small>
              </button>
            </div>
            <button className='btn-menu' onClick={() => setIsMenu(!isMenu)}>
              <FontAwesomeIcon icon={faBars} className='fa-2x' />
            </button>
          </div>
        </nav>
      ) : (
        <div className='nav'>
          <Link href='/'>
            <a onClick={() => setIsMenu(false)}>
              <div className='container-logo'>
                <div className='logo-icon light'></div>
                <img src='/logo-light.png' className='logo-text' />
              </div>
            </a>
          </Link>
          <div className='container-lang '>
            <div>
              <button className='btn-language light'>
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

          <ul>
            <li onClick={() => setIsMenu(false)}>
              <Link href='/explore'>Explore</Link>
            </li>
            <li onClick={() => setIsMenu(false)}>
              <Link href='/trace'>Trace</Link>
            </li>
            <li onClick={() => setIsMenu(false)}>
              <Link href='/discover'>Discover</Link>
            </li>
            <li onClick={() => setIsMenu(false)}>
              <Link href='/contribute'>Contribute</Link>
            </li>
            <li onClick={() => setIsMenu(false)}>
              <Link href='/about'>About</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default Nav
