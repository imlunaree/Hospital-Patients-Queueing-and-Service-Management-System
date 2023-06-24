import { useState, useEffect } from 'react'
import { app, db,auth  } from '../../../firebase/config'
import { getFirestore, collection, query, where, getDocs, getDoc, addDoc, doc } from 'firebase/firestore';

const getDocuments = async (collectionName) => {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, collectionName));
  const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return documents;
};

export default function Queue() {
  //const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)
  const [email, setEmail] = useState('')

  const [patientID, setPatientID] = useState(Math.floor(Math.random() * 10000));
  const [patientName, setPatientName] = useState('');
  const [patientDOB, setPatientDOB] = useState('');
  const [patientSex, setPatientSex] = useState('');

  const [documents, setDocuments] = useState([]);
  const [timeOptions, setTimeOptions] = useState([]);
  


  useEffect (() => {

    const getEmail = auth.onAuthStateChanged((user) => {setEmail(user.email)

      const fetchField = async () => {

        const q = query(collection(db, "profiles"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
    
        if (querySnapshot.docs.length > 0) {
          const docData = querySnapshot.docs[0].data();
          setPatientName(docData.profileName);
          setPatientDOB(docData.profileDOB);
          setPatientSex(docData.profileSex);
        } else {
          console.log("No documents found!");
        }
      };

      fetchField();

      const fetchOptions = async () => {
        const querySnapshot = await getDocs(collection(db, "timeslots"));
        const optionsData = querySnapshot.docs.map((doc) => ({
          timeStart: doc.data().timeStart,
          timeEnd: doc.data().timeEnd,
        }));
        setTimeOptions(optionsData);
      };
  
      fetchOptions();
    })
    
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'queue'), {
        patientID,
        patientName,
        patientDOB,
        patientSex
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}

      <h2>Register into Queue:</h2>

      <form className='new-event-form' onSubmit={handleSubmit}>
		<label>
            <span>ID: </span>
            <input type="text" 
            value = {patientID}
            onChange={(e) => setPatientID(e.target.value)}
            required
            readOnly
            disabled/>
        </label>
        <br />
		<label>
            <span>Name: </span>
		    <input type="text" 
            value = {patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
            readOnly
            disabled/>
        </label>
        <br />

        <label>
            <span>Date of Birth: </span>
            <input 
            type="date" 
            value = {patientDOB}
            onChange={(e) => setPatientDOB(e.target.value)}
            required
            readOnly
            disabled/>
        </label>
        <br />

		<label>
            <span>Sex: </span>
            <select 
            value = {patientSex}
            onChange={(e) => setPatientSex(e.target.value)}
            required
            disabled>
                <option value="">--Select Gender--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
        </label>
        <br />
        <br />

        <label>
            <span>Date of Appointment: </span>
            <input 
            type="date" 
            value = {patientDOB}
            onChange={(e) => setPatientDOB(e.target.value)}
            required/>
        </label>
        <br />

        <label>
            <span>Time Slot: </span>
            <select 
            value = {timeOptions}
            onChange={(e) => setTimeOptions(e.target.value)}
            required>
            {timeOptions.map((option) => (
              <option key={option.timeStart + " - " + option.timeEnd} value={option.timeStart + " - " + option.timeEnd}>
                {option.label}
              </option>
            ))}
            </select>
        </label>
        <br />

		<button>Submit</button>
	    </form>
      
    </div>
  )
}