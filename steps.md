# Refactoring Steps

## Step 1: Move Cabecalho Component to Compartilhado Folder

- Created a new folder `compartilhado` inside `src/app`.
- Moved the `cabecalho` component files (`cabecalho.component.ts`, `cabecalho.component.spec.ts`, `cabecalho.component.html`, `cabecalho.component.css`) to `src/app/compartilhado/cabecalho`.
- Updated the import path for `CabecalhoComponent` in `AppModule`.

## Step 2: Delete Old Cabecalho Folder

- Deleted the old `cabecalho` folder from `src/app`.

## Step 3: Refactor AppRoutingModule

- Updated the `AppRoutingModule` to separate the login, register, and admin register routes from the others.
- The other routes use lazy loading and share the same base component with the header and router outlet.

## Step 4: Create Cadastrar and CadastroAdmin Components

- Created `CadastrarComponent` as a standalone component in `src/app/cadastrar`.
- Created `CadastroAdminComponent` as a standalone component in `src/app/cadastro-admin`.
- Updated the `AppRoutingModule` to include the new components.
