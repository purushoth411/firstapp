
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Sidebar from './components/Sidebar'


function App() {
 

  return (
    <>
  <Router>
  <Sidebar/>
  <div className='flex-grow-1 p-4' style={{marginLeft:"220px"}}>
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>}/>
      {/* <Route path="/dashboard/:userid" element={<Dashboard/>}/> */}
      <Route path="/products" element={<Products/>}/>
    </Routes>
  </div>
  </Router>
     
     
     
    </>
  )
}

export default App
