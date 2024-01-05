import React, { useState } from 'react';
import axios from 'axios';
import ReceiveForm from './ReceiveForm';
import ReceiveFileList from './ReceiveFileList';
import Loader from './Loader';

const Receive = () => {
  const [code, setCode] = useState('');
  const [receivedFiles, setReceivedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNoFile, setIsNoFile] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isReceivedFiles,setIsReceivedFiles] = useState(false);
  const [isDownloading,setIsDownloading] = useState(false);
  const handleCodeChange = (event) => {
    const uppercaseValue = event.target.value.toUpperCase();
    setCode(uppercaseValue);
  };

  const handleReceive = () => {
    setIsLoading(true);
    setIsNoFile(false);
    axios
      .get(`https://ad30.pythonanywhere.com/download/${code}/`)
      .then((response) => {
        const files = response.data;
        if (Array.isArray(files)) {
          setIsReceivedFiles(true);
          setReceivedFiles(files);
        } else {
          setErrorMessage(response.error);
          
        }
      })
      .catch((error) => {
        setIsNoFile(true);
        setIsReceivedFiles(false);
        setErrorMessage('Invalid Code');
      })
      .finally(() => {
      
        setIsLoading(false);
        
      });
      
     
  };

  const handleDownload = (file) => {
    setIsLoading(true);
    setIsDownloading(true);
   // const file_path = file.path;
    const file_name = file.name;
    axios({
      url: `https://ad30.pythonanywhere.com/download/${code}/${file_name}/`,
      method: 'GET',
      responseType: 'blob',
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file_name);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        setIsNoFile(true);
        setIsReceivedFiles(false);
        setErrorMessage('Error Downloading File, Resend again');
      })
      .finally(() => {
        setIsLoading(false);
        setIsDownloading(false);
      });
      setIsLoading(false);
  };
  const handleDownloadAll = (files) => {
    setIsLoading(true);
    setIsDownloading(true);
    files.forEach(file => {
      //const file_path = file.path;
    const file_name = file.name;
    axios({
      url: `https://ad30.pythonanywhere.com/download/${code}/${file_name}/`,
      method: 'GET',
      responseType: 'blob',
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file_name);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        setIsNoFile(true);
        setIsReceivedFiles(false);
        setErrorMessage('Error Downloading File, Resend again');
      })
      .finally(() => {
        setIsLoading(false);
        setIsDownloading(false);
      });
    });
    setIsLoading(false);
  }
return (
  <div className="container mt-1">
    <h2 className="mt-4 mb-3">Receive Files</h2>
    <ReceiveForm code={code} handleCodeChange={handleCodeChange} handleReceive={handleReceive} />
    {isNoFile && (
      <div className="d-flex justify-content-center">
        <div className="alert alert-danger text-center mt-2 w-50" role="alert">
          {errorMessage}
        </div>
      </div>
    )}
    {isLoading && <Loader />}
    {isReceivedFiles && <ReceiveFileList receivedFiles={receivedFiles} handleDownload={handleDownload} handleDownloadAll={handleDownloadAll} />}
    {isDownloading&&<Loader />}
  </div>
);
};


export default Receive;
