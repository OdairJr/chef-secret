export interface Usuario {
    id: number;
    nome: string;
    email: string;
    senhaHash: string;
    createdAt: Date;
    updatedAt: Date;
}