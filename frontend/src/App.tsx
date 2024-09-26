import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ForgetPassword, Login, Profile, Signup, VerifyEmail } from "./components"
import { ToastContainer } from 'react-toastify'

function App() {
  return (
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
  );
}

export default App;
