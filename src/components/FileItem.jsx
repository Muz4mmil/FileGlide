import React from 'react'

function FileItem({index, name, size, url}) {

  const handleDownload = ()=>{
    if(url){
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = name;
      downloadLink.target = '_blank'
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }

  return (
    <div key={index} className="file-item animate__animated animate__fadeInUp animate__faster">
          <i className="fa-solid fa-file"></i>
          <div className="file-details">
            <div className="name">{name}</div>
            <div className="size">{Math.round((size/1048576) * 100) / 100} MB</div>
          </div>
          <div className="file-btns">
            <div className="download" onClick={handleDownload}><i className="fa-solid fa-arrow-down"></i></div>
          </div>
    </div>
  )
}

export default FileItem