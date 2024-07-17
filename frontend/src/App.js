import React from 'react'
import Search from './pages/Search'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header'

function App() {
  return (
    <div>
      <Header/>
      <BrowserRouter>
        <Routes>
            <Route path = '/' element = {<Search/>}/>
            <Route path = '/SignIn' element = {<SignIn/>}/>
            <Route path = '/SignUp' element = {<SignUp/>}/>
            
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App