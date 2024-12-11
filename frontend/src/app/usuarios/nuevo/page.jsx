"use client";

import axios from "axios";

async function guardarUsuario(e) {
    e.preventDefault();
    console.log("Estas en guardarUsuario");
    const url = "http://localhost:3000/usuarios/nuevo";
    const datos = {
        nombre: document.getElementById("nombre").value,
        usuario: document.getElementById("usuario").value,
        password: document.getElementById("password").value
    };

    try {
        await axios.post(url, datos);
        window.location.href = "http://localhost:3001/usuarios/mostrar";
    } catch (error) {
        console.error("Error al guardar el usuario:", error.response ? error.response.data : error.message);
    }
}

export default function NuevoUsuario() {
    return (
        <div
            className="m-0 row justify-content-center"
            style={{
                backgroundColor: "#FFF0F5",
                minHeight: "100vh",
                fontFamily: "Arial, sans-serif",
                display: "flex",
                alignItems: "center"
            }}
        >
            <form onSubmit={guardarUsuario} className="col-6">
                <div className="card shadow-lg p-4 rounded-4" style={{ backgroundColor: "#FFEBF2" }}>
                    <div className="card-header text-center" style={{ backgroundColor: "#FFB6C1", color: "#6A1B9A" }}>
                        <h1 style={{ fontWeight: "bold" }}>Nuevo Usuario</h1>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label" style={{ color: "#C71585", fontSize: "1.2rem" }}>
                                Nombre Completo
                            </label>
                            <input
                                className="form-control rounded-3"
                                id="nombre"
                                required
                                autoFocus
                                type="text"
                                autoComplete="name"
                                style={{
                                    borderColor: "#FF69B4",
                                    backgroundColor: "#FFF0F5",
                                    color: "#6A1B9A",
                                    padding: "12px",
                                    fontSize: "16px"
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="usuario" className="form-label" style={{ color: "#C71585", fontSize: "1.2rem" }}>
                                Nombre de Usuario
                            </label>
                            <input
                                className="form-control rounded-3"
                                id="usuario"
                                required
                                type="text"
                                autoComplete="username"
                                style={{
                                    borderColor: "#FF69B4",
                                    backgroundColor: "#FFF0F5",
                                    color: "#6A1B9A",
                                    padding: "12px",
                                    fontSize: "16px"
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
                                autoComplete="new-password"
                                style={{
                                    borderColor: "#FF69B4",
                                    backgroundColor: "#FFF0F5",
                                    color: "#6A1B9A",
                                    padding: "12px",
                                    fontSize: "16px"
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
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                Guardar Nuevo Usuario
                            </button>
                        </center>
                    </div>
                </div>
            </form>
        </div>
    );
}
