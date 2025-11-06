import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//import './css/table_style.css'

import Bookings from './pages/bookings.jsx'
import Services from './pages/services.jsx'
import Addons from './pages/addons.jsx'
import Billings from './pages/billings.jsx'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

import logo from './assets/quinns_logo.png';
import btn_bookings from './assets/bookings_icon.png';
import btn_services from './assets/services_icon.png';
import btn_addons from './assets/addons_icon.png';
import btn_billings from './assets/billings_icon.png';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const pathname = window.location.pathname;
  return (
    <>
      <BrowserRouter>
        <div style={fluidStyle}>
          <Navbar className='nav_menu'>
              <Nav className="mt-0 mb-auto flex-column fluid">
                <Navbar.Brand href="/">
                  <Image className='logo' src={logo} alt="logo" />
                </Navbar.Brand>
                <Nav.Link className={pathname === '/bookings' ? 'nav_btn_hl' : ''} href="/bookings" title="Bookings">
                  <Image className='menu_icon' src={btn_bookings} alt="bookings"/>
                </Nav.Link>
                <Nav.Link className={pathname === '/services' ? 'nav_btn_hl' : ''} href="/services" title="Services">
                  <Image className='menu_icon' src={btn_services} alt="services" />
                </Nav.Link>
                <Nav.Link className={pathname === '/addons' ? 'nav_btn_hl' : ''} href="/addons" title="Addons">
                  <Image className='menu_icon' src={btn_addons} alt="addons" />
                </Nav.Link>
                <Nav.Link className={pathname === '/billings' ? 'nav_btn_hl' : ''} href="/billings" title="Billings">
                  <Image className='menu_icon' src={btn_billings} alt="billings" />
                </Nav.Link>
              </Nav>
          </Navbar>
          
          {/* Routes */}
          <Routes>
            <Route page={"bookings"} path="/bookings" element={<Bookings />} />
            <Route path="/services" element={<Services />} />
            <Route path="/addons" element={<Addons />} />
            <Route path="/billings" element={<Billings />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

const fluidStyle = {
  display: 'flex', 
  flexDirection: 'row', 
  width: '100%', // Use percentages for fluid width
  height: '100%',
  padding: '0em', // Use relative units
  margin: 0,
  //boxSizing: 'border-box',
  // ...other styles
};

export default App