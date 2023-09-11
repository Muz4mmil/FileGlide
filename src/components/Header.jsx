import React from 'react';
import HeaderCard from "../components/HeaderCard";

function Header({ bucketCode, setBucketCode }) {
  return (
    <div className="header animate__animated animate__fadeIn">
      <div className="logo">
        <h1>FileGlide</h1>
        {/* <span>BETA</span> */}
      </div>
      <HeaderCard bucketCode={bucketCode} setBucketCode={setBucketCode} />
    </div>
  )
}

export default Header