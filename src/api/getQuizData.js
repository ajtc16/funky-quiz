import { supabase } from '../lib/supabaseClient';

// Trae preguntas, opciones y categorías
export async function getQuizData() {
  // Trae preguntas ordenadas por id
  const { data: preguntas, error: errorPreg } = await supabase
    .from('preguntas')
    .select('id, texto')
    .order('id', { ascending: true });
  if (errorPreg) throw errorPreg;

  // Trae opciones con la info de categoría
  const { data: opciones, error: errorOpc } = await supabase
    .from('opciones')
    .select('id, texto, pregunta_id, categoria_id, categorias (id, nombre)')
    .order('id', { ascending: true });
  if (errorOpc) throw errorOpc;

  // Trae categorías
  const { data: categorias, error: errorCat } = await supabase
    .from('categorias')
    .select('*')
    .order('id', { ascending: true });
  if (errorCat) throw errorCat;

  return { preguntas, opciones, categorias };
}
