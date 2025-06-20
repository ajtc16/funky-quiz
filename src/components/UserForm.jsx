import React, { useState } from "react";

export default function UserForm({ onSubmit }) {
  const [form, setForm] = useState({
    nombre: "",
    celular: "",
    correo: ""
  });

  const [errors, setErrors] = useState({});

  // Validación para cada campo
  function validate() {
    const errs = {};

    // Nombre: solo letras y espacios, mínimo 2 letras
    if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{2,}$/.test(form.nombre.trim())) {
      errs.nombre = "Ingresa un nombre válido (solo letras y espacios).";
    }

    // Celular: solo números, 9-12 dígitos
    if (!/^09\d{7,10}$/.test(form.celular.trim())) {
    errs.celular = "Celular inválido.";
  }

    // Correo: formato válido
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo.trim())) {
      errs.correo = "Correo electrónico inválido.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Limpia error al escribir
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      setErrors({});
      onSubmit(form);
    }
  }

  return (
    <form className="max-w-md mx-auto mt-8 bg-white/80 p-8 rounded-2xl shadow-xl flex flex-col gap-4"
     onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">¡Comienza tu Quiz!</h2>
      <div>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="border border-pink-300 rounded-xl py-2 px-4 w-full"
        />
        {errors.nombre && <div className="text-pink-500 text-xs mt-1">{errors.nombre}</div>}
      </div>
      <div>
        <input
          name="celular"
          value={form.celular}
          onChange={handleChange}
          placeholder="Celular"
          className="border border-pink-300 rounded-xl py-2 px-4 w-full"
        />
        {errors.celular && <div className="text-pink-500 text-xs mt-1">{errors.celular}</div>}
      </div>
      <div>
        <input
          name="correo"
          type="email"
          value={form.correo}
          onChange={handleChange}
          placeholder="Correo electrónico"
          className="border border-pink-300 rounded-xl py-2 px-4 w-full"
        />
        {errors.correo && <div className="text-pink-500 text-xs mt-1">{errors.correo}</div>}
      </div>
      <button
        type="submit"
        className="bg-pink-200 text-pink-700 font-bold px-6 py-2 rounded-full shadow hover:bg-pink-300 transition mt-4"
      >
        Comenzar Quiz
      </button>
    </form>
  );
}
