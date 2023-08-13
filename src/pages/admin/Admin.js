import React from 'react'
import './Admin.css'
import Navbbar from '../../components/admin/navbar/Navbbar'
import { Route, Routes } from 'react-router-dom'
import Home from '../../components/admin/home/Home'
import ViewProduct from '../../components/admin/viewProduct/ViewProduct'
import Addproduct from '../../components/admin/addProduct/Addproduct'

const Admin = () => {
  return (
    <div className='admin container'>
        <div className="adminnavbar">
            <Navbbar/>
        </div>
        <div className="admincontent">
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/all-products' element={<ViewProduct/>}/>
                <Route path='/add-product' element={<Addproduct/>}/>
            </Routes>
        </div>
    </div>
  )
}

export default Admin