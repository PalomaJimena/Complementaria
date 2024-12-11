"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

export default function MostrarUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [mostrarBuscador, setMostrarBuscador] = useState(false); // El buscador está oculto por defecto
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get("http://localhost:3000/usuarios/mostrar");
                setUsuarios(response.data);
            } catch (error) {
                console.error("Error al cargar los usuarios:", error);
            }
        };

        fetchUsuarios();

        // Obtener el parámetro de búsqueda de la URL
        const nombreBuscado = searchParams.get("nombre");
        if (nombreBuscado) {
            setBusqueda(nombreBuscado);
        } else {
            setBusqueda("");  // Si no hay búsqueda en la URL, restablecer el campo
        }
    }, [searchParams]);

    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
    };

    const eliminarUsuario = async (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            try {
                await axios.delete(`http://localhost:3000/usuarios/borrarUsuario/${id}`);
                setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
                alert("Usuario eliminado correctamente");
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
                alert("Hubo un error al eliminar el usuario");
            }
        }
    };

    const handleEditar = (id) => {
        router.push(`/usuarios/modificar/${id}`);
    };

    // Filtrar usuarios según el término de búsqueda
    const usuariosFiltrados = usuarios.filter((usuario) =>
        usuario.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="container mt-5" style={{ fontFamily: "Arial, sans-serif" }}>
            <h1 className="text-center mb-4" style={{ color: "#C71585", fontWeight: "bold" }}>Lista de Usuarios</h1>

            {/* Botón para ocultar/mostrar el buscador */}
            <button
                className="btn mb-4"
                onClick={() => setMostrarBuscador(!mostrarBuscador)}
                style={{
                    borderRadius: "20px",
                    padding: "10px 25px",
                    fontSize: "16px",
                    backgroundColor: "#FFB6C1",
                    color: "#6A1B9A",
                    border: "none",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
            >
                {mostrarBuscador ? "Ocultar Buscador" : "Mostrar Buscador"}
            </button>

            {/* Campo de búsqueda */}
            {mostrarBuscador && (
                <input
                    className="form-control mb-4"
                    type="text"
                    placeholder="Buscar por nombre del usuario"
                    value={busqueda}
                    onChange={handleBusqueda}
                    style={{
                        borderColor: "#FF69B4",
                        backgroundColor: "#FFF0F5",
                        color: "#6A1B9A",
                        width: "100%",
                        padding: "12px",
                        fontSize: "16px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                />
            )}

            <div className="card shadow-lg p-4 rounded-4" style={{ backgroundColor: "#FFF0F5" }}>
                <div className="card-body">
                    <table className="table table-borderless text-center" style={{ color: "#6A1B9A" }}>
                        <thead style={{ backgroundColor: "#FFB6C1", color: "#6A1B9A" }}>
                            <tr>
                                <th>Num</th>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Usuario</th>
                                <th>Eliminar</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosFiltrados.length === 0 && busqueda ? (
                                <tr>
                                    <td colSpan="6" style={{ color: "#9C27B0" }}>No se encontraron usuarios con el nombre "{busqueda}"</td>
                                </tr>
                            ) : (
                                usuariosFiltrados.map((usuario, index) => (
                                    <tr key={usuario.id}>
                                        <td>{index + 1}</td>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.usuario}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm rounded-3"
                                                style={{
                                                    backgroundColor: "#F06292",
                                                    color: "#fff",
                                                    padding: "8px 12px",
                                                    border: "none",
                                                }}
                                                onClick={() => eliminarUsuario(usuario.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm rounded-3"
                                                style={{
                                                    backgroundColor: "#BA68C8",
                                                    color: "#fff",
                                                    padding: "8px 12px",
                                                    border: "none",
                                                }}
                                                onClick={() => handleEditar(usuario.id)}
                                            >
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
