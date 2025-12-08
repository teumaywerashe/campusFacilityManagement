import React from 'react'
import AdminHome from '../../components/AdminHome'
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
