import React from 'react'
import Navbar from '../components/Navbar'
import UserHome from '../components/UserHome'
import { style } from '../style'


function User() {
  return (
    <div className={style.userPage}>
      <Navbar/>
      <UserHome/>
    </div>
  )
}

export default User
