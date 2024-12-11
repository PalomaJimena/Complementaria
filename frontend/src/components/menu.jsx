"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

export default function NavBar() {
    const [usuarios, setUsuarios] = useState([]);
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [sugerencias, setSugerencias] = useState([]);
    const [tipoBusqueda, setTipoBusqueda] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname.includes("/productos/mostrar")) {
            setTipoBusqueda("productos");
        } else if (pathname.includes("/usuarios/mostrar")) {
            setTipoBusqueda("usuarios");
        } else {
            setTipoBusqueda("");
        }
    }, [pathname]);

    useEffect(() => {
        async function fetchData() {
            try {
                if (tipoBusqueda === "usuarios") {
                    const response = await axios.get("http://localhost:3000/usuarios/mostrar");
                    setUsuarios(response.data);
                } else if (tipoBusqueda === "productos") {
                    const response = await axios.get("http://localhost:3000/productos/mostrar");
                    setProductos(response.data);
                }
            } catch (error) {
                console.error(`Error al cargar ${tipoBusqueda}:`, error);
            }
        }
        if (tipoBusqueda) {
            fetchData();
        }
    }, [tipoBusqueda]);

    const filtrarSugerencias = async (query) => {
        if (tipoBusqueda === "usuarios") {
            setSugerencias(
                usuarios.filter((usuario) =>
                    usuario.nombre.toLowerCase().includes(query.toLowerCase())
                )
            );
        } else if (tipoBusqueda === "productos") {
            try {
                const response = await axios.get(
                    `http://localhost:3000/productos/buscarProducto?producto=${query}`
                );
                setSugerencias(response.data);
            } catch (error) {
                console.error("Error al buscar productos:", error);
                setSugerencias([]);
            }
        }
    };

    const handleBusqueda = (e) => {
        const query = e.target.value;
        setBusqueda(query);
        if (query.trim() !== "") {
            filtrarSugerencias(query);
        } else {
            setSugerencias([]);
        }
    };

    const handleSeleccionar = (item) => {
        setBusqueda(tipoBusqueda === "usuarios" ? item.nombre : item.nombre);
        setSugerencias([]);
    };

    const handleBuscarSubmit = (e) => {
        e.preventDefault();
        if (tipoBusqueda === "usuarios") {
            router.push(`/usuarios/mostrar?nombre=${busqueda}`);
        } else if (tipoBusqueda === "productos") {
            router.push(`/productos/mostrar?producto=${busqueda}`);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#FADADD" }}>
            <div className="container-fluid">
                <Link className="navbar-brand" href="/" style={{ color: "#C89FA3", fontWeight: "bold" }}>
                    Gestión Pastel
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" href="/" style={{ color: "#C89FA3" }}>
                                Inicio
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="usuariosDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ color: "#C89FA3" }}
                            >
                                Usuarios
                            </a>
                            <ul
                                className="dropdown-menu"
                                aria-labelledby="usuariosDropdown"
                                style={{
                                    backgroundColor: "#FEE4E3",
                                    borderColor: "#FADADD",
                                    borderWidth: "2px",
                                }}
                            >
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        href="/usuarios/mostrar"
                                        style={{
                                            color: "#C89FA3",
                                            fontWeight: "500",
                                            padding: "10px",
                                        }}
                                    >
                                        Mostrar Usuarios
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        href="/usuarios/nuevo"
                                        style={{
                                            color: "#C89FA3",
                                            fontWeight: "500",
                                            padding: "10px",
                                        }}
                                    >
                                        Crear Usuario
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="productosDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ color: "#C89FA3" }}
                            >
                                Productos
                            </a>
                            <ul
                                className="dropdown-menu"
                                aria-labelledby="productosDropdown"
                                style={{
                                    backgroundColor: "#FEE4E3",
                                    borderColor: "#FADADD",
                                    borderWidth: "2px",
                                }}
                            >
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        href="/productos/mostrar"
                                        style={{
                                            color: "#C89FA3",
                                            fontWeight: "500",
                                            padding: "10px",
                                        }}
                                    >
                                        Mostrar Productos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        href="/productos/nuevo"
                                        style={{
                                            color: "#C89FA3",
                                            fontWeight: "500",
                                            padding: "10px",
                                        }}
                                    >
                                        Crear Producto
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/ventas/mostrar" style={{ color: "#C89FA3" }}>
                                Ventas
                            </Link>
                        </li>
                    </ul>
                    <form className="d-flex position-relative" role="search" onSubmit={handleBuscarSubmit}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder={`Buscar ${tipoBusqueda}`}
                            value={busqueda}
                            onChange={handleBusqueda}
                            style={{
                                borderColor: "#FADADD",
                                borderWidth: "2px",
                                padding: "10px",
                                fontSize: "16px",
                            }}
                        />
                        <button
                            className="btn"
                            type="submit"
                            style={{
                                backgroundColor: "#FEC5BB",
                                color: "#FFFFFF",
                                fontWeight: "bold",
                            }}
                        >
                            Buscar
                        </button>
                        {busqueda && sugerencias.length > 0 && (
                            <ul
                                className="list-group mt-2 position-absolute"
                                style={{
                                    top: "100%",
                                    zIndex: 1050,
                                    backgroundColor: "white",
                                    width: "100%",
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                    borderColor: "#FADADD",
                                }}
                            >
                                {sugerencias.map((item, index) => (
                                    <li
                                        key={index}
                                        className="list-group-item"
                                        onClick={() => handleSeleccionar(item)}
                                        style={{
                                            cursor: "pointer",
                                            color: "#C89FA3",
                                        }}
                                    >
                                        {tipoBusqueda === "usuarios" ? item.nombre : item.nombre}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </form>
                </div>
            </div>
        </nav>
    );
}
