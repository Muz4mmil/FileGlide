import React, { useRef, useEffect, useState } from 'react'
import { db, storage } from '../firbase-config'
import { ref, deleteObject } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { doc, collection, onSnapshot, query, deleteDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";


function Start({ setBucketCode }) {

  const [isLoading, setIsLoading] = useState(true)

  const bucketInputRef = useRef(null)

  let currentDate = new Date();
  const filesRef = collection(db, "files");
  const clipboardRef = collection(db, "clipboard");

  useEffect(() => {
    const queryFiles = query(filesRef);
    const unsubscribeFiles = onSnapshot(queryFiles, (snapshot) => {
      snapshot.forEach(async (document) => {
        try {
          let fileData = document.data()
          let fileUploadDate = fileData.uploadDate;

          if (currentDate.getDate() > fileUploadDate.date ||
            currentDate.getMonth() > fileUploadDate.month ||
            currentDate.getFullYear() > fileUploadDate.year) {
            let fileRef = ref(storage, fileData.name);

            await deleteObject(fileRef)
            await deleteDoc(doc(db, "files", document.id))
          }
        }
        catch (error) {
          console.error("Error deleting file: ", error);
        }

      }
      )
    });

    const queryClipbords = query(clipboardRef);
    const unsubscribeClipboard = onSnapshot(queryClipbords, (snapshot) => {
      snapshot.forEach((document) => {
        let fileData = document.data()
        let fileUploadDate = fileData.uploadDate;

        if (currentDate.getDate() > fileUploadDate.date ||
          currentDate.getMonth() > fileUploadDate.month ||
          currentDate.getFullYear() > fileUploadDate.year) {

          let docRef = fileData.bucket
          deleteDoc(doc(db, "clipboard", docRef))
          console.log('deleted clipboard');

        }
      })
    });

    setIsLoading(false)
    setTimeout(()=>{
      document.getElementById('bucketCode').focus()
    }, 500)
    
    return () => {
      unsubscribeFiles();
      unsubscribeClipboard()
    };
  }, [])

  return (
    <div className="start">
      {
        isLoading ? (
          <div className='loader'>
            <span className='loader-icon'></span>
          </div>
        ) : (
          <>
            <div className="welcome animate__animated animate__fadeIn">
              <div className="main">
                <h1><span>Welcome to</span> FileGlide</h1>
                <h3>Glide into a new way of Seamless, Secure, Anonymous and   Hassle-Free File Sharing.</h3>
              </div>
              <p><b>How to use - </b><br />
                Step 1 - Enter any 4-digit random Bucket Code. <br />
                Step 2 - Enter the same Code in another device/s. <br />
                Step 3 - Start transfering files and clipboards among these devices. <br />
                Step 4 - Thank me ;)
              </p>
              <p className='info'><i class="fa-solid fa-circle-info" style={{ marginRight: '10px' }}></i> Remember, At midnight 12', all Buckets will be emptied, your files will get deleted too and won't be accessible after that.</p>
            </div>
            <div className="bucket-box animate__animated animate__fadeIn">
              <p>Enter Bucket Code</p>
              <form>
                <input id='bucketCode' ref={bucketInputRef} maxLength={4} placeholder='XXXX' />
                <button type='submit' onClick={(e) => {
                  e.preventDefault();
                  setBucketCode(bucketInputRef.current.value);
                  console.log("Entered " + bucketInputRef.current.value);
                }}>Enter</button>
              </form>
            </div>
            <a href="http://muz4mmil.github.io" target="_blank" className='credit'>©Muzammil</a>
          </>
        )
      }
    </div>
  )
}

export default Start
