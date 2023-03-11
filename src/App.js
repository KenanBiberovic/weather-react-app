import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Weather from "./components/weather";

function App() {
  return (
    <div className="container">
      <Weather />
    </div>
  );
}

export default App;
