import React from 'react'
import { useState } from 'react';
import {createUserWithEmailAndPassword } from 'firebase/auth';
import {auth, app, db } from '../../../firebase/config'
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'


export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [profileName, setProfileName] = useState('');
    const [profileDOB, setProfileDOB] = useState('');
    const [profileSex, setProfileSex] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    

    const navigate = useNavigate();
  
    
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
        await createUserWithEmailAndPassword(auth, email, password);

            try {
                const docRef = await addDoc(collection(db, 'profiles'), {
                email,
                profileName,
                profileDOB,
                profileSex,
                isAdmin,
                isSuperAdmin
                });
                console.log('Document written with ID: ', docRef.id);
            } catch (e) {
                console.error('Error adding document: ', e);
            }
            setEmail('');
            setPassword('');
            setError('');
            setProfileName('');
            setProfileDOB('');
            setProfileSex('');
            
            navigate('/')

        } catch (error) {
        setError(error.message);
        }
    };
    
    return (
        <div>
        <h1>Sign up</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleSignup}>
            <label>
            Email:
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </label>
            <br/>
            <label>
            Password:
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </label>
            <br/>

            <label>
                <span>Name: </span>
                <input type="text" 
                value = {profileName}
                onChange={(e) => setProfileName(e.target.value)}
                required/>
            </label>
            <br />

            <label>
                <span>Date of Birth: </span>
                <input 
                type="date" 
                value = {profileDOB}
                onChange={(e) => setProfileDOB(e.target.value)}
                required/>
            </label>
            <br />

            <label>
                <span>Sex: </span>
                <select 
                value = {profileSex}
                onChange={(e) => setProfileSex(e.target.value)}
                required>
                    <option value="">--Select Gender--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </label>
            <br />

            <button type="submit">Sign up</button>
        </form>
        </div>
    );
    };
