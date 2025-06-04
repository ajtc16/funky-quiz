import { supabase } from '../lib/supabaseClient';

export async function guardarCliente({ nombre, celular, correo, fecha, categoria }) {
  const { data, error } = await supabase
    .from('clientes_quiz')
    .insert([{ nombre, celular, correo, fecha, categoria }]);
  if (error) throw error;
  return data;
}
