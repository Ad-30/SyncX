import React, { useState } from "react";
import Navbar from "./Navbar";
import Send from "./Send";
import Receive from "./Receive"; 
function App(){
  const [isSend,setIsSend] = useState(true);
  function handleSend(res){
    if(res === false){
      setIsSend(false);
    }else{
      setIsSend(true);
    }

  }

  return (
    <div>
    <Navbar handleIsSend={handleSend}/>
    
    {isSend?<Send />:<Receive />}
    
      
    </div>

  );
}
export default App;
