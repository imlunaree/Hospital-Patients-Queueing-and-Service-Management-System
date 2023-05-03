import { BrowserRouter, Routes, Route } from 'react-router-dom'

// page components
import Navbar from './components/Navbar'
import Home from './modules/generalModules/home/Home'
import Schedule from './modules/patientModules/schedule/Schedule'
import Queue from './modules/adminModules/queue/Queue'
import Biling from './modules/adminModules/biling/Biling'
import Login from './modules/generalModules/login/Login'

// styles
import './App.css'
import SignUp from './modules/generalModules/signup/SignUp'
import Logout from './modules/generalModules/logout/Logout'



function App() {

  return (
    <BrowserRouter>

    <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}/>
      </Routes>
      <Routes>
        <Route path="/schedule" element={<Schedule />}/>
      </Routes>
      <Routes>
        <Route path="/queue" element={<Queue />}/>
      </Routes>
      <Routes>
        <Route path="/biling" element={<Biling />}/>
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />}/>
      </Routes>
      <Routes>
        <Route path="/signup" element={<SignUp />}/>
      </Routes>
      <Routes>
        <Route path="/logout" element={<Logout />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App