"use client";

import { useRouter } from "next/navigation";

export default function BuscarProducto() {
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = document.getElementById("id").value;

        if (id) {
            router.push(`/productos/modificar/${id}`);
        }
    };

    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={handleSubmit} className="col-md-6 col-12 mt-5">
                <div className="card shadow-lg rounded-4" style={{ backgroundColor: "#FAF4FF" }}>
                    <div
                        className="card-header text-center"
                        style={{ backgroundColor: "#FFD1DC", color: "#8B0000" }}
                    >
                        <h1>Buscar Producto para Modificar</h1>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label
                                htmlFor="id"
                                className="form-label"
                                style={{ color: "#8B0000", fontWeight: "bold" }}
                            >
                                ID del Producto
                            </label>
                            <input
                                className="form-control"
                                id="id"
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
                    </div>
                    <div className="card-footer">
                        <center>
                            <button
                                className="btn col-12"
                                type="submit"
                                style={{
                                    backgroundColor: "#F6B1C3",
                                    borderColor: "#F6B1C3",
                                    color: "white",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                }}
                            >
                                Buscar Producto
                            </button>
                        </center>
                    </div>
                </div>
            </form>
        </div>
    );
}
