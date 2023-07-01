import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const ReceiveFileList = ({ receivedFiles, handleDownload, handleDownloadAll }) => {
  
  return (
    <div>
      <h3 className="mb-3">Received Files:</h3>
      <ul  className="list-group" id='received' >
        {receivedFiles.map((file, index) => (
          <li  key={index} className="list-group-item d-flex align-items-center">
            <span className="mr-auto">{file.name}</span>
            <button onClick={() => handleDownload(file)} className="btn btn-success btn-sm ml-2">
              <FontAwesomeIcon icon={faDownload} className="mr-1" />
            </button>
          </li>
        ))}
        <button onClick={() => handleDownloadAll(receivedFiles)} className="btn btn-success btn-sm ml-2">
          Download All
        </button>
      </ul>
    </div>
  );
};

export default ReceiveFileList;