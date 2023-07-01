import React, { useState } from 'react';

const Navbar = (props) => {
  const [isSend, setIsSend] = useState(true);

  function isSendFun() {
    var res;
    if (isSend === true) {
      setIsSend(false);
      res = false;
    } else {
      setIsSend(true);
      res = true;
    }
    props.handleIsSend(res);
  }

  return (
    <>
      <nav>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i className="fas fa-bars"></i>
        </label>
        <label className="logo">Share</label>
        <ul className="navul">
          <li>
            <a className="active" href="#" onClick={isSendFun}>
              {isSend ? 'Receive' : 'Send'}
            </a>
          </li>
        </ul>
      </nav>
      <div className="mt-2 d-flex justify-content-center">
        <button className="btn btn-primary d-sm-none" onClick={isSendFun}>
          {isSend ? 'Receive' : 'Send'}
        </button>
      </div>
    </>
  );
};

export default Navbar;
