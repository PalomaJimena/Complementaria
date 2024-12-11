"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function BuscarUsuario() {
    const router = useRouter();
    const [id, setId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (id) {
            // Redirigir al formulario de edición del usuario con el ID
            router.push(`/usuarios/modificar/${id}`);
        }
    };

    return (
        <div className="m-0 row justify-content-center" style={{ backgroundColor: "#FFF0F5", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
            <form onSubmit={handleSubmit} className="col-6 mt-5">
                <div className="card shadow-lg p-4 rounded-4" style={{ backgroundColor: "#FFEBF2" }}>
                    <div className="card-header text-center" style={{ backgroundColor: "#FFB6C1", color: "#6A1B9A" }}>
                        <h1 style={{ fontWeight: "bold" }}>Buscar Usuario para Modificar</h1>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label" style={{ color: "#C71585", fontSize: "1.2rem" }}>
                                ID del Usuario
                            </label>
                            <input
                                className="form-control rounded-3"
                                id="id"
                                required
                                autoFocus
                                type="text"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
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
                                Buscar Usuario
                            </button>
                        </center>
                    </div>
                </div>
            </form>
        </div>
    );
}
