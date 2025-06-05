import React from "react";
import { products } from "../data/products";

// Componente para mostrar el resultado final del quiz
export default function Result({ category, description, img, user }) {
  return (
    <div className="max-w-xl mx-auto bg-white/80 rounded-2xl shadow-xl p-6 mt-8 flex flex-col items-center mb-12">
      {/* Título con el nombre de la usuaria (si existe) y la categoría ganadora */}
      <h2 className="text-3xl font-extrabold text-pink-600 mb-2 drop-shadow">
        {/* Saludo personalizado */}
        ¡{user?.nombre ? user.nombre + "," : ""} eres <span className="capitalize">{category}</span>!
      </h2>

      {/* Imagen de la categoría ganadora */}
      <img
        src={`/categorias/${img}`}
        alt={category}
        className="w-40 h-40 object-cover rounded-full border-4 border-pink-300 mb-4"
      />

      {/* Descripción de la categoría */}
      <p className="text-center text-lg mb-6">{description}</p>

      {/* Título de productos recomendados */}
      <h3 className="text-xl font-bold text-pink-500 mb-4">
        Productos recomendados para ti
      </h3>

      {/* Lista de productos recomendados (ahora mismo los mismos para todas) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {products.slice(0, 5).map((prod, i) => (
          <a
            key={i}
            href={prod.url}
            className="bg-pink-50 border border-pink-200 p-3 rounded-xl flex flex-col items-center hover:scale-105 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Imagen del producto */}
            <img
              src={prod.image}
              alt={prod.name}
              className="w-16 h-16 mb-2 object-cover rounded-full"
            />
            {/* Nombre del producto */}
            <div className="font-semibold text-pink-700 text-center">
              {prod.name}
            </div>
          </a>
        ))}
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
