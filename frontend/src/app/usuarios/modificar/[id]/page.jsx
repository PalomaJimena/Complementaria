"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ModificarUsuario({ params }) {
    const router = useRouter();
    const { id } = params;
    const [usuario, setUsuario] = useState({ nombre: "", password: "", usuario: "" });

    useEffect(() => {
        axios
            .get(`http://localhost:3000/usuarios/mostrar/${id}`)
            .then((response) => setUsuario(response.data))
            .catch((error) => console.error("Error al obtener usuario:", error));
    }, [id]);

    const modificarUsuario = async (e) => {
        e.preventDefault();
        const url = `http://localhost:3000/usuarios/modificar/${id}`;

        try {
            await axios.put(url, usuario);
            router.push("/usuarios/mostrar");
        } catch (error) {
            console.error("Error al modificar el usuario:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="m-0 row justify-content-center" style={{ backgroundColor: "#FFF0F5", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
            <form onSubmit={modificarUsuario} className="col-6 mt-5">
                <div className="card shadow-lg p-4 rounded-4" style={{ backgroundColor: "#FFEBF2" }}>
                    <div className="card-header text-center" style={{ backgroundColor: "#FFB6C1", color: "#6A1B9A" }}>
                        <h1 style={{ fontWeight: "bold" }}>Modificar Usuario</h1>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label" style={{ color: "#C71585", fontSize: "1.2rem" }}>
                                Nombre
                            </label>
                            <input
                                className="form-control rounded-3"
                                id="nombre"
                                required
                                type="text"
                                value={usuario.nombre}
                                onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
                                style={{
                                    borderColor: "#FF69B4",
                                    backgroundColor: "#FFF0F5",
                                    color: "#6A1B9A",
                                    padding: "12px",
                                    fontSize: "16px",
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label" style={{ color: "#C71585", fontSize: "1.2rem" }}>
                                Contraseña
                            </label>
                            <input
                                className="form-control rounded-3"
                                id="password"
                                required
                                type="password"
                                value={usuario.password}
                                onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
                                style={{
                                    borderColor: "#FF69B4",
                                    backgroundColor: "#FFF0F5",
                                    color: "#6A1B9A",
                                    padding: "12px",
                                    fontSize: "16px",
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="usuario" className="form-label" style={{ color: "#C71585", fontSize: "1.2rem" }}>
                                Usuario
                            </label>
                            <input
                                className="form-control rounded-3"
                                id="usuario"
                                required
                                type="text"
                                value={usuario.usuario}
                                onChange={(e) => setUsuario({ ...usuario, usuario: e.target.value })}
                                style={{
                                    borderColor: "#FF69B4",
                                    backgroundColor: "#FFF0F5",
                                    color: "#6A1B9A",
                                    padding: "12px",
                                    fontSize: "16px",
                                }}
                            />
                        </div>
                    </div>
                    <div className="card-footer">
                        <center>
                            <button
                                className="btn w-100 rounded-3"
                                type="submit"
                                style={{
                                    backgroundColor: "#FF69B4",
                                    color: "#FFF",
                                    fontSize: "1.2rem",
                                    padding: "10px",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                Guardar Cambios
                            </button>
                        </center>
                    </div>
                </div>
            </form>
        </div>
    );
}
