import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from '../src/Components/Landing/landing';
import Home from '../src/Components/Home/home';
import DogCreate from '../src/Components/CreateDog/CreateDog';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route exact path="/home" element={<Home />}/>
      <Route exact path="/home/createDog" element={<DogCreate/>}/>
      </Routes>

    </div>
  );
}

export default App;
