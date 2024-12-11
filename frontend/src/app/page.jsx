"use client";

export default function Inicio() {
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                height: "100vh",
                backgroundColor: "#F0F8FF",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
        >
            <div
                className="text-center"
                style={{
                    backgroundColor: "#FFFAF0",
                    padding: "40px",
                    borderRadius: "15px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    maxWidth: "600px",
                    width: "100%",
                }}
            >
                <h1
                    className="fw-bold"
                    style={{
                        color: "#8B0000",
                        fontSize: "3rem",
                        marginBottom: "20px",
                    }}
                >
                    Trabajo Final - Tercer Parcial
                </h1>
                <p
                    style={{
                        color: "#6A5ACD",
                        fontSize: "1.2rem",
                        marginBottom: "30px",
                    }}
                >
                    ¡Bienvenidos a la aplicación! Este proyecto es parte del trabajo final para el tercer parcial. Aquí podrás interactuar con diversas funcionalidades y explorar el proyecto.
                </p>
                <div>
                    <a
                        href="usuarios/mostrar" // Cambia esto a la ruta que desees
                        className="btn"
                        style={{
                            backgroundColor: "#FF6347",
                            color: "white",
                            fontWeight: "bold",
                            padding: "12px 25px",
                            borderRadius: "10px",
                            textDecoration: "none",
                            fontSize: "1.1rem",
                        }}
                    >
                        Explorar Proyecto
                    </a>
                </div>
            </div>
        </div>
    );
}
