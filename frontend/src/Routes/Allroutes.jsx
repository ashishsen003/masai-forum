import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Posts from '../pages/Posts'
import Login from '../pages/Login'

const Allroutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Posts />} />
        <Route path='/login' element={<Login />} />
        <Route path='/posts' element={<Posts />} />
      </Routes>
  )
}

export default Allroutes