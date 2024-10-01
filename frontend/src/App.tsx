import './tailwind.css';
// import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Helmet } from 'react-helmet'

import { ForgetPassword, ResetPassword, Profile, Login, Signup, VerifyEmail } from "modules/auth/components"

class App extends React.Component {
  render () {
    return (
      <>
        <Helmet>
          <title>Nexos Product App</title>
          <html lang="en" />
          <meta charSet="UTF-8" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="SPA for the Nexos technical test" />
        </Helmet>
        <Router>
          <ToastContainer/>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/verify' element={<VerifyEmail/>} />
            <Route path='/forgot-my-password' element={<ForgetPassword/>} />
            <Route path='/confirm-forgot-my-password/:uid/:token' element={<ResetPassword/>}/>

            <Route path='/profile' element={<Profile/>} />

          </Routes>
        </Router>
      </>
    )
  }
}

export default App;
