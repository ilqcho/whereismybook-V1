import '../App.css';
import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

export default function VerLibro(props){

    const dispatch = useDispatch();
    const params = useParams();
    const lista_libros = useSelector((state) => state.libros);
    const personas = useSelector((state) => state.personas);
    const categorias = useSelector((state) => state.categorias);
    const [libros, setLibros] = React.useState({});

    React.useEffect(async () => {
        if(!lista_libros || lista_libros.length == 0) return;

        setLibros(lista_libros.find((unItem) => unItem.id == params.id));

    }, [params, lista_libros]);

    React.useEffect(async () => {
        try{
            const respuesta = await axios.get("http://localhost:3000/api/categoria");

            dispatch({
                type: "LISTADO_CATEGORIAS",
                listado: respuesta.data
            });

            const respuesta2 = await axios.get("http://localhost:3000/api/persona");

            dispatch({
                type: "LISTADO_PERSONAS",
                listado: respuesta2.data
            });
        }
        catch(e){
            swal("Oops!", e.response.data, "error");
        }
    }, []);

    return(
        <div>
            <div>
                <h1 class="title-secondary">Detalle del libro:</h1>
            </div>
            <div>
                <table class="card" id="card-ver_libro">
                    <tr>
                        <td>
                            <ul>
                                <li>Nombre: {libros.nombre}</li>
                                <li>Descripción: {libros.descripcion}</li>
                                {categorias.map((unItem) =>
                                    unItem.id == libros.categoria_id ? (
                                        <li>Categoría: {unItem.nombre} </li>
                                    ) : null
                                )}
                                {libros.persona_id ? <li>Prestado: Sí
                                    {personas.map((unItem) =>
                                        unItem.id == libros.persona_id ? (
                                            <p>Libro prestado a {unItem.alias}</p> 
                                        ): null
                                    )} </li>
                                : <li>Prestado: No</li>}
                            </ul>
                        </td>
                    </tr>
                </table>
            </div>
            <div>
                <Link class="center-bottom" to={"/libros/editar/" + params.id}><button type="button" className="btn btn-primary">Editar</button></Link> <br /> <br />
            </div>
            <div class="center-bottom">
                <Link class="link" to={"/libros/listado"}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                </svg> Volver al listado de libros</Link>
            </div>
        </div>
    );
};