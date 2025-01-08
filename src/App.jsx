import React from 'react'
import Nav from './components/Nav'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Profile from './components/Profile'
import Register from './components/Register'
import Login from './components/Login'
import Admin from './components/Admin'
import AdminLogin from './components/AdminLogin'
import RegisterAdmin from './components/RegisterAdmin'
import Update from './components/Update'
import Notes from './components/Notes'
function App() {
  return (
    <>
    <div className="container-fluid">

   
    <BrowserRouter>
    <Nav/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/admin' element={<Admin/>}/>
    <Route path='/admin/register' element={<RegisterAdmin/>}/>
    <Route path='/admin/login' element={<AdminLogin/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/notes' element={<Notes/>}/>
    <Route path='/update/:id' element={<Update/>}/>

    </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App