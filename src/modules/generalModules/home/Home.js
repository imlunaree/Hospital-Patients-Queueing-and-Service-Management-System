import { app, db, auth } from '../../../firebase/config'

import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const checkUserType = async (e) => {
      console.log(e)
      const q = query(
      collection(db, "profiles"), where("email", "==", e), where("isAdmin", "==", true));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        navigate('/queue')
      }
      else {
        navigate('/appointments')
      }
    };

  useEffect(() => {
    const isSignedIn = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        checkUserType(user.email);
      } else {
        navigate('/login')
      }
    });
    return isSignedIn;
  }, []);

  return (
    <div>
      
    </div>
  );
}