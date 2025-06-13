// arquivo para armazenar o host e os endpoints da API
import { environment } from 'src/environments/environment';

export const API_URL = environment.apiUrl; // URL base da API
export const API_ENDPOINTS = {
  login: () => `${API_URL}/api/login`,
  register: () => `${API_URL}/api/register`,
  categorias: () => `${API_URL}/api/categorias`,
  categoriaById: (id: number) => `${API_URL}/api/categorias/${id}`,
  produtos: () => `${API_URL}/api/produtos`,
  produtoById: (id: number) => `${API_URL}/api/produtos/${id}`,
  getUserById: (id: number) => `/user/getUser/${id}`,
  receitas: () => `${API_URL}/api/receitas`,
  receitaById: (id: number) => `${API_URL}/api/receitas/${id}`,
  receitaTags: () => `${API_URL}/api/receita-tags`,
};
