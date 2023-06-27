import React from "react";
import Timer from "./Timer";

function Response(props) {
  return (
    <div className="container mt-4">
      <div className="response-container">
        <div className="mb-4">
          <h2 className="mb-3">Uploaded Files:</h2>
          <ul className="list-unstyled">
            {props.uploadedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
        {props.code && (
          <div >
            <h2>Share Code:</h2>
            <p className="code-text">{props.code}</p>
          </div>
        )}
      </div>
      <Timer />
    </div>
  );
}

export default Response;
