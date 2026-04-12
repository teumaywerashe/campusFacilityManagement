import React, { useContext } from 'react'
import Logo from '../components/Logo'
import LogIn  from '../components/LogIn'
import { style } from '../style'
import { StoreContext } from '../context/store';

function Home() {


  const {showLogin}=useContext(StoreContext);
  return (
    <div className={style.homePage}>
       { showLogin && <LogIn/> }
          <Logo />
  
    </div>
  )
}

export default Home
