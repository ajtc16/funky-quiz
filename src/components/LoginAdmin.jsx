import React, { useState } from "react";

export default function LoginAdmin({ onSubmit, onClose }) {
  const [pw, setPw] = useState("");
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit(pw);
        }}
        className="bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold mb-2">Acceso administrador</h2>
        <input
          type="password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          placeholder="Clave admin"
          className="border p-2 rounded"
          autoFocus
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-pink-400 text-white px-4 py-2 rounded"
          >
            Ingresar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
