
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/Login/SignIn';
function App() {
  
  return (
    <Router>
    <div className="App">
      
      
      <Routes>
      <Route exact path="/Home" element={<Home/>}/>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/signin" element={<SignIn/>}/>
 </Routes>
    </div>
    </Router>
  );
}

export default App;
