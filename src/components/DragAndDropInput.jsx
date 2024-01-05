import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const DragAndDropInput = ( props ) => {
  const [isDragActive, setIsDragActive] = useState(false);
  // const [fileNames, setFileNames] = useState([]);
  const fileInputRef = useRef(null);

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragActive(false);

    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInputChange = () => {
    const files = fileInputRef.current.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
   // const names = Array.from(files).map((file) => file.name);
    // setFileNames(names);
    props.onUpload(files); 
  };

  const dropZoneClasses = `drag-and-drop-container ${isDragActive ? 'drag-active' : ''}`;

  return (
    <div className="dropbox">
      <div
        className={dropZoneClasses}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <div className="text-center">
          <FontAwesomeIcon icon={faPlus} size="2x" />
          <br />
          <p className=""><b>Drag and drop files here</b></p>
          <button type="button" className="btn btn-primary">Choose a file</button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="d-none"
          onChange={handleFileInputChange}
          multiple
        />
        
      </div>
    </div>
  );
};

export default DragAndDropInput;
