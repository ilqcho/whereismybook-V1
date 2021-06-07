import React from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import swal from "sweetalert";

export default function PrestarLibro(props){

    const params = useParams();
    const [personas, setPersonas] = React.useState([]);
    const [formulario, setFormulario] = React.useState({
        personas_id: ""
    });

    const obtenerPersonas = async () => {
        try{
            const respuesta = await axios.get("http://localhost:3000/api/persona")
            setPersonas(respuesta.data);

        }
        catch(e){
            swal("Oops!", e.response.data, "error");
        }
    };

    //Despues fijarme si anda con el useEffect dentro de la funcion obtenerPersonas
    React.useEffect(() => {
        obtenerPersonas();
    }, []);

    const personaAPrestar = (e) => {
        const nuevoFormulario = JSON.parse(JSON.stringify(formulario));
        nuevoFormulario.persona_id = e.target.value;
        setFormulario(nuevoFormulario);
    };

    const prestarLibro = async () => {
        try{
            await axios.put("http://localhost:3000/api/libro/prestar/" + params.id, formulario);

            swal("BAM!", "El libro fue prestado!", "info");

            props.history.push("/libros/listado");
        }
        catch(e){
            swal("Oops!", e.response.data, "error");
        }
    };

    return(
        <div>
            <div>
                <h1 class="title-secondary">Prestar libro:</h1>
            </div>
            <div class="form" id="form-borrow_book">
                <label>Persona:</label>
                <select name="nombre" onChange={personaAPrestar} required>
                    <option value="">Seleccione una persona</option>
                    {personas
                        ? personas.map((unaPersona) => (
                            <option value={unaPersona.id}>{unaPersona.nombre} {unaPersona.apellido}</option>
                        ))
                        : null}
                </select> <br />
                <div>
                    <button type="button" className="btn btn-primary" onClick={prestarLibro}>Guardar</button>
                    <Link to={"/libros/listado"}><button type="button" className="btn btn-secondary">Cancelar</button></Link>
                </div>
            </div>
        </div>
    );
};