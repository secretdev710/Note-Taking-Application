import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import AddNote from './components/AddNote';
import Profile from './components/Profile';
import NoteState from './context/notes/NoteState';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <NavBar />
        <Alert alert={alert} />
        <div className="container sm:m-auto">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/addnote" element={<AddNote />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />
            <Route exact path="/profile" element={<Profile showAlert={showAlert} />} />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
