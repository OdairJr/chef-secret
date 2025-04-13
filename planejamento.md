# Planejamento do Projeto Angular - ChefPrice

Este documento apresenta o planejamento técnico do projeto ChefPrice, um sistema que auxilia profissionais da culinária a gerenciar materiais, receitas, listas de compras e analisar seus custos e precificação.

---

## Entidades do Projeto

### 1. Usuario
- id: INT
- nome: NVARCHAR(100)
- email: NVARCHAR(100)
- senha_hash: NVARCHAR(MAX)
- created_at: DATETIME2
- updated_at: DATETIME2

### 2. Login
- id: INT
- id_usuario (FK): INT
- data_login: DATETIME2
- endereco_ip: NVARCHAR(45)
- user_agent: NVARCHAR(MAX)

### 3. Sessao
- id: INT
- id_usuario (FK): INT
- token: NVARCHAR(MAX)
- created_at: DATETIME2
- expires_at: DATETIME2
- is_valido: BIT

### 4. Receita
- id: INT
- id_usuario (FK): INT
- titulo: NVARCHAR(200)
- descricao: NVARCHAR(MAX)
- rendimento: NVARCHAR(100)
- tempo_preparo: INT
- created_at: DATETIME2
- updated_at: DATETIME2

### 5. Etapa_Receita
- id: INT
- id_receita (FK): INT
- numero_etapa: INT
- instrucoes: NVARCHAR(MAX)

### 6. Receita_Tag
- id: INT
- nome: NVARCHAR(100)

### 7. Receita_Tag_Associacao
- id_receita (FK): INT
- id_tag (FK): INT

### 8. Receita_Imagem
- id_receita (FK): INT
- id_imagem (FK): INT

### 9. Ingrediente_Receita
- id: INT
- id_receita (FK): INT
- id_produto (FK): INT
- quantidade: DECIMAL(10,3)
- unidade: NVARCHAR(50)
- observacao: NVARCHAR(255)

### 10. Produto
- id: INT
- nome: NVARCHAR(100)
- codigo_barra: VARCHAR(100)
- id_categoria (FK): INT
- unidade_medida: NVARCHAR(50)

### 11. Produto_Historico
- id: INT
- id_usuario (FK): INT
- id_produto (FK): INT
- preco_unitario: DECIMAL(10,2)
- quantidade: DECIMAL(10,3)
- preco_total: DECIMAL(10,2)
- data_compra: DATETIME2
- desconto: DECIMAL(10,2)

### 12. Produto_Imagem
- id_produto (FK): INT
- id_imagem (FK): INT

### 13. Imagem
- id: INT
- id_usuario (FK): INT
- id_tipo_imagem (FK): INT
- dados_imagem: VARBINARY(MAX)
- nome_arquivo: NVARCHAR(255)
- is_publico: BIT
- created_at: DATETIME2

### 14. Tipo_Imagem
- id: INT
- nome: NVARCHAR(50)

### 15. Categoria
- id: INT
- nome: NVARCHAR(100)

---

## Módulos do Sistema Angular

### 1. Autenticação
- Login (Sessão)
- Cadastro de usuário
- Recuperação de senha

### 2. Usuários
- Perfil do usuário
- Histórico de logins
- Sessões ativas

### 3. Receitas
- Listagem de receitas
- Cadastro de receita (informações, etapas, ingredientes, tags e imagens)
- Edição e exclusão
- Visualização pública/privada
- Clonagem de receitas

### 4. Produtos (Materiais)
- Cadastro e edição de produtos
- Histórico de preços
- Associação de imagens
- Categorias e unidades

### 5. Análise de Preço
- Comparação de preços históricos
- Cálculo de custo por receita
- Gráficos de tendência
- Lucro esperado vs. custo real

### 6. Imagens
- Upload e gestão de imagens
- Associação a receitas e produtos
- Tipos de imagem (ex: foto de capa, galeria, nota fiscal)

---

## Estrutura de Diretórios Angular (Sugerida)

```
chefprice/
│
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── header/
│   │   │   │   │   ├── header.component.ts
│   │   │   │   │   ├── header.component.html
│   │   │   │   │   ├── header.component.scss
│   │   │   │   ├── footer/
│   │   │   │   │   ├── footer.component.ts
│   │   │   │   │   ├── footer.component.html
│   │   │   │   │   ├── footer.component.scss
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   │   ├── login-form/
│   │   │   │   │   │   ├── login-form.component.ts
│   │   │   │   │   │   ├── login-form.component.html
│   │   │   │   │   │   ├── login-form.component.scss
│   │   │   │   │   ├── register-form/
│   │   │   │   │   │   ├── register-form.component.ts
│   │   │   │   │   │   ├── register-form.component.html
│   │   │   │   │   │   ├── register-form.component.scss
│   │   │   │   ├── pages/
│   │   │   │   │   ├── login-page/
│   │   │   │   │   │   ├── login-page.component.ts
│   │   │   │   │   │   ├── login-page.component.html
│   │   │   │   │   │   ├── login-page.component.scss
│   │   │   │   │   ├── register-page/
│   │   │   │   │   │   ├── register-page.component.ts
│   │   │   │   │   │   ├── register-page.component.html
│   │   │   │   │   │   ├── register-page.component.scss
│   │   │   │   │   ├── forgot-password-page/
│   │   │   │   │   │   ├── forgot-password-page.component.ts
│   │   │   │   │   │   ├── forgot-password-page.component.html
│   │   │   │   │   │   ├── forgot-password-page.component.scss
│   │   │   │   ├── services/
│   │   │   │   │   ├── auth.service.ts
│   │   │   │   │   ├── auth.guard.ts
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── auth-routing.module.ts
│   │   │   ├── usuarios/
│   │   │   │   ├── perfil/
│   │   │   │   ├── sessao/
│   │   │   ├── receitas/
│   │   │   │   ├── listagem/
│   │   │   │   ├── cadastro/
│   │   │   │   ├── detalhes/
│   │   │   │   ├── componentes/
│   │   │   ├── produtos/
│   │   │   │   ├── components/
│   │   │   │   │   ├── produto-card/
│   │   │   │   │   │   ├── produto-card.component.ts
│   │   │   │   │   │   ├── produto-card.component.html
│   │   │   │   │   │   ├── produto-card.component.scss
│   │   │   │   │   ├── produto-detalhes/
│   │   │   │   │   │   ├── produto-detalhes.component.ts
│   │   │   │   │   │   ├── produto-detalhes.component.html
│   │   │   │   │   │   ├── produto-detalhes.component.scss
│   │   │   │   ├── pages/
│   │   │   │   │   ├── listagem-produtos/
│   │   │   │   │   │   ├── listagem-produtos.component.ts
│   │   │   │   │   │   ├── listagem-produtos.component.html
│   │   │   │   │   │   ├── listagem-produtos.component.scss
│   │   │   │   │   ├── cadastro-produto/
│   │   │   │   │   │   ├── cadastro-produto.component.ts
│   │   │   │   │   │   ├── cadastro-produto.component.html
│   │   │   │   │   │   ├── cadastro-produto.component.scss
│   │   │   │   │   ├── historico-precos/
│   │   │   │   │   │   ├── historico-precos.component.ts
│   │   │   │   │   │   ├── historico-precos.component.html
│   │   │   │   │   │   ├── historico-precos.component.scss
│   │   │   │   ├── services/
│   │   │   │   │   ├── produto.service.ts
│   │   │   │   │   ├── historico-precos.service.ts
│   │   │   │   ├── produtos.module.ts
│   │   │   │   ├── produtos-routing.module.ts
│   │   │   ├── analises/
│   │   │   │   ├── dashboards/
│   │   │   │   ├── graficos/
│   │   │   ├── imagens/
│   │   │   │   ├── galeria/
│   │   │   │   ├── upload/
│   │   ├── models/
│   │   │   ├── usuario.model.ts
│   │   │   ├── login.model.ts
│   │   │   ├── sessao.model.ts
│   │   │   ├── receita.model.ts
│   │   │   ├── etapa-receita.model.ts
│   │   │   ├── receita-tag.model.ts
│   │   │   ├── receita-tag-associacao.model.ts
│   │   │   ├── receita-imagem.model.ts
│   │   │   ├── ingrediente-receita.model.ts
│   │   │   ├── produto.model.ts
│   │   │   ├── produto-historico.model.ts
│   │   │   ├── produto-imagem.model.ts
│   │   │   ├── imagem.model.ts
│   │   │   ├── tipo-imagem.model.ts
│   │   │   ├── categoria.model.ts
│   │   └── app.routes.ts
├── environments/
├── assets/
├── styles/
└── index.html
```
