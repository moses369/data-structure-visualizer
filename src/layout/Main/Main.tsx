import React from 'react'
import Options from '../../components/Main/Options/Options'
import Display from '../../components/Main/Display/Display'
import './Main.css'
const Main = () => {
  return (
    <div className='flex_row main_container' >
     <Options/>
     <Display/>
    </div>
  )
}

export default Main