import React, { useRef, useEffect } from 'react'
import {db, storage} from '../firbase-config'
import { ref, deleteObject  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { collection, onSnapshot, query, deleteDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";


function Start({bucketCode, setBucketCode}) {

  let currentDate = new Date();

  const bucketInputRef = useRef(null)

  const filesRef = collection(db, "files");

  useEffect(()=>{
    const queryFiles = query(filesRef);
    const unsubscribe = onSnapshot(queryFiles, (snapshot)=>{
        snapshot.forEach((doc) =>{
          let fileData = doc.data()

          let fileUploadDate = fileData.uploadDate;

          if (currentDate.getDate() > fileUploadDate.date && currentDate.getMonth() > fileUploadDate.month && currentDate.getFullYear() > fileUploadDate.year){
            let fileRef = ref(storage, fileData.name);
            deleteObject(fileRef);
            console.log("Deleted File "+ fileData.name);
            deleteDoc(doc);
          }
        })
    });
    return ()=> unsubscribe();
  }, [])

  return (
    <div className="bucket-box">
        <p>Enter Bucket Code</p>
        <form>
          <input ref={bucketInputRef} maxLength={4} placeholder='XXXX'/>
          <button type='submit' onClick={(e)=>{
              e.preventDefault();
              setBucketCode(bucketInputRef.current.value);
              console.log("Entered "+ bucketInputRef.current.value);
          }}>Enter</button>
        </form>
    </div>
  )
}

export default Start