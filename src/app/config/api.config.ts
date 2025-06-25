// arquivo para armazenar o host e os endpoints da API
import { environment } from 'src/environments/environment';

export const API_URL = environment.apiUrl; // URL base da API
export const API_ENDPOINTS = {
  login: () => `${API_URL}/api/login`,
  register: () => `${API_URL}/api/register`,
  listarCategorias: () => `${API_URL}/api/categorias`,
  categoriaById: (id: number) => `${API_URL}/api/categorias/${id}`,
  criarCategoria: () => `${API_URL}/api/admin/categorias`,
  editarCategoria: (id: number) => `${API_URL}/api/admin/categorias/${id}`,
  deletarCategoria: (id: number) => `${API_URL}/api/admin/categorias/${id}`,
  produtos: () => `${API_URL}/api/produtos`,
  produtoById: (id: number) => `${API_URL}/api/produtos/${id}`,
  criarProduto: () => `${API_URL}/api/admin/produtos`,
  editarProduto: (id: number) => `${API_URL}/api/admin/produtos/${id}`,
  excluirProduto: (id: number) => `${API_URL}/api/admin/produtos/${id}`,
  getUserById: (id: number) => `/user/getUser/${id}`,
  receitas: () => `${API_URL}/api/receitas`,
  receitaById: (id: number) => `${API_URL}/api/receitas/${id}`,
  receitaTags: () => `${API_URL}/api/receita-tags`,
  imagens: () => `${API_URL}/api/imagens`,
  listaDeCompras: () => `${API_URL}/api/listas-compra`,
  registrarEvento: () => `${API_URL}/api/compras/registrar-evento`,
  usuarios: () => `${API_URL}/api/admin/usuarios`,
  grantAdmin: (id: number) => `${API_URL}/api/admin/usuarios/grant-admin/${id}`,
  revokeAdmin: (id: number) => `${API_URL}/api/admin/usuarios/revoke-admin/${id}`,
  produtoHistorico: (idUsuario: number) => `${API_URL}/api/produto-historicos?id_usuario=${idUsuario}`,
};
