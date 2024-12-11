import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Cargando() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ backgroundColor: "#FFF0F5", fontFamily: "Arial, sans-serif" }}>
            <div
                className="spinner-border"
                role="status"
                style={{
                    width: "4rem",
                    height: "4rem",
                    color: "#FF69B4",
                    borderWidth: "0.3rem",
                    borderColor: "#FFB6C1 #FFF0F5",
                }}
            >
                <span className="visually-hidden">Cargando...</span>
            </div>
            <h1 className="mt-3" style={{ color: "#BA68C8", fontWeight: "bold", fontSize: "1.5rem" }}>
                Cargando...
            </h1>
        </div>
    );
}
