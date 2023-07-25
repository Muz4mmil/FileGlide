import React, { useRef } from 'react'

function Start({bucketCode, setBucketCode}) {

  const bucketInputRef = useRef(null)

  return (
    <div className="bucket-box">
        <p>Enter Bucket Code</p>
        <input ref={bucketInputRef} maxLength={4} placeholder='XXXX'/>
        <button onClick={()=>{
            setBucketCode(bucketInputRef.current.value);
            console.log("Entered "+ bucketInputRef.current.value);
        }}>Enter</button>
    </div>
  )
}

export default Start