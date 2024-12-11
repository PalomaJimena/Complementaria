"use client";

import { useRouter } from 'next/navigation';

export default function BuscarVenta() {
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = document.getElementById("id").value;

        if (id) {
            router.push(`/ventas/modificar/${id}`);
        }
    };

    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={handleSubmit} className="col-6 mt-5">
                <div
                    className="card shadow-lg rounded-4"
                    style={{ border: "1px solid #F6B1C3", backgroundColor: "#FFF5F7" }}
                >
                    <div
                        className="card-header rounded-top"
                        style={{
                            backgroundColor: "#F6B1C3",
                            color: "white",
                            textAlign: "center",
                            fontWeight: "bold"
                        }}
                    >
                        <h1>Buscar Venta para Modificar</h1>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label
                                htmlFor="id"
                                className="form-label"
                                style={{
                                    color: "#8B0000",
                                    fontWeight: "bold"
                                }}
                            >
                                ID de la Venta
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
                                    fontSize: "16px"
                                }}
                            />
                        </div>
                    </div>
                    <div
                        className="card-footer rounded-bottom"
                        style={{
                            backgroundColor: "#FDEDEC",
                            textAlign: "center"
                        }}
                    >
                        <button
                            className="btn"
                            style={{
                                backgroundColor: "#F6B1C3",
                                borderColor: "#F6B1C3",
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "18px"
                            }}
                            type="submit"
                        >
                            Buscar Venta
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
