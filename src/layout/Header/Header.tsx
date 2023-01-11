import React from 'react'
import Nav from '../Nav/Nav'
import './Header.css'
const Header = () => {
  return (
    <header className='header_container'>
        <h1 className='header_Title'>Data Structure Visualizer</h1>
        <Nav/>
    </header>
  )
}

export default Header