import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./Home.jsx";
import AltaPersona from "./personas/AltaPersona.jsx";
import ListadoPersonas from "./personas/ListadoPersonas.jsx";
import EditarPersona from "./personas/EditarPersona.jsx"
import VerPersona from "./personas/VerPersona.jsx";
import AltaCategoria from "./categorias/AltaCategoria.jsx";
import ListadoCategorias from "./categorias/ListadoCategorias.jsx";
import VerCategoria from "./categorias/VerCategoria.jsx";
import AltaLibro from "./libros/AltaLibro.jsx";
import ListadoLibros from "./libros/ListadoLibros.jsx";
import VerLibro from "./libros/VerLibro.jsx"
import EditarLibro from "./libros/EditarLibro.jsx";
import PrestarLibro from "./libros/PrestarLibro.jsx";


function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path = "/" component = {Home}/>
        <Route exact path = "/persona/agregar" component = {AltaPersona} />
        <Route exact path = "/personas/listado" component = {ListadoPersonas} />
        <Route exact path = "/personas/editar/:id" component = {EditarPersona} />
        <Route exact path = "/personas/ver/:id" component = {VerPersona} />
        <Route exact path = "/categoria/agregar" component = {AltaCategoria} />
        <Route exact path = "/categorias/listado" component = {ListadoCategorias} />
        <Route exact path = "/categorias/ver/:id" component = {VerCategoria} />
        <Route exact path = "/libro/agregar" component = {AltaLibro} />
        <Route exact path = "/libros/listado" component = {ListadoLibros} />
        <Route exact path= "/libros/ver/:id" component = {VerLibro} />
        <Route exact path = "/libros/editar/:id" component = {EditarLibro} />
        <Route exact path = "/libros/prestar/:id" component = {PrestarLibro} />
      </Router>
    </div>
  );
}

export default App;
