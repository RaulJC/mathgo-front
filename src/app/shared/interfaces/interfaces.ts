export interface IProblema{
    ejercicios?: IEjercicio[];
}

export interface IEjercicio{
    enunciado?: String;
    operaciones?: IOperacion[];
}

export interface IOperacion{
    tipo?: String;
    operandos?: number[];
    resultado?: number;
}