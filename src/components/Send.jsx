import React, { useState } from "react";


import DragAndDropInput from "./DragAndDropInput";
import Loader from "./Loader";
import Response from "./Response";
function Send(){
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [code, setCode] = useState('');
  const [isUploaded,setIsUploaded] = useState(true);
  const [fileSizeError, setFileSizeError] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  
  const handleFileUpload = async (files) => {
    
    const formData = new FormData();
    const maxSize = 100 * 1024 * 1024;
    let totalSize = 0;
    Array.from(files).forEach((file) => {
      totalSize += file.size;
      formData.append('file', file);
    });
    if (totalSize > maxSize) {
      
      
        setIsLoading(true);
      
      setFileSizeError(true);
       //console.error("File size exceeds the limit (10MB)");
       setIsLoading(false);
      // return;
    }else{
    setIsLoading(true)
    try {
      
      setFileSizeError(false)
      const response = await fetch('/upload/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      
      setCode(data.unique_code);
      setIsUploaded(false);
      
    } catch (error) {
      // console.error(error);
    }
  setIsLoading(false);}
    
    
    
    
    const fileArray = Array.from(files);
    setUploadedFiles(fileArray);
  };

  return (
    <div>
    
    {isUploaded ? <DragAndDropInput onUpload={handleFileUpload} />: <Response uploadedFiles={uploadedFiles} code={code} /> }
    {isLoading&&<Loader />}
    {fileSizeError && <div className="d-flex justify-content-center"><div className="alert alert-danger text-center mt-2 w-50" role="alert">
  Total data size should be less than 100 mb
</div></div>}


    
    
    
      
    </div>

  );
}
export default Send;
