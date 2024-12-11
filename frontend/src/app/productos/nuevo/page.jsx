"use client";

import axios from "axios";

async function guardarProducto(e) {
    e.preventDefault();
    console.log("Estas en guardarProducto");
    const url = "http://localhost:3000/productos/nuevo";
    const datos = {
        nombre: document.getElementById("nombre").value,
        precio: parseFloat(document.getElementById("precio").value),
        stock: parseInt(document.getElementById("stock").value, 10)
    };

    try {
        const respuesta = await axios.post(url, datos);
        console.log("Producto guardado:", respuesta.data);
        window.location.href = "http://localhost:3001/productos/mostrar";
    } catch (error) {
        console.error("Error al guardar el producto:", error.response ? error.response.data : error.message);
    }
}

export default function NuevoProducto() {
    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={guardarProducto} className="col-md-6 col-12 mt-5">
                <div className="card shadow-lg rounded-4" style={{ backgroundColor: "#FAF4FF" }}>
                    <div
                        className="card-header text-center"
                        style={{ backgroundColor: "#FFD1DC", color: "#8B0000" }}
                    >
                        <h1>Introducir Nuevo Producto</h1>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label
                                htmlFor="producto"
                                className="form-label"
                                style={{ color: "#8B0000", fontWeight: "bold" }}
                            >
                                Nombre del Producto
                            </label>
                            <input
                                className="form-control"
                                id="nombre"
                                required
                                autoFocus
                                type="text"
                                style={{
                                    borderColor: "#F6B1C3",
                                    backgroundColor: "#FFF5F7",
                                    fontSize: "16px",
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="precio"
                                className="form-label"
                                style={{ color: "#8B0000", fontWeight: "bold" }}
                            >
                                Precio
                            </label>
                            <input
                                className="form-control"
                                id="precio"
                                required
                                type="number"
                                step="0.01"
                                style={{
                                    borderColor: "#F6B1C3",
                                    backgroundColor: "#FFF5F7",
                                    fontSize: "16px",
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="stock"
                                className="form-label"
                                style={{ color: "#8B0000", fontWeight: "bold" }}
                            >
                                Existencias
                            </label>
                            <input
                                className="form-control"
                                id="stock"
                                required
                                type="number"
                                style={{
                                    borderColor: "#F6B1C3",
                                    backgroundColor: "#FFF5F7",
                                    fontSize: "16px",
                                }}
                            />
                        </div>
                    </div>
                    <div className="card-footer">
                        <center>
                            <button
                                type="submit"
                                className="btn col-12"
                                style={{
                                    backgroundColor: "#F6B1C3",
                                    borderColor: "#F6B1C3",
                                    color: "white",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                }}
                            >
                                Guardar Nuevo Producto
                            </button>
                        </center>
                    </div>
                </div>
            </form>
        </div>
    );
}
