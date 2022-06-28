import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from '../src/Components/Landing/landing';
import Home from '../src/Components/Home/home';
import DogCreate from '../src/Components/CreateDog/CreateDog';
import Detail from '../src/Components/Detail/detail'

function App() {
  // Route es un proceso en el que se dirige a un usuario a 
  //diferentes páginas en función de su acción o solicitud
  /*Renderizamos los componentes para cada ruta*/
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route exact path="/home" element={<Home />}/>
      <Route exact path="/home/:id" element={<Detail />}/>
      <Route exact path="/home/createDog" element={<DogCreate/>}/>
      </Routes>

    </div>
  );
}

export default App;
