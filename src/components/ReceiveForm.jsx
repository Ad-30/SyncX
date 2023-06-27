import React from 'react';

const ReceiveForm = ({ code, handleCodeChange, handleReceive }) => {
  return (
    <div>
      <input
        type="text"
        value={code}
        onChange={handleCodeChange}
        className="form-control"
        placeholder="Enter code"
      />
      <button onClick={handleReceive} className="btn btn-primary mt-2">
        Receive
      </button>
    </div>
  );
};

export default ReceiveForm;
