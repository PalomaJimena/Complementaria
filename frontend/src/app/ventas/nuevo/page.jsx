"use client";

import axios from "axios";
import { useState } from "react";

// Función para guardar la venta
async function guardarVenta(e) {
    e.preventDefault();

    const url = "http://localhost:3000/ventas/nueva";
    const datos = {
        cantidad: document.getElementById("cantidad").value,
        idProd1: document.getElementById("idProd1-hidden").value,
        idUsu1: document.getElementById("idUsu1-hidden").value,
        estatus: document.getElementById("estatus").value,
        fechaHora: new Date().toISOString(),
    };

    try {
        await axios.post(url, datos);
        window.location.href = "http://localhost:3001/ventas/mostrar";
    } catch (error) {
        console.error("Error al guardar la venta:", error);
        alert("Hubo un error al guardar la venta. Verifica los datos.");
    }
}

function SearchInput({ label, apiUrl, id }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedId, setSelectedId] = useState("");

    const handleSearch = async (e) => {
        setQuery(e.target.value);

        if (e.target.value.trim().length > 0) {
            try {
                const response = await axios.get(`${apiUrl}?search=${e.target.value}`);
                setResults(response.data);
            } catch (error) {
                console.error(`Error al buscar en ${apiUrl}:`, error);
                setResults([]);
            }
        } else {
            setResults([]);
        }
    };

    const handleSelect = (item) => {
        setSelectedId(item.id);
        setQuery(item.nombre);
        setResults([]);
    };

    return (
        <div className="mb-3 position-relative">
            <label htmlFor={id} className="form-label fw-bold text-primary">{label}</label>
            <input
                className="form-control"
                id={id}
                value={query}
                onChange={handleSearch}
                required
                type="text"
                placeholder={`Buscar ${label.toLowerCase()}...`}
                style={{ backgroundColor: "#FFF5F7", borderColor: "#D8BFD8" }}
            />
            <input type="hidden" id={`${id}-hidden`} value={selectedId} />
            {results.length > 0 && (
                <ul className="list-group position-absolute w-100" style={{ zIndex: 10, borderColor: "#D8BFD8" }}>
                    {results.map((item) => (
                        <li
                            key={item.id}
                            className="list-group-item list-group-item-action"
                            onClick={() => handleSelect(item)}
                            style={{ cursor: "pointer", backgroundColor: "#FFE4E1" }}
                        >
                            {item.nombre}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default function NuevaVenta() {
    return (
        <div className="container-fluid py-5" style={{ backgroundColor: "#FFF0F5" }}>
            <div className="row justify-content-center">
                <form onSubmit={guardarVenta} className="col-md-6">
                    <div
                        className="card shadow-lg border-0"
                        style={{
                            backgroundColor: "#F8BBD0",
                            color: "#800020",
                            borderRadius: "12px",
                        }}
                    >
                        <div
                            className="card-header text-center"
                            style={{
                                backgroundColor: "#F48FB1",
                                color: "white",
                                fontWeight: "bold",
                                borderRadius: "12px 12px 0 0",
                            }}
                        >
                            <h1 className="fw-bold">Nueva Venta</h1>
                        </div>
                        <div className="card-body" style={{ backgroundColor: "#FFF", color: "#800020" }}>
                            <div className="mb-3">
                                <label htmlFor="cantidad" className="form-label fw-bold text-primary">
                                    Cantidad
                                </label>
                                <input
                                    className="form-control"
                                    id="cantidad"
                                    required
                                    type="number"
                                    min="1"
                                    placeholder="Ingrese la cantidad"
                                    style={{ backgroundColor: "#FFF5F7", borderColor: "#D8BFD8" }}
                                />
                            </div>
                            <SearchInput
                                label="Producto"
                                apiUrl="http://localhost:3000/productos/mostrar"
                                id="idProd1"
                            />
                            <SearchInput
                                label="Usuario"
                                apiUrl="http://localhost:3000/usuarios/mostrar"
                                id="idUsu1"
                            />
                            <div className="mb-3">
                                <label htmlFor="estatus" className="form-label fw-bold text-primary">
                                    Estatus
                                </label>
                                <select
                                    className="form-control"
                                    id="estatus"
                                    required
                                    style={{ backgroundColor: "#FFF5F7", borderColor: "#D8BFD8" }}
                                >
                                    <option value="vendido">Vendido</option>
                                </select>
                            </div>
                        </div>
                        <div
                            className="card-footer"
                            style={{
                                backgroundColor: "#FDEDEC",
                                textAlign: "center",
                                borderRadius: "0 0 12px 12px",
                            }}
                        >
                            <button
                                type="submit"
                                className="btn btn-danger w-100 fw-bold"
                                style={{
                                    backgroundColor: "#F48FB1",
                                    color: "white",
                                    fontSize: "18px",
                                }}
                            >
                                Guardar la nueva Venta
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
