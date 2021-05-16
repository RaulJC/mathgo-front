export interface IUser{
    id: string;
    username: string;
    authorityNames: string[];
    rol: string;
}
export interface IUsuario{
    id?: number;
    nombre: string;
    password: string;
    username: string;
    edad: number;
    rol: string;
}
export interface IRegistrarUsuarioRequest{
    usuario: IUsuario;
}
export interface IRegistrarUsuarioResponse{
    response: string;
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
export interface IProblemaResponse{
    problema: IProblema;
}
export interface IEnviarSolucionRequest{
    problema: IProblema;
    tipo: string;
    nAciertos: number;
    nFallos: number;
}
export interface IEjercicio{
    enunciado: String;
    operaciones: IOperacion[];
}
export interface IOperacion{
    tipo: String;
    operandos: String[];
    resultado: string[];
}
export interface Credenciales{
    email: String;
    password: String;
}