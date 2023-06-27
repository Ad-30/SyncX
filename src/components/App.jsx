import React, { useState } from "react";
import Header from "./Header";

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
    <Header handleIsSend={handleSend}/>
    
    {isSend?<Send />:<Receive />}
    
      
    </div>

  );
}
export default App;
