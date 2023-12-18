// App.js
import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import Canvas from "./components/Canvas";
import "./App.css"; // Import your CSS file
import CustomModalProvider from "./components/Modal.jsx";
import { setCustomModalRef } from "./services/customModalService.js";

function App() {
  return (
    <CustomModalProvider ref={(ref) => setCustomModalRef(ref)}>
      <div className="app">
        <Canvas />
        <Sidebar />
      </div>
    </CustomModalProvider>
  );
}

export default App;
