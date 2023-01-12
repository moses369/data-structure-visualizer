import React from 'react'
import Nav from '../Nav/Nav'
import s from './Header.module.scss'
const Header = () => {
  return (
    <header className={`${s.container}`}>
        <h1 >Data Structure Visualizer</h1>
        <Nav/>
    </header>
  )
}

export default Header