"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

export default function MostrarProductos() {
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [mostrarBuscador, setMostrarBuscador] = useState(false); // El buscador está oculto por defecto
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get("http://localhost:3000/productos/mostrar");
                setProductos(response.data);
            } catch (error) {
                console.error("Error al cargar los productos:", error);
            }
        };

        fetchProductos();

        const productoBuscado = searchParams.get("producto");
        if (productoBuscado) {
            setBusqueda(productoBuscado);
        } else {
            setBusqueda("");
        }
    }, [searchParams]);

    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
    };

    const eliminarProducto = async (id) => {
        if (confirm("¿Estás segura de que deseas eliminar este producto?")) {
            try {
                await axios.delete(`http://localhost:3000/productos/borrarProducto/${id}`);
                setProductos(productos.filter((producto) => producto.id !== id));
                alert("Producto eliminado correctamente");
            } catch (error) {
                console.error("Error al eliminar producto:", error);
                alert("Hubo un error al eliminar el producto");
            }
        }
    };

    const handleEditar = (id) => {
        router.push(`/productos/modificar/${id}`);
    };

    const productosFiltrados = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="container mt-5" style={{ backgroundColor: "#FFF7F7", padding: "20px", borderRadius: "10px" }}>
            <h1 className="text-center mb-4" style={{ color: "#A27CC9", fontWeight: "bold" }}>Lista de Productos</h1>

            <button
                className="btn mb-4"
                onClick={() => setMostrarBuscador(!mostrarBuscador)}
                style={{
                    backgroundColor: "#FADADD",
                    color: "#A27CC9",
                    fontSize: "16px",
                    borderRadius: "10px",
                    border: "none",
                    padding: "10px 20px",
                }}
            >
                {mostrarBuscador ? "Ocultar Buscador" : "Mostrar Buscador"}
            </button>

            {mostrarBuscador && (
                <input
                    className="form-control mb-4"
                    type="text"
                    placeholder="Buscar por nombre del producto"
                    value={busqueda}
                    onChange={handleBusqueda}
                    style={{
                        backgroundColor: "#FADADD",
                        color: "#A27CC9",
                        border: "2px solid #A27CC9",
                        borderRadius: "10px",
                        padding: "10px",
                    }}
                />
            )}

            <div className="card shadow-lg p-4 rounded-4" style={{ backgroundColor: "#FFF0F5" }}>
                <div className="card-body">
                    <table className="table table-borderless text-center">
                        <thead style={{ backgroundColor: "#A27CC9", color: "#FFF" }}>
                            <tr>
                                <th>Num</th>
                                <th>ID</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Eliminar</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productosFiltrados.length === 0 && busqueda ? (
                                <tr>
                                    <td colSpan="6" style={{ color: "#A27CC9" }}>
                                        No se encontraron productos con el nombre "{busqueda}"
                                    </td>
                                </tr>
                            ) : (
                                productosFiltrados.map((producto, index) => (
                                    <tr key={producto.id}>
                                        <td>{index + 1}</td>
                                        <td>{producto.id}</td>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.precio}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm rounded-3"
                                                style={{
                                                    backgroundColor: "#F28CA8",
                                                    color: "#FFF",
                                                    padding: "8px 12px",
                                                }}
                                                onClick={() => eliminarProducto(producto.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm rounded-3"
                                                style={{
                                                    backgroundColor: "#B584D6",
                                                    color: "#FFF",
                                                    padding: "8px 12px",
                                                }}
                                                onClick={() => handleEditar(producto.id)}
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
