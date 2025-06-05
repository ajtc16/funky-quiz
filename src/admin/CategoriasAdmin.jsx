import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function CategoriasAdmin() {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({ nombre: "", descripcion: "", imagen: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cargar categorías
  useEffect(() => {
    fetchCategorias();
  }, []);

  async function fetchCategorias() {
    setLoading(true);
    const { data } = await supabase.from("categorias").select("*").order("id", { ascending: true });
    setCategorias(data || []);
    setLoading(false);
  }

  // Manejar input
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Guardar nueva categoría o editar
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (editId) {
      // Editar
      await supabase.from("categorias").update(form).eq("id", editId);
    } else {
      // Nueva
      await supabase.from("categorias").insert([form]);
    }
    setForm({ nombre: "", descripcion: "", imagen: "" });
    setEditId(null);
    await fetchCategorias();
    setLoading(false);
  }

  // Editar categoría (carga datos en el formulario)
  function handleEdit(cat) {
    setForm({ nombre: cat.nombre, descripcion: cat.descripcion, imagen: cat.imagen });
    setEditId(cat.id);
  }

  // Borrar categoría
  async function handleDelete(id) {
    if (!window.confirm("¿Seguro que quieres borrar esta categoría?")) return;
    setLoading(true);
    await supabase.from("categorias").delete().eq("id", id);
    await fetchCategorias();
    setLoading(false);
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Categorías</h2>
      {/* Formulario de nueva/editar */}
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2 flex-wrap items-end">
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="imagen"
          placeholder="Nombre de imagen (ej: fashionista.jpg)"
          value={form.imagen}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-pink-400 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {editId ? "Guardar Cambios" : "Agregar"}
        </button>
        {editId && (
          <button
            type="button"
            className="bg-gray-300 px-3 py-2 rounded"
            onClick={() => { setEditId(null); setForm({ nombre: "", descripcion: "", imagen: "" }); }}
          >
            Cancelar
          </button>
        )}
      </form>
      {/* Listado */}
      <table className="min-w-full bg-white rounded shadow text-sm">
        <thead>
          <tr>
            <th className="p-2 border-b">ID</th>
            <th className="p-2 border-b">Nombre</th>
            <th className="p-2 border-b">Descripción</th>
            <th className="p-2 border-b">Imagen</th>
            <th className="p-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(cat => (
            <tr key={cat.id}>
              <td className="p-2 border-b">{cat.id}</td>
              <td className="p-2 border-b">{cat.nombre}</td>
              <td className="p-2 border-b">{cat.descripcion}</td>
              <td className="p-2 border-b">{cat.imagen}</td>
              <td className="p-2 border-b flex gap-2">
                <button onClick={() => handleEdit(cat)} className="bg-yellow-200 px-2 rounded">Editar</button>
                <button onClick={() => handleDelete(cat.id)} className="bg-red-200 px-2 rounded">Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
