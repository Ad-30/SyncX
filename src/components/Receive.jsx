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

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleReceive = () => {
    setIsLoading(true);
    setIsNoFile(false);
    axios
      .get(`http://localhost:8000/download/${code}/`)
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
   // const file_path = file.path;
    const file_name = file.name;
    axios({
      url: `http://localhost:8000/download/${code}/${file_name}/`,
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
      });
      setIsLoading(false);
  };
  const handleDownloadAll = (files) => {
    setIsLoading(true);
    files.forEach(file => {
      //const file_path = file.path;
    const file_name = file.name;
    axios({
      url: `http://localhost:8000/download/${code}/${file_name}/`,
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
      });
    });
    setIsLoading(false);
  };

//   return (
//     <div className="container">
//       <h2 className="mt-4 mb-3">Receive Files</h2>
//       <div className="mb-3">
//         <input
//           type="text"
//           value={code}
//           onChange={handleCodeChange}
//           className="form-control"
//           placeholder="Enter code"
//         />
//         <button onClick={handleReceive} className="btn btn-primary mt-2">
//           Receive
//         </button>
//       {isNoFile&&<div className="d-flex justify-content-center"><div className="alert alert-danger text-center mt-2 w-50" role="alert">
//   {errorMessage}
// </div></div>}
//         {isLoading&&<Loader />}
        
//       </div>
    
//       {receivedFiles.length > 0 && (
//         <div>
//           <h3 className="mb-3">Received Files:</h3>
//           <ul className="list-group">
          
//             {receivedFiles.map((file, index) => (
//               <li key={index} className="list-group-item d-flex align-items-center">
//                 <span className="mr-auto">{file.name}</span>
//                 <button onClick={() => handleDownload(file)} className="btn btn-success btn-sm ml-2">
//                   <FontAwesomeIcon icon={faDownload} className="mr-1"/>
//                 </button>
//               </li>
//             ))}
//             <button onClick={() => handleDownloadAll(receivedFiles)} className="btn btn-success btn-sm ml-2">
//                   {/* <FontAwesomeIcon icon={faDownload} className="mr-1"/> */}
//                   Download All
//                 </button>
//           </ul>
          
//         </div>
        
//       )}
      
//     </div>
//   );
// };
return (
  <div className="container">
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
  </div>
);
};


export default Receive;
