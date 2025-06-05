import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import UserForm from "./components/UserForm";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { guardarCliente } from "./api/guardarCliente";
import { getQuizData } from "./api/getQuizData";
import AdminPanel from "./admin/AdminPanel"; // <-- Panel de administración
import LoginAdmin from "./components/LoginAdmin";
import { InvisibleAdminAccess } from "./components/InvisibleAdminAccess";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export default function App() {
  // Estado para saber si se muestra el panel de admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLogin, setAdminLogin] = useState(false); // para mostrar el login

  // Estados para el flujo del quiz
  const [user, setUser] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [categoriaGanadora, setCategoriaGanadora] = useState(null);
  const [categorias, setCategorias] = useState([]);
  

  // Al montar, carga las categorías de la base para mostrar después el resultado
   useEffect(() => {
    getQuizData().then(data => setCategorias(data.categorias));
    // Persistencia admin
    if (localStorage.getItem("isAdmin") === "true") setIsAdmin(true);
  }, []);

  // Al enviar el formulario de usuario, guarda los datos en el estado
  function handleUserFormSubmit(datosUsuario) {
    setUser(datosUsuario);
  }

  // Al terminar el quiz, determina la categoría más elegida y guarda en la base
  async function handleFinishQuiz(seleccionesCategorias) {
    // Cuenta cuántas veces eligieron cada categoría
    const conteo = {};
    seleccionesCategorias.forEach(id => {
      conteo[id] = (conteo[id] || 0) + 1;
    });

    // Encuentra el id más repetido
    const categoria_id_mas_repetida = Object.keys(conteo).reduce((a, b) =>
      conteo[a] > conteo[b] ? a : b
    );

    // Busca la categoría por id
    const categoria = categorias.find(c => String(c.id) === String(categoria_id_mas_repetida));
    setCategoriaGanadora(categoria);
    setShowResult(true);

    // Guarda en Supabase el registro de la chica y su resultado
    await guardarCliente({
      nombre: user.nombre,
      celular: user.celular,
      correo: user.correo,
      fecha: new Date().toISOString(),
      categoria: categoria.nombre,
    });
  }

  // Login admin
  function handleAdminLogin(password) {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
      setAdminLogin(false);
    } else {
      alert("Clave incorrecta");
    }
  }
  function handleLogout() {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
  }


  return (
    <div>
      <Header />

      {/* Acceso invisible: presiona Ctrl+Shift+A para mostrar login admin */}
      {!isAdmin && (
        <InvisibleAdminAccess onShowLogin={() => setAdminLogin(true)} />
      )}

      {/* Modal de login admin */}
      {adminLogin && !isAdmin && (
        <LoginAdmin
          onSubmit={handleAdminLogin}
          onClose={() => setAdminLogin(false)}
        />
      )}

      {/* Panel de administración si eres admin */}
      {isAdmin ? (
        <>
          <button
            onClick={handleLogout}
            className="fixed top-2 right-2 text-xs bg-gray-300 px-2 py-1 rounded z-50 shadow"
          >
            Salir
          </button>
          <AdminPanel />
        </>
      ) : !user ? (
        <UserForm onSubmit={handleUserFormSubmit} />
      ) : !showResult ? (
        <Quiz onFinish={handleFinishQuiz} />
      ) : (
        <Result
          category={categoriaGanadora?.nombre}
          description={categoriaGanadora?.descripcion}
          img={categoriaGanadora?.imagen}
          user={user}
        />
      )}
    </div>
  );
}
