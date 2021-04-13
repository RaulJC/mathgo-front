export interface IUser{
    id: string;
    username: string;
    authorityNames: string[];
    rol: string;
}
export interface JwtRequest{
    username: string;
    password: string;
}
export interface JwtResponse{
    token: string;
    expirationDate: number;
    user: IUser;
}
export interface IProblema{
    ejercicios: IEjercicio[];
}
export interface IEjercicio{
    enunciado: String;
    operaciones: IOperacion[];
}

export interface IOperacion{
    tipo: String;
    operandos: String[];
    resultado: number;
}

export interface Credenciales{
    email: String;
    password: String;
}