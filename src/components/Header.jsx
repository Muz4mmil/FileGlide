import React from 'react';
import HeaderCard from "../components/HeaderCard";

function Header({ bucketCode, setBucketCode }) {
  return (
    <div className="header animate__animated animate__fadeIn">
      <div className="logo">
        <h1>FileGlide</h1>
        {/* <span>BETA</span> */}
      </div>
      {/* <HeaderCard bucketCode={bucketCode} setBucketCode={setBucketCode} /> */}
      <div className='header-card'>
        <div className="card-label">Bucket Code</div>
        <div className="bucket-code">{bucketCode}</div>
        <button className="exit" onClick={()=> setBucketCode(null)}><i className="fa-solid fa-right-from-bracket"></i></button>
        <button title='Install FileGLide on Your device for faster access' id="install-button" className='install-button' style={{ display: 'none' }}><i className="fa-solid fa-file-arrow-down"></i></button>
      </div>
      <a href="http://muz4mmil.github.io" target="_blank" className='credit credit-in-container'>By @Muzammil</a>
    </div>
  )
}

export default Header