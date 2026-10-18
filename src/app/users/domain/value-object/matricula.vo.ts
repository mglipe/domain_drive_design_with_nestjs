//autocondida (não depende de consultar outras entidades/repositórios)

export class Matricula{
    constructor(public readonly value: string){}


    public static generate(): Matricula{
        const year = new Date().getFullYear();
        const random = Math.floor(1000 + Math.random() * 9000);
        return new Matricula(`${year}-${random}`)
    }

    public getValue(){
        return this.value
    }
}