import React from 'react'
import AdminHome from '../../components/AdminHome'
import Navbar from '../../components/Navbar'
import { style } from '../style'

function Admin() {
  return (
    <div className={style.adminPage}>
      <Navbar/>
      <AdminHome/>
    </div>
  )
}

export default Admin
