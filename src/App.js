import logo from "./logo.svg";
import "./App.css";
// import "./firebase-messaging-sw2";
import { useEffect } from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Test Firebase Cloud Messaging</p>
      </header>
    </div>
  );
}

export default App;
