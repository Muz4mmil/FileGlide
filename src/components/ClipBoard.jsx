import React, { useState, useEffect }  from 'react'
import { collection, doc, onSnapshot, setDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import {db, storage} from '../firbase-config'

function ClipBoard({bucketCode}) {

  const [sharedText, setSharedText] = useState('');

  // Function to handle text input change
  const handleChange = (event) => {
    setSharedText(event.target.value);
  };

  // Function to save the shared text to Firestore
  const saveSharedText = async () => {
    const clipboardDocRef = doc(db, 'clipboard', bucketCode);
    await setDoc(clipboardDocRef, { text: sharedText});
    console.log('text-sent');
  };

  useEffect(() => {
    // Set up Firestore listener to get shared text updates
    const clipboardDocRef = doc(db, 'clipboard', bucketCode);
    const unsubscribe = onSnapshot(clipboardDocRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setSharedText(data.text || '');
      } else {
        setSharedText('');
      }
    });

    // Clean up the listener on unmount
    return () => {
      unsubscribe();
    };
  }, []);



  
  return (
    <div className='clipboard animate__animated animate__slideInRight animate__faster'>
      <p>Clip-Board</p>
      <textarea name="text-field" className='text-field' rows="10" value={sharedText} onChange={handleChange}></textarea>
      <div className="buttons">
        <div className="refresh" onClick={saveSharedText}><i class="fa-solid fa-arrows-rotate"></i>Update</div>
        <div className="clear" onClick={()=> setSharedText('')}><i class="fa-solid fa-eraser"></i>Clear</div>
      </div>
    </div>
  )
}

export default ClipBoard