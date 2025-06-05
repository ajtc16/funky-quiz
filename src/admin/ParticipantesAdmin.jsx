import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ParticipantesAdmin() {
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchParticipantes() {
      setLoading(true);
      const { data, error } = await supabase
        .from('clientes_quiz')
        .select("*")
        .order("fecha", { ascending: false });
      setParticipantes(data || []);
      setLoading(false);
    }
    fetchParticipantes();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Listado de Participantes</h2>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="p-2 border-b">Nombre</th>
              <th className="p-2 border-b">Celular</th>
              <th className="p-2 border-b">Correo</th>
              <th className="p-2 border-b">Fecha</th>
              <th className="p-2 border-b">Categoría</th>
            </tr>
          </thead>
          <tbody>
            {participantes.map((p) => (
              <tr key={p.id}>
                <td className="p-2 border-b">{p.nombre}</td>
                <td className="p-2 border-b">{p.celular}</td>
                <td className="p-2 border-b">{p.correo}</td>
                <td className="p-2 border-b">{new Date(p.fecha).toLocaleString()}</td>
                <td className="p-2 border-b">{p.categoria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
