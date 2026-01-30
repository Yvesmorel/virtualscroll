import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ElegantGallery from "./components/galery";
import { firstData, firstBottomBuffer } from "./data";
function App() {
  return (
    <div >
      <ElegantGallery items={firstData} />

    </div>
  );
}

export default App;
