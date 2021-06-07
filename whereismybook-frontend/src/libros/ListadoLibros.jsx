import '../App.css';
import React from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import swal from "sweetalert";

export default function ListadoLibros(props){

    const dispatch = useDispatch();
    const listado = useSelector ((state) => state.libros);

    React.useEffect(async () => {
        try{
            const respuesta = await axios.get("http://localhost:3000/api/libro");

            dispatch({
                type: "LISTADO_LIBROS",
                listado: respuesta.data
            });
        }
        catch(e){
            swal("Oops!", e.response.data, "error");
        }
    }, []);

    const eliminarLibro = async (idAEliminar) => {
        try{
            const eliminando = await swal({
                title: "¿Eliminar libro?",
                text: "Una vez eliminado, no se podrá recuperar!",
                icon: "warning",
                buttons: ["Cancelar", "Sí, eliminar!"],
                dangerMode: true,
            });
            if(eliminando){
                await axios.delete("http://localhost:3000/api/libro/" + idAEliminar);

                dispatch({
                    type: "ELIMINAR_LIBRO",
                    idLibroAEliminar: idAEliminar
                });

                swal("Poof!", "Libro eliminado con éxito", "success");
            }

        }
        catch(e){
            swal("Oops!", e.response.data, "error");
        }
    };

    const prestarLibro = async (libroId, personaId) => {

        if(personaId == null){
            props.history.push("/libros/prestar/" + libroId);

        }else{
            swal("Oops!", "El libro ya se encuentra prestado", "error");
        }

    }

    const devolverLibro = async (libroId, personaId) => {

        if(personaId != null){
            try{
                await axios.put("http://localhost:3000/api/libro/devolver/" + libroId);

                swal("BAM!", "El libro ya se encuentra disponible!", "info");

                props.history.push("/libros/listado");
            }
            catch(e){
                swal("Oops!", "Error inesperado", "error");
            }

        }else{
            swal("Oops!", "El libro no se encuentra prestado", "error");
        }


    }

    return(
        <div>
            <div>
                <h1 class="title-secondary">Listado de libros:</h1>
            </div>
            <div>
                <div class="center-top">
                    <Link class="link" to={"/libro/agregar"}>Agregar libro <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg></Link>
                </div>
                <table class="table-list">
                    <thead>
                        <tr>
                            <th class="table__head">ID</th>
                            <th class="table__head">Nombre</th>
                            <th class="table__head"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listado.map((unLibro) =>
                            unLibro ? (
                                <tr key={unLibro.id}>
                                    <td class="table__data">{unLibro.id}</td>
                                    <td class="table__data">{unLibro.nombre}</td>
                                    <td class="table__data">
                                        <div class="btn-list">
                                            {/* Icono ver */}
                                            <Link to={"/libros/ver/" + unLibro.id}><button title="Ver libro" type="button" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                            </svg></button></Link>
                                            {/* Icono prestar */}
                                            <button title="Prestar libro" type="button" class="btn btn-success" onClick={() => prestarLibro(unLibro.id, unLibro.persona_id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-check-fill" viewBox="0 0 16 16">
                                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z"/>
                                            </svg></button>
                                            {/* Icono devolver */}
                                            <Link to={"/libros/ver/" + unLibro.id}><button title="Devolver libro" type="button" class="btn btn-warning" onClick={() => devolverLibro(unLibro.id, unLibro.persona_id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-x-fill" viewBox="0 0 16 16">
                                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708z"/>
                                            </svg></button></Link>
                                            {/* Icono eliminar */}
                                            <button title="Eliminar libro" type="button" class="btn btn-danger" onClick={() => eliminarLibro(unLibro.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                            </svg></button>
                                        </div>
                                    </td>
                                </tr>
                            ) : null
                        )}
                    </tbody>
                </table>
            </div>
            <div class="center-bottom">
                <Link class="link" to={"/"}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                </svg> Ir al inicio</Link>
            </div>
        </div>
    );
};