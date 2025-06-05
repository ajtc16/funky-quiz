import React, { useState, useEffect } from "react";
import { getQuizData } from "../api/getQuizData";

export default function Quiz({ onFinish }) {
  const [preguntas, setPreguntas] = useState([]);
  const [opciones, setOpciones] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selecciones, setSelecciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuiz() {
      setLoading(true);
      try {
        const { preguntas, opciones } = await getQuizData();
        setPreguntas(preguntas);
        setOpciones(opciones);
      } catch (e) {
        alert("Error cargando el quiz");
      }
      setLoading(false);
    }
    fetchQuiz();
  }, []);

  if (loading) return <div className="text-center py-8">Cargando preguntas...</div>;
  if (!preguntas.length) return <div>No hay preguntas en la base de datos</div>;

  // Opciones para la pregunta actual
  const opcionesActuales = opciones.filter(opt => opt.pregunta_id === preguntas[current].id);

  function handleSelect(opcion) {
    setSelecciones([...selecciones, opcion.categoria_id]);
    if (current + 1 < preguntas.length) {
      setCurrent(current + 1);
    } else {
      onFinish([...selecciones, opcion.categoria_id]);
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white/70 rounded-2xl shadow-xl p-6 mt-8 mb-8">
      <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">Pregunta {current + 1}/{preguntas.length}</h2>
      <p className="mb-6 text-lg text-center">{preguntas[current].texto}</p>
      <div className="grid gap-4">
        {opcionesActuales.map(opt => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt)}
            className="bg-pink-100 border border-pink-300 hover:bg-pink-200 font-semibold py-3 px-4 rounded-xl transition"
          >
            {opt.texto}
          </button>
        ))}
      </div>
    </div>
  );
}
