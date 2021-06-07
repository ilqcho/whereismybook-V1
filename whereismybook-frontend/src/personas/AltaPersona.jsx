import React from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import swal from "sweetalert";
import { Link } from 'react-router-dom';

export default function AltaPersona(props){
    const [formulario, setFormulario] = React.useState({
        nombre: "",
        apellido: "",
        alias: "",
        email: "",
        id: ""
    })

    const dispatch = useDispatch();

    const cambioNombre = (e) => {
        const nuevoFormulario = JSON.parse(JSON.stringify(formulario));
        nuevoFormulario.nombre = e.target.value;
        setFormulario(nuevoFormulario)
    };

    const cambioApellido = (e) => {
        const nuevoFormulario = JSON.parse(JSON.stringify(formulario));
        nuevoFormulario.apellido = e.target.value;
        setFormulario(nuevoFormulario)
    };

    const cambioAlias = (e) => {
        const nuevoFormulario = JSON.parse(JSON.stringify(formulario));
        nuevoFormulario.alias = e.target.value;
        setFormulario(nuevoFormulario)
    };

    const cambioEmail = (e) => {
        const nuevoFormulario = JSON.parse(JSON.stringify(formulario));
        nuevoFormulario.email = e.target.value;
        setFormulario(nuevoFormulario)
    };

    const cancelarCambios = () => {
        props.history.push("/personas/listado");
    };

    const guardarCambios = async () => {
        try{
            const respuesta = await axios.post("http://localhost:3000/api/persona", formulario);
            
            dispatch({
                type: "AGREGAR_PERSONA", 
                persona: respuesta.data
            });

            swal("YAY!", "Persona agregada", "success");

            props.history.push("/personas/listado");
        }
        catch(e){
            swal("Oops!", e.response.data, "error");
        }
    };

    return(
        <div>
            <div>
                <h1 class="title-secondary">Agregar persona:</h1>
            </div>
            <div class="form" id="form-register_people">
                <label>Nombre:</label>
                <input type="text" placeholder="Nombre" value={formulario.nombre} onChange={cambioNombre}/>
                <label>Apellido:</label>
                <input type="text" placeholder="Apellido" value={formulario.apellido} onChange={cambioApellido}/>
                <label>Alias:</label>
                <input type="text" placeholder="Alias" value={formulario.alias} onChange={cambioAlias}/>
                <label>E-mail:</label>
                <input type="text" placeholder="E-mail"value={formulario.email} onChange={cambioEmail}/>
                <div class="center-bottom">
                    <button type="button" className="btn btn-primary" onClick={guardarCambios}>Guardar</button>
                    <button type="button" className="btn btn-secondary" onClick={cancelarCambios}>Cancelar</button> 
                </div>
            </div>
            <div class="center-bottom">
                <Link class="link" to="/personas/listado"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                </svg> Volver al listado de personas</Link>
            </div>
        </div>
    );
}
