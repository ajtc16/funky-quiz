import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function PreguntasAdmin() {
  const [preguntas, setPreguntas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [nuevaPregunta, setNuevaPregunta] = useState("");
  const [editId, setEditId] = useState(null);

  // Para opciones de la pregunta seleccionada
  const [opciones, setOpciones] = useState([]);
  const [nuevaOpcion, setNuevaOpcion] = useState({ texto: "", categoria_id: "" });

  // Cargar preguntas y categorías
  useEffect(() => {
    fetchPreguntas();
    fetchCategorias();
  }, []);

  async function fetchPreguntas() {
    const { data } = await supabase.from("preguntas").select("*").order("id", { ascending: true });
    setPreguntas(data || []);
  }

  async function fetchCategorias() {
    const { data } = await supabase.from("categorias").select("*").order("id", { ascending: true });
    setCategorias(data || []);
  }

  // Cargar opciones de una pregunta
  async function fetchOpciones(preguntaId) {
    const { data } = await supabase
      .from("opciones")
      .select("*")
      .eq("pregunta_id", preguntaId)
      .order("id", { ascending: true });
    setOpciones(data || []);
  }

  // Crear/Editar pregunta
  async function handleSubmitPregunta(e) {
    e.preventDefault();
    if (editId) {
      await supabase.from("preguntas").update({ texto: nuevaPregunta }).eq("id", editId);
    } else {
      await supabase.from("preguntas").insert([{ texto: nuevaPregunta }]);
    }
    setNuevaPregunta("");
    setEditId(null);
    fetchPreguntas();
  }

  // Editar pregunta
  function handleEditPregunta(pregunta) {
    setNuevaPregunta(pregunta.texto);
    setEditId(pregunta.id);
    fetchOpciones(pregunta.id);
  }

  // Borrar pregunta (y sus opciones)
  async function handleDeletePregunta(id) {
    if (!window.confirm("¿Seguro que quieres borrar la pregunta y todas sus opciones?")) return;
    await supabase.from("opciones").delete().eq("pregunta_id", id); // Borra opciones asociadas
    await supabase.from("preguntas").delete().eq("id", id); // Borra pregunta
    setNuevaPregunta("");
    setEditId(null);
    setOpciones([]);
    fetchPreguntas();
  }

  // Crear opción
  async function handleAddOpcion(e) {
    e.preventDefault();
    if (!nuevaOpcion.texto || !nuevaOpcion.categoria_id) return;
    await supabase.from("opciones").insert([{
      texto: nuevaOpcion.texto,
      categoria_id: nuevaOpcion.categoria_id,
      pregunta_id: editId,
    }]);
    setNuevaOpcion({ texto: "", categoria_id: "" });
    fetchOpciones(editId);
  }

  // Borrar opción
  async function handleDeleteOpcion(id) {
    await supabase.from("opciones").delete().eq("id", id);
    fetchOpciones(editId);
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Preguntas</h2>

      {/* Formulario de crear/editar pregunta */}
      <form onSubmit={handleSubmitPregunta} className="mb-6 flex gap-2 flex-wrap items-end">
        <input
          value={nuevaPregunta}
          onChange={e => setNuevaPregunta(e.target.value)}
          placeholder="Texto de la pregunta"
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-pink-400 text-white px-4 py-2 rounded">
          {editId ? "Guardar Cambios" : "Agregar"}
        </button>
        {editId && (
          <button
            type="button"
            className="bg-gray-300 px-3 py-2 rounded"
            onClick={() => { setEditId(null); setNuevaPregunta(""); setOpciones([]); }}
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Listado de preguntas */}
      <table className="min-w-full bg-white rounded shadow text-sm mb-8">
        <thead>
          <tr>
            <th className="p-2 border-b">ID</th>
            <th className="p-2 border-b">Pregunta</th>
            <th className="p-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {preguntas.map(p => (
            <tr key={p.id}>
              <td className="p-2 border-b">{p.id}</td>
              <td className="p-2 border-b">{p.texto}</td>
              <td className="p-2 border-b flex gap-2">
                <button onClick={() => handleEditPregunta(p)} className="bg-yellow-200 px-2 rounded">Editar</button>
                <button onClick={() => handleDeletePregunta(p.id)} className="bg-red-200 px-2 rounded">Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Gestión de opciones de la pregunta seleccionada */}
      {editId && (
        <div className="mb-8">
          <h3 className="font-bold mb-2">Opciones de la pregunta</h3>
          {/* Formulario para agregar nueva opción */}
          <form onSubmit={handleAddOpcion} className="flex gap-2 flex-wrap items-end mb-3">
            <input
              value={nuevaOpcion.texto}
              onChange={e => setNuevaOpcion({ ...nuevaOpcion, texto: e.target.value })}
              placeholder="Texto de la opción"
              className="border p-2 rounded"
              required
            />
            <select
              value={nuevaOpcion.categoria_id}
              onChange={e => setNuevaOpcion({ ...nuevaOpcion, categoria_id: e.target.value })}
              className="border p-2 rounded"
              required
            >
              <option value="">Categoría...</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
            <button type="submit" className="bg-green-400 text-white px-4 py-2 rounded">Agregar Opción</button>
          </form>

          {/* Listado de opciones */}
          <ul className="list-disc pl-4">
            {opciones.map(opt => (
              <li key={opt.id} className="flex gap-2 items-center">
                {opt.texto} <span className="text-xs text-gray-500">({categorias.find(c => c.id === opt.categoria_id)?.nombre || "?"})</span>
                <button onClick={() => handleDeleteOpcion(opt.id)} className="bg-red-100 px-2 rounded text-xs ml-2">Borrar</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
