import BorrarVenta from "@/components/borrarVent";
import Link from "next/link";
import axios from "axios";

async function getVentas() {
    const url = "http://localhost:3000/ventas/mostrar";
    const ventas = await axios.get(url);
    return ventas.data;
}

async function getUsuario() {
    const urlu = "http://localhost:3000/usuarios/mostrar";
    const usuarios = await axios.get(urlu);
    return usuarios.data;
}

async function getProducto() {
    const urlp = "http://localhost:3000/productos/mostrar";
    const productos = await axios.get(urlp);
    return productos.data;
}

export default async function Ventas() {
    const ventas = await getVentas();
    const usuarios = await getUsuario();
    const productos = await getProducto();
    const ventasVendidas = ventas.filter(venta => venta.estatus === "vendido");

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4" style={{ color: "#8B0000", fontWeight: "bold" }}>
                Ventas Registradas
            </h1>
            
            {/* Tabla de ventas con colores pastel */}
            <table className="table table-striped table-bordered table-hover">
                <thead style={{ backgroundColor: "#FFD1DC", color: "#8B0000", fontWeight: "bold" }}>
                    <tr>
                        <th>No.</th>
                        <th>Fecha</th>
                        <th>Producto</th>
                        <th>Usuario</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Estatus</th>
                        <th>Borrar</th>
                        <th>Modificar</th>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: "#FFF5F7" }}>
                    {
                        ventasVendidas.map((venta, index) => {
                            const usuario = usuarios.find(u => u.id === venta.idUsu1);
                            const nombreUsuario = usuario ? usuario.nombre : "Desconocido";

                            const producto = productos.find(p => p.id === venta.idProd1);
                            const nombreProducto = producto ? producto.nombre : "Desconocido";
                            const precioProducto = producto ? producto.precio : "Desconocido";

                            return (
                                <tr key={venta.id} style={{ cursor: "pointer" }}>
                                    <td>{index + 1}</td>
                                    <td>{new Date(venta.fechaHora).toLocaleString()}</td>
                                    <td>{nombreProducto}</td>
                                    <td>{nombreUsuario}</td>
                                    <td>{"$" + precioProducto}</td>
                                    <td>{venta.cantidad}</td>
                                    <td>{venta.estatus}</td>
                                    <td>
                                        <BorrarVenta id={venta.id} />
                                    </td>
                                    <td>
                                        <Link
                                            href={`/ventas/modificar/${venta.id}`}
                                            className="btn"
                                            style={{
                                                backgroundColor: "#F6B1C3",
                                                color: "white",
                                                fontWeight: "bold"
                                            }}
                                        >
                                            Modificar
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>

            {/* Botón para agregar nueva venta */}
            <div className="d-flex justify-content-center mt-4">
                <Link
                    href="/ventas/nuevo"
                    className="btn"
                    style={{
                        backgroundColor: "#F6B1C3",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "16px"
                    }}
                >
                    Nueva Venta
                </Link>
            </div>
        </div>
    );
}
