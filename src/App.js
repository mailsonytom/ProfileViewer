import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../src/Container/login"
import Dashboard from "./Container/Dashboard"
import DummyPage from "./Container/dummypage"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dummypage" element={<DummyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
