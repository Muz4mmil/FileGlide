import React, { useState, useEffect } from 'react'
import { collection, doc, onSnapshot, setDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { db, storage } from '../firbase-config'

function ClipBoard({ bucketCode }) {

  const [sharedText, setSharedText] = useState('');

  // Function to handle text input change
  const handleChange = (event) => {
    setSharedText(event.target.value);
  };

  // Function to save the shared text to Firestore
  const saveSharedText = async () => {
    let date = new Date();
    const clipboardDocRef = doc(db, 'clipboard', bucketCode);
    await setDoc(clipboardDocRef, {
      text: sharedText,
      bucket: bucketCode,
      uploadDate: {
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      },
    });
    console.log('text-sent');
  };

  const copySharedText = () => {
    let textarea = document.querySelector(".text-field");
    textarea.select();
    document.execCommand("copy");
    textarea.blur();

    document.querySelector('.copy').innerHTML = '<i class="fa-solid fa-check"></i>Copied'

    setTimeout(() => {
      document.querySelector('.copy').innerHTML = '<i class="fa-regular fa-copy"></i>Copy'
    }, 1000)
  }

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
      <textarea name="text-field" className='text-field' rows="14" value={sharedText} onChange={handleChange}></textarea>
      <div className="buttons">
        <div className="copy" onClick={copySharedText}><i class="fa-regular fa-copy"></i>Copy</div>
        <div className="refresh" onClick={saveSharedText}><i class="fa-solid fa-arrows-rotate"></i>Update</div>
        <div className="clear" onClick={() => setSharedText('')}><i class="fa-solid fa-eraser"></i>Clear</div>
      </div>
    </div>
  )
}

export default ClipBoard