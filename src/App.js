import "./App.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./component/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import AddContact from "./component/AddContact";
import EditContact from "./component/EditContact";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/add" element={<AddContact />}></Route>
        <Route path="/edit/:id" element={<EditContact />}></Route>
      </Routes>
    </div>
  );
}

export default App;
