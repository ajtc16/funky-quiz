import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({ nombre: "", url: "", imagen: "", categoria_id: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: productos } = await supabase.from("productos").select("*").order("id", { ascending: true });
    const { data: categorias } = await supabase.from("categorias").select("*").order("id", { ascending: true });
    setProductos(productos || []);
    setCategorias(categorias || []);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

// Sube la imagen al bucket 'productos' si el usuario seleccionó un archivo
async function uploadImageIfNeeded() {
  if (!file) return form.imagen; // Si no cambió la imagen, regresa la anterior

  // Crea un nombre único para evitar duplicados
  const filePath = `${Date.now()}_${file.name}`;

  // Sube la imagen al bucket 'productos'
  let { error } = await supabase.storage.from('productos').upload(filePath, file);

  if (error) {
    alert("Error subiendo imagen");
    return "";
  }

  // Obtiene la URL pública de la imagen recién subida
  const { data } = supabase.storage.from('productos').getPublicUrl(filePath);

  // Devuelve la URL que podrás guardar en la base de datos
  return data.publicUrl;
}


  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const imagenUrl = await uploadImageIfNeeded();
    const dataToSend = { ...form, imagen: imagenUrl };
    if (editId) {
      await supabase.from("productos").update(dataToSend).eq("id", editId);
    } else {
      await supabase.from("productos").insert([dataToSend]);
    }
    setForm({ nombre: "", url: "", imagen: "", categoria_id: "" });
    setEditId(null);
    setFile(null);
    await fetchData();
    setLoading(false);
  }

  function handleEdit(producto) {
    setForm({
      nombre: producto.nombre,
      url: producto.url,
      imagen: producto.imagen,
      categoria_id: producto.categoria_id,
    });
    setEditId(producto.id);
    setFile(null);
  }

  async function handleDelete(id) {
    if (!window.confirm("¿Seguro que quieres borrar este producto?")) return;
    setLoading(true);
    await supabase.from("productos").delete().eq("id", id);
    await fetchData();
    setLoading(false);
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Productos por Categoría</h2>
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
          name="url"
          placeholder="Link"
          value={form.url}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 rounded"
        />
        <select
          name="categoria_id"
          value={form.categoria_id}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Categoría...</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
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
            onClick={() => { setEditId(null); setForm({ nombre: "", url: "", imagen: "", categoria_id: "" }); setFile(null); }}
          >
            Cancelar
          </button>
        )}
      </form>
      {/* Listado */}
      <table className="min-w-full bg-white rounded shadow text-sm">
        <thead>
          <tr>
            <th className="p-2 border-b">Nombre</th>
            <th className="p-2 border-b">Imagen</th>
            <th className="p-2 border-b">Link</th>
            <th className="p-2 border-b">Categoría</th>
            <th className="p-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(prod => (
            <tr key={prod.id}>
              <td className="p-2 border-b">{prod.nombre}</td>
              <td className="p-2 border-b">
                {prod.imagen && (
                  <img src={prod.imagen} alt={prod.nombre} className="w-12 h-12 object-cover rounded-full" />
                )}
              </td>
              <td className="p-2 border-b">
                <a href={prod.url} target="_blank" rel="noopener noreferrer" className="underline text-blue-500">
                  Ver
                </a>
              </td>
              <td className="p-2 border-b">
                {categorias.find(c => c.id === prod.categoria_id)?.nombre || "-"}
              </td>
              <td className="p-2 border-b flex gap-2">
                <button onClick={() => handleEdit(prod)} className="bg-yellow-200 px-2 rounded">Editar</button>
                <button onClick={() => handleDelete(prod.id)} className="bg-red-200 px-2 rounded">Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
