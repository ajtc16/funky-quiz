import React, { useState } from "react";

export default function Header() {
  return (
    <header className="w-full bg-pink-200 py-4 px-2 flex items-center justify-between shadow-md">
      <div className="text-4xl font-title text-pink-700 drop-shadow-[0_2px_2px_rgba(255,182,193,0.7)]">
        Pink Quiz Girl
      </div>
      <nav className="space-x-6 hidden md:flex">
        <a href="#" className="text-pink-500 hover:text-pink-700 font-semibold">Inicio</a>
        <a href="#" className="text-pink-500 hover:text-pink-700 font-semibold">Tienda</a>
        <a href="#" className="text-pink-500 hover:text-pink-700 font-semibold">Contacto</a>
      </nav>
    </header>
  );
}
