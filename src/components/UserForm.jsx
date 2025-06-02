import React, { useState } from "react";

export default function UserForm({ onSubmit }) {
  const [form, setForm] = useState({
    nombre: "",
    celular: "",
    correo: ""
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Validación simple
    if (!form.nombre || !form.celular || !form.correo) {
      setError("Por favor completa todos los campos.");
      return;
    }
    setError("");
    onSubmit(form);
  }

  return (
    <form className="max-w-md mx-auto mt-8 bg-white/80 p-8 rounded-2xl shadow-xl flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">¡Comienza tu Quiz!</h2>
      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        className="border border-pink-300 rounded-xl py-2 px-4"
      />
      <input
        name="celular"
        value={form.celular}
        onChange={handleChange}
        placeholder="Celular"
        className="border border-pink-300 rounded-xl py-2 px-4"
      />
      <input
        name="correo"
        type="email"
        value={form.correo}
        onChange={handleChange}
        placeholder="Correo electrónico"
        className="border border-pink-300 rounded-xl py-2 px-4"
      />
      {error && <div className="text-pink-500 text-center">{error}</div>}
      <button
        type="submit"
        className="bg-pink-200 text-pink-700 font-bold px-6 py-2 rounded-full shadow hover:bg-pink-300 transition mt-4"
      >
        Comenzar Quiz
      </button>
    </form>
  );
}
