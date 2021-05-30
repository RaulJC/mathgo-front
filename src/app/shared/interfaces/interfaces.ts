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
    aciertos: number;
    fallos: number;
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
export interface IGrupo{
    id: number;
    titulo: string;
    descripcion: string;
    masterfile: string;
    variables: string[];
    datos: string[][];
}
export interface ICrearGrupoRequest{
    grupo: IGrupo;
}
export interface ICrearGrupoResponse{
    grupo: IGrupo;
}
export interface IActualizarGrupoRequest{
    grupo: IGrupo;
}
export interface IActualizarGrupoResponse{
    grupo: IGrupo;
}
export interface IObetenerGrupoResponse{
    grupo: IGrupo;
}
export interface IObetenerGruposResponse{
    grupos: IGrupo[];
}
export interface IEliminarGrupoResponse{
    esEliminado: boolean;
}