import React, { useState } from "react";
import Header from "./components/Header";
import UserForm from "./components/UserForm"; // <--- Nuevo
import Quiz from "./components/Quiz";
import Result from "./components/Result";

const categorias = [
  {
    description: "Eres una chica fashionista, ¡amas las tendencias y siempre vas un paso adelante! Eres creativa, alegre y todo el mundo se inspira en tu estilo.",
    img: "/src/assets/il_fullxfull.4898181940_sbj2.jpg",
  },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [resultIdx, setResultIdx] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [fechaResultado, setFechaResultado] = useState(null);

  function handleUserFormSubmit(datosUsuario) {
    setUser(datosUsuario);
  }

  function calcularCategoria(respuestasQuiz) {
    setRespuestas(respuestasQuiz);
    setFechaResultado(new Date());
    // Aquí tu lógica para la categoría (por ahora, siempre 0)
    setResultIdx(0);
    setShowResult(true);

    // Aquí puedes llamar a tu función para guardar en base de datos y/o enviar email
    // Por ejemplo:
    // saveToDatabase({ ...user, fecha: new Date(), categoria: 0 });
    // sendEmail({ ...user, categoria: 0, productos: [...] });
  }

  return (
    <div>
      <Header />
      {!user ? (
        <UserForm onSubmit={handleUserFormSubmit} />
      ) : !showResult ? (
        <Quiz onFinish={calcularCategoria} />
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
