import React from 'react';
import HeaderCard from "../components/HeaderCard";

function Header({ bucketCode, setBucketCode }) {
  return (
    <div className="header">
      <div className="logo">
        <h1>FileGlide</h1>
      </div>
      <HeaderCard bucketCode={bucketCode} setBucketCode={setBucketCode} />
    </div>
  )
}

export default Header