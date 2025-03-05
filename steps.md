# Refactoring Steps

## Step 1: Move Cabecalho Component to Compartilhado Folder

- Created a new folder `compartilhado` inside `src/app`.
- Moved the `cabecalho` component files (`cabecalho.component.ts`, `cabecalho.component.spec.ts`, `cabecalho.component.html`, `cabecalho.component.css`) to `src/app/compartilhado/cabecalho`.
- Updated the import path for `CabecalhoComponent` in `AppModule`.

## Step 2: Delete Old Cabecalho Folder

- Deleted the old `cabecalho` folder from `src/app`.
