import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { app, db, auth } from '../firebase/config'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

import './Navbar.css'
import { useState, onAuthStateChanged } from 'react'

export default function Navbar() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);

    const [isAdmin, setIsAdmin] = useState(false);
    const fetchData = async (e) => {
        console.log(e)
        const q = query(
        collection(db, "profiles"), where("email", "==", e), where("isAdmin", "==", true));
        const querySnapshot = await getDocs(q);
        setIsAdmin(!querySnapshot.empty);
        setIsLoading(false)
      };

    useEffect(() => {
        setIsLoading(true)
      const checkUser = auth.onAuthStateChanged( (user) => {
        if (user) {
            setUser(user);
            setIsSignedIn(true)
            fetchData(user.email);
            
        } else {
            setIsSignedIn(false);
            setIsLoading(false)
        }
      });
      return () => checkUser;
    }, []);

  return (
    <div className="navbar">
      {!isLoading && (<nav>
        <Link to="/" className="brand">
          <h1>Hospital Patients Queueing and Service Management System</h1>
        </Link>
        
        {isSignedIn && (isAdmin && (<Link to="/appointments"className="menu-link">Current Queue</Link>))}
        {isSignedIn && (isAdmin && (<Link to="/schedule" className="menu-link">Logs</Link>))}
        {isSignedIn && (isAdmin && (<Link to="/profile"className="menu-link">Manage Admin Accounts</Link>))}

        {isSignedIn && (!isAdmin && (<Link to="/appointments"className="menu-link">My Appointments</Link>))}
        {isSignedIn && (!isAdmin && (<Link to="/schedule" className="menu-link">Schedule Appointment</Link>))}
        {isSignedIn && (!isAdmin && (<Link to="/profile"className="menu-link">Manage My Account</Link>))}

        {!isSignedIn && (<Link to="/login"className="menu-link">Login</Link>)}
        {!isSignedIn && (<Link to="/signup" className="menu-link">Sign Up</Link>)}
        
        {isSignedIn && (<Link to="/logout"className="menu-link">Logout</Link>)}
        
      </nav>)}
    </div>
  )
}
