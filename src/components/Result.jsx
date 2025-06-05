import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

// Componente para mostrar el resultado final del quiz
export default function Result({ category, description, img, user }) {
  // Estado local para guardar los productos recomendados
  const [productos, setProductos] = useState([]);

  // Al montar el componente (o cuando cambie la categoría), consulta los productos de esa categoría
  useEffect(() => {
    async function fetchProductos() {
      if (!category?.id) return; // Si no hay categoría, no consulta
      // Trae hasta 5 productos de la base de datos que correspondan a la categoría ganadora
      const { data } = await supabase
        .from("productos")
        .select("*")
        .eq("categoria_id", category.id)
        .limit(5);
      setProductos(data || []); // Actualiza el estado
    }
    fetchProductos();
  }, [category]);

  return (
    <div className="max-w-xl mx-auto bg-white/80 rounded-2xl shadow-xl p-6 mt-8 flex flex-col items-center mb-12">
      {/* Título con el nombre de la usuaria (si existe) y la categoría ganadora */}
      <h2 className="text-3xl font-extrabold text-pink-600 mb-2 drop-shadow">
        {/* Saludo personalizado */}
        ¡{user?.nombre ? user.nombre + "," : ""} eres{" "}
        <span className="capitalize">{category?.nombre}</span>!
      </h2>

      {/* Imagen de la categoría ganadora */}
      <img
        src={`/categorias/${img}`}
        alt={category?.nombre}
        className="w-40 h-40 object-cover rounded-full border-4 border-pink-300 mb-4"
      />

      {/* Descripción de la categoría */}
      <p className="text-center text-lg mb-6">{description}</p>

      {/* Título de productos recomendados */}
      <h3 className="text-xl font-bold text-pink-500 mb-4">
        Productos recomendados para ti
      </h3>

      {/* Lista de productos recomendados para la categoría ganadora */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {productos.map((prod, i) => (
          <a
            key={prod.id}
            href={prod.url}
            className="bg-pink-50 border border-pink-200 p-3 rounded-xl flex flex-col items-center hover:scale-105 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Imagen del producto */}
            <img
              src={prod.imagen}
              alt={prod.nombre}
              className="w-16 h-16 mb-2 object-cover rounded-full"
            />
            {/* Nombre del producto */}
            <div className="font-semibold text-pink-700 text-center">
              {prod.nombre}
            </div>
          </a>
        ))}
        {/* Si no hay productos, muestra un mensaje */}
        {productos.length === 0 && (
          <div className="col-span-2 text-center text-gray-400 py-4">
            No hay productos registrados para esta categoría aún.
          </div>
        )}
      </div>

      {/* Botón para volver a intentar el quiz */}
      <div className="mt-8 text-center">
        <button
          className="bg-pink-200 text-pink-700 font-bold px-6 py-2 rounded-full shadow hover:bg-pink-300 transition"
          onClick={() => window.location.reload()}
        >
          Volver a intentarlo
        </button>
      </div>
    </div>
  );
}
