import React, { useState } from "react";
function Header(props){
  const [isSend,setIsSend] = useState(true);
  function isSendFun(){
    var res;
    if (isSend === true){
      setIsSend(false);
       res = false
    }else{
      setIsSend(true);
       res = true
    }
    
    props.handleIsSend(res);
  }
  return (
    <>
    <header>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="/">Share</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
       
        <li className="nav-item">
         
          <button className="nav-link" onClick={isSendFun}>{isSend?"Receive":"Send"}</button>
        </li>
      </ul>
    </div>
  </nav>
  </header>
<div className="mt-2 d-flex justify-content-center"><button className="btn btn-primary d-sm-none" onClick={isSendFun}>{isSend?"Receive":"Send"}</button></div>
</>
);
}

export default Header;
