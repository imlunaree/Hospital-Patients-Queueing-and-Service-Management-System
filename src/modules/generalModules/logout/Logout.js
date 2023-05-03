import { useState, useEffect } from 'react'
import { app, db, auth } from '../../../firebase/config'
import { onAuthStateChanged,signOut} from "firebase/auth";
import { useNavigate } from 'react-router-dom'

export default function Logout() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
  
      return unsubscribe;
    }, []);
  
    const handleLogout = async () => {
      try {
        await signOut(auth);
        console.log('User has been logged out');
        navigate("/home")
      } catch (error) {
        console.error(error);
      }
    };
  
    if (user) {
      return <button onClick={handleLogout}>Logout</button>;
    } else {
      return null;
    }
}
