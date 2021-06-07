import React from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import swal from "sweetalert";

export default function EditarPersona(props) {

    const params = useParams();
    const listado = useSelector((state) => state.personas);
    const [formulario, setFormulario] = React.useState({
        nombre: "",
        apellido: "",
        email: "",
        alias: ""
    });

    const listadoPersonas = listado.find((unaPersona) => unaPersona.id == params.id);

    const cambioNombre = (e) => {
        const nuevoFormulario = JSON.parse(JSON.stringify(formulario));
        nuevoFormulario.nombre = e.target.value;
        setFormulario(nuevoFormulario);
    };

    const cambioApellido = (e) => {
        const nuevoFormulario = JSON.parse(JSON.stringify(formulario));
        nuevoFormulario.apellido = e.target.value;
        setFormulario(nuevoFormulario);
    };

    const cambioAlias = (e) => {
        const nuevoFormulario = JSON.parse(JSON.stringify(formulario));
        nuevoFormulario.alias = e.target.value;
        setFormulario(nuevoFormulario);
    };

    const editarPersona = async () => {
        try{
            await axios.put("http://localhost:3000/api/persona/" + params.id, formulario);

            swal("YAY", "Persona editada con éxito!", "success");

            props.history.push("/personas/listado");
        }
        catch(e){
            swal("Oops!", e.response.data, "error");
        }
    };

    return(
        <div>
            <div>
                <h1 class="title-secondary">Editar persona:</h1>
            </div>
            <div class="form">
                <label>Nombre:</label> <br />
                <input type="text" placeholder={listadoPersonas.nombre} value={formulario.nombre} onChange={cambioNombre}/> <br />
                <label>Apellido:</label> <br />
                <input type="text" placeholder={listadoPersonas.apellido} value={formulario.apellido} onChange={cambioApellido}/> <br />
                <label>E-mail:</label> <br />
                <input type="text" placeholder={listadoPersonas.email} disabled="disabled"/> <br />
                <small>(*) El e-mail no puede ser modificado.</small> <br />
                <label>Alias:</label> <br />
                <input type="text" placeholder={listadoPersonas.alias} value={formulario.alias} onChange={cambioAlias}/> <br />            
                <div class="center-bottom">
                    <button type="button" className="btn btn-primary" onClick={editarPersona}>Guardar</button>
                    <Link to={"/personas/listado"}><button type="button" className="btn btn-secondary">Cancelar</button></Link>
                </div>
            </div>
        </div>
    );
}