import './tailwind.css';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ForgetPassword, Login, Profile, Signup, VerifyEmail } from "./components"
import { ToastContainer } from 'react-toastify'
import { Helmet } from 'react-helmet'

class App extends React.Component {
  render () {
    return (
      <>
        <Helmet>
          <html lang="en" />
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Web site created using create-react-app" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
          <title> Nexos </title>
        </Helmet>
        <Router>
          <ToastContainer/>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/verify' element={<VerifyEmail/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/forget_password' element={<ForgetPassword/>} />
          </Routes>
        </Router>
      </>
    )
  }
}

export default App;
