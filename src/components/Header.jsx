import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-pink-200 py-6 flex flex-col items-center justify-center shadow-md">
      <img
        src="/img/funky-logo.png"
        alt="Funkyfish Logo"
        className="mb-2"
        style={{ width: "180px", height: "auto", maxWidth: "40vw" }}
      />
      {/* <h1
        className="text-[60px] sm:text-[90px] md:text-[120px] font-bold text-yellow-400 text-center"
        style={{
          fontFamily: "'Baloo 2', cursive",
          letterSpacing: "-0.04em",
          textShadow: `
            4px 8px 0 #e94ca2,
            0px 16px 32px #c75a91bb
          `
        }}
      >
        QUIZZES
      </h1> */}


             {/* "QUIZZES" - Texto amarillo con contorno rosa y forma de blob */}
       <div className="relative mt-8"> {/* Añadimos margen superior para separar de "funkyfish" */}
         {/* Simular el contorno rosa fucsia con un div de fondo */}
         {/* Experimenta con los valores de border-radius para la forma de blob */}
         <div 
          className="absolute inset-0 bg-[#FF007F] rounded-[3rem_2rem_4rem_2rem/3rem_4rem_2rem_3rem] transform -rotate-2 -translate-x-1 -translate-y-1"
          style={{ 
            filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.3))', // Sombra para el blob
          }}
        ></div>
        
        {/* Texto "QUIZZES" - encima del contorno */}
        <h1 
          className="relative text-yellow-400 text-7xl md:text-8xl lg:text-9xl font-black px-8 py-4 z-20"
          style={{
            fontFamily: "'Baloo 2', cursive", // Ya la tienes importada
            letterSpacing: "-0.04em",
            WebkitTextStroke: '3px #FF007F', // Contorno grueso del texto. Usar el mismo rosa fucsia.
            textStroke: '3px #FF007F',
            color: '#FACC15',               // Relleno del texto amarillo
            // Asegúrate de que el border-radius del texto sea el mismo que el del div de contorno
            borderRadius: '3rem 2rem 4rem 2rem / 3rem 4rem 2rem 3rem' 
          }}
        >
          QUIZZES
        </h1>
      </div>


      {/* <nav className="space-x-6 hidden md:flex">
        <a href="#" className="text-pink-500 hover:text-pink-700 font-semibold">Inicio</a>
        <a href="#" className="text-pink-500 hover:text-pink-700 font-semibold">Tienda</a>
        <a href="#" className="text-pink-500 hover:text-pink-700 font-semibold">Contacto</a>
      </nav> */}
    </header>
  );
}


// import React from "react";

// export default function Header() {
//   return (
//     // Contenedor principal que simula el fondo gris claro de la imagen.
//     // Usaremos min-h-screen para que ocupe toda la altura de la vista si es necesario,
//     // o un padding adecuado para centrar el contenido.
//     <header className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-200 py-8">
//       {/* "funkyfish" - Texto blanco */}
//       {/* Ajusta el tamaño de la fuente y el estilo para que se parezca a la imagen */}
//       <div 
//         className="text-white text-6xl md:text-7xl lg:text-8xl font-bold mb-4 z-10" 
//         style={{ 
//           fontFamily: "'Poppins', sans-serif", // O la fuente que elijas para "funkyfish"
//           textShadow: '2px 2px 4px rgba(0,0,0,0.3)' // Sombra ligera para pop-out
//         }}
//       >
//         funkyfish
//       </div>

//       {/* "QUIZZES" - Texto amarillo con contorno rosa y forma de blob */}
//       <div className="relative mt-8"> {/* Añadimos margen superior para separar de "funkyfish" */}
//         {/* Simular el contorno rosa fucsia con un div de fondo */}
//         {/* Experimenta con los valores de border-radius para la forma de blob */}
//         <div 
//           className="absolute inset-0 bg-[#FF007F] rounded-[3rem_2rem_4rem_2rem/3rem_4rem_2rem_3rem] transform -rotate-2 -translate-x-1 -translate-y-1"
//           style={{ 
//             filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.3))', // Sombra para el blob
//           }}
//         ></div>
        
//         {/* Texto "QUIZZES" - encima del contorno */}
//         <h1 
//           className="relative text-yellow-400 text-7xl md:text-8xl lg:text-9xl font-black px-8 py-4 z-20"
//           style={{
//             fontFamily: "'Baloo 2', cursive", // Ya la tienes importada
//             letterSpacing: "-0.04em",
//             WebkitTextStroke: '3px #FF007F', // Contorno grueso del texto. Usar el mismo rosa fucsia.
//             textStroke: '3px #FF007F',
//             color: '#FACC15',               // Relleno del texto amarillo
//             // Asegúrate de que el border-radius del texto sea el mismo que el del div de contorno
//             borderRadius: '3rem 2rem 4rem 2rem / 3rem 4rem 2rem 3rem' 
//           }}
//         >
//           QUIZZES
//         </h1>
//       </div>
//     </header>
//   );
// }