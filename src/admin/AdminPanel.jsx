import React, { useState } from "react";
import CategoriasAdmin from "./CategoriasAdmin";
import PreguntasAdmin from "./PreguntasAdmin";
import ParticipantesAdmin from "./ParticipantesAdmin";
import ProductosAdmin from "./ProductosAdmin"; // <--- NUEVO

function AdminPanel() {
  const [seccion, setSeccion] = useState("participantes");

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>
      <div className="mb-6 flex gap-4">
        <button onClick={() => setSeccion("participantes")} className="btn-admin">Participantes</button>
        <button onClick={() => setSeccion("categorias")} className="btn-admin">Categorías</button>
        <button onClick={() => setSeccion("preguntas")} className="btn-admin">Preguntas</button>
        <button onClick={() => setSeccion("productos")} className="btn-admin">Productos</button> {/* <-- nuevo */}
      </div>
      <div>
        {seccion === "participantes" && <ParticipantesAdmin />}
        {seccion === "categorias" && <CategoriasAdmin />}
        {seccion === "preguntas" && <PreguntasAdmin />}
        {seccion === "productos" && <ProductosAdmin />} {/* <-- nuevo */}
      </div>
    </div>
  );
  
}

export default AdminPanel;
