import { useState, useEffect } from 'react'
import { app, db  } from '../../../firebase/config'
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const getDocuments = async (collectionName) => {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, collectionName));
  const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return documents;
};

export default function Queue() {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    setIsPending(true)
    const fetchDocuments = async () => {
      const documents = await getDocuments('queue');
      setDocuments(documents);
      setIsPending(true)
    };
    fetchDocuments();
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      
      {documents.map((doc) => (
        <li key={doc.id}>{doc.patientName}</li>
      ))}
      
    </div>
  )
}