import React from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import swal from "sweetalert";

export default function EditarLibro(props){

    const params = useParams();
    const listado = useSelector((state) => state.libros);
    const [formulario, setFormulario] = React.useState({
        nombre: "",
        descripcion: "",
        categoria_id: ""
    });

    const listadoLibros = listado.find((unLibro) => unLibro.id == params.id);

    const cambioDescripcion = (e) => {
        const nuevoFormulario = JSON.parse(JSON.stringify(formulario));
        nuevoFormulario.descripcion = e.target.value;
        setFormulario(nuevoFormulario);
    }

    const editarLibro = async () => {
        try{
            await axios.put("http://localhost:3000/api/libro/" + params.id, formulario);

            swal("YAY!", "El libro fue editado con éxito!", "success");

            props.history.push("/libros/listado");
        }
        catch(e){
            swal("Oops!", e.response.data, "error");
        }
    }

    return(
        <div>
            <div>
                <h1 class="title-secondary">Editar libro:</h1>
            </div>
            <div class="form">
                <label>Nombre:</label> <br />
                <input type="text" placeholder={listadoLibros.nombre} disabled="disabled"/> <br />
                <small>(*) El nombre no puede ser modificado</small> <br />
                <label>Descripción:</label> <br />
                <input type="text" placeholder={listadoLibros.descripcion} value={formulario.descripcion} onChange={cambioDescripcion}/> <br />
                <label>Categoría:</label> <br />
                <input type="text" placeholder={listadoLibros.categoria_id} disabled="disabled"/> <br />
                <small>(*) La categoría no puede ser modificada</small> <br />
                <div class="center-bottom">
                    <button type="button" className="btn btn-primary" onClick={editarLibro}>Guardar</button>
                    <Link to={"/libros/listado"}><button type="button" className="btn btn-secondary">Cancelar</button></Link>
                </div>
            </div>
        </div>
    );
}