import React, { useEffect, useState } from 'react';
import FileItem from './FileItem';
import FileUploader from './FileUploader';
import {db, storage} from '../firbase-config'
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

function Files({bucketCode}) {

  const [files, setFiles] = useState([])
  const [newFiles, setNewFiles] = useState([]);

  const filesRef = collection(db, "files");

  const handleFileUpload = async () => {

    for (let i = 0; i < newFiles.length; i++) {

      const newFile = newFiles[i];
      console.log('fileSelected ' + newFile.name);
  
      const storageRef = ref(storage, newFile.name);
      // const storageRef = ref(storage, bucketCode + '/' + newFile.name);
  
      const uploadTask = await uploadBytesResumable(storageRef, newFile);
  
      uploadTask.task.on('state_changed',
        (snapshot) => {

        },
        (error) => {
          console.log(error);
        },
        (snapshot) => {
          getDownloadURL(uploadTask.task.snapshot.ref).then((downloadURL) => {
            console.log('newFile available at', downloadURL);
            
            let date = new Date();

            addDoc(filesRef, {
              name: newFile.name,
              size: newFile.size,
              type: newFile.type,
              uploadedAt: serverTimestamp(),
              uploadDate: {
                date: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear()
              },
              bucket: bucketCode,
              url: downloadURL
            });
          });
        }
      );
      
    }
  };

  const handleFileSelect = (files) => {
    if (files) {
      console.log('fileSelected' + files.name);
      setNewFiles(files);
    }
  }

  useEffect(() => {
    if (newFiles) {
      handleFileUpload(newFiles);
    }
  }, [newFiles]);


  useEffect(()=>{
    const queryFiles = query(filesRef, where('bucket', '==', bucketCode), orderBy("uploadedAt", "desc"));
    const unsubscribe = onSnapshot(queryFiles, (snapshot)=>{
        let files = [];
        snapshot.forEach((doc) =>{
            files.push({...doc.data(), id: doc.id})
        })
        setFiles(files)
    })
    // I don't know what's happening in this block
    return ()=> unsubscribe();
  }, [])

  return (
    <div className="files animate__animated animate__slideInLeft animate__faster">
      <p>Files</p>
      <div className="files-list">
        {
          files.map((file, index) => <FileItem key={index} name={file.name} size={file.size} url={file.url}/>)
        }
      </div>

      <FileUploader onFileSelect={handleFileSelect} />
    
    </div>
  )
}

export default Files;
