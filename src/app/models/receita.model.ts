export interface Receita {
    id: number;
    idUsuario: number;
    titulo: string;
    descricao: string;
    rendimento: string;
    tempoPreparo: number;
    createdAt: Date;
    updatedAt: Date;
}