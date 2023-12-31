import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const FileUploader = ({ onFileSelect }) => {
  const [highlight, setHighlight] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setHighlight(true);
  };

  const handleDragLeave = () => {
    setHighlight(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setHighlight(false);
    const files = e.dataTransfer.files;
    onFileSelect(files);
  };

  const handleInputChange = (e) => {
    const files = e.target.files;
    onFileSelect(files);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className={`file-uploader ${highlight ? 'highlight' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file" multiple
        onChange={handleInputChange}
        className="file-input"
        ref={fileInputRef}
      />
      <div className="upload-icon">
        <button onClick={handleBrowseClick} className="browse-button">
          <i className="fas fa-cloud-upload-alt"></i>
          <p>
          Drag and drop files here or <br />
          Click to browse</p>
        </button>
      </div>
    </div>
  );
};

FileUploader.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
};

export default FileUploader;
