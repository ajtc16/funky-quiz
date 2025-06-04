import React, { useState } from "react";
import Header from "./components/Header";
import UserForm from "./components/UserForm";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

// 🔗 Importa la función para guardar datos en Supabase
import { guardarCliente } from "./api/guardarCliente"; // <-- Nueva línea, revisa path

const categorias = [
  {
    nombre: "Fashionista", // <-- Agrega nombre a la categoría
    description: "Eres una chica fashionista, ¡amas las tendencias y siempre vas un paso adelante! Eres creativa, alegre y todo el mundo se inspira en tu estilo.",
    img: "/src/assets/il_fullxfull.4898181940_sbj2.jpg",
  },
  // Puedes agregar más categorías si lo necesitas
];

export default function App() {
  const [user, setUser] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [resultIdx, setResultIdx] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [fechaResultado, setFechaResultado] = useState(null);
  const [loading, setLoading] = useState(false); // <-- Para mostrar estado de guardado

  // ⬇️ Cuando se envía el formulario de usuario
  function handleUserFormSubmit(datosUsuario) {
    setUser(datosUsuario);
  }

  // ⬇️ Lógica para determinar la categoría (aquí siempre es 0)
  function calcularCategoria(respuestasQuiz) {
    setRespuestas(respuestasQuiz);
    setFechaResultado(new Date());
    // Aquí tu lógica para la categoría (por ahora, siempre 0)
    return 0;
  }

  // ⬇️ Al terminar el quiz, guarda en Supabase y muestra resultado
  async function handleFinishQuiz(respuestasQuiz) {
    setLoading(true);
    const idxCategoria = calcularCategoria(respuestasQuiz);
    const categoriaNombre = categorias[idxCategoria].nombre;
    const fecha = new Date().toISOString();

    try {
      // ⬇️ Guarda en la base de datos
      await guardarCliente({
        nombre: user.nombre,
        celular: user.celular,
        correo: user.correo,
        fecha,
        categoria: categoriaNombre,
      });
      setResultIdx(idxCategoria);
      setShowResult(true);
    } catch (err) {
      alert('Hubo un error guardando tus datos, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Header />
      {!user ? (
        <UserForm onSubmit={handleUserFormSubmit} />
      ) : !showResult ? (
        <>
          {loading && (
            <div className="text-center py-4 text-pink-400">
              Guardando tus datos...
            </div>
          )}
          <Quiz onFinish={handleFinishQuiz} /> {/* <-- Usa la función nueva */}
        </>
      ) : (
        <Result
          category={resultIdx + 1}
          description={categorias[resultIdx].description}
          img={categorias[resultIdx].img}
          user={user}
          fecha={fechaResultado}
        />
      )}
    </div>
  );
}
