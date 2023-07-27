import React, { useEffect, useState } from 'react';
import FileItem from './FileItem';
import FileUploader from './FileUploader';
import {db, storage} from '../firbase-config'
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

function Files({bucketCode}) {

  const [files, setFiles] = useState([])
  const [newFile, setNewFile] = useState(null);

  useEffect(() => {
    console.log(bucketCode);
  }, [bucketCode]);

  const filesRef = collection(db, "files");

  const handleFileUpload = async (file) => {
    console.log('fileSelected ' + newFile.name);

    const storageRef = ref(storage, bucketCode + '/' + newFile.name);

    const uploadTask = await uploadBytesResumable(storageRef, newFile);

    uploadTask.task.on('state_changed',
      (snapshot) => {
        
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.task.snapshot.ref).then((downloadURL) => {
          console.log('newFile available at', downloadURL);

          addDoc(filesRef, {
            name: newFile.name,
            size: newFile.size,
            type: newFile.type,
            uploadedAt: serverTimestamp(),
            bucket: bucketCode,
            url: downloadURL
          });
        });
      }
    );
  };

  const handleFileSelect = (file) => {
    if (file) {
      console.log('fileSelected' + file.name);
      setNewFile(file);
    }
  }

  useEffect(() => {
    if (newFile) {
      handleFileUpload(newFile);
    }
  }, [newFile]);


  useEffect(()=>{
    const queryFiles = query(filesRef, where('bucket', '==', bucketCode), orderBy("uploadedAt", "desc"));
    const unsuscribe = onSnapshot(queryFiles, (snapshot)=>{
        let files = [];
        snapshot.forEach((doc) =>{
            files.push({...doc.data(), id: doc.id})
        })
        setFiles(files)
    })
    // I don't know what's happening in this block
    return ()=> unsuscribe();
  }, [])

  return (
    <div className="files animate__animated animate__bounceInLeft animate__faster">
      <p>Files</p>
      <div className="files-list">
        {
          files.map((file) => <FileItem name={file.name} size={file.size} url={file.url}/>)
        }
      </div>

      <FileUploader onFileSelect={handleFileSelect} />
    
    </div>
  )
}

export default Files;