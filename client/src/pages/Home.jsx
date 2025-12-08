import React from 'react'
import Logo from '../components/Logo'
import LogIn  from '../components/LogIn'
import { style } from '../style'

function Home() {
  return (
    <div className={style.homePage}>
       <Logo />
      <LogIn/>
    </div>
  )
}

export default Home
