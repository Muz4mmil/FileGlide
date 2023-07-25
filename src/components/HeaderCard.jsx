import React from 'react'

function HeaderCard({bucketCode, setBucketCode}) {
  return (
    <div className='header-card'>
        <div className="card-label">Bucket Code</div>
        <div className="bucket-code">{bucketCode}</div>
        <button className="exit" onClick={()=> setBucketCode(null)}><i class="fa-solid fa-right-from-bracket"></i></button>
    </div>
  )
}

export default HeaderCard