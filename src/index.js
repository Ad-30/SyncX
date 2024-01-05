import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./components/App";
document.title = 'SyncX';
const rootElement = document.getElementById('root');

createRoot(rootElement).render(<App />);


// ReactDOM.render(<App />, document.getElementById("root"));
