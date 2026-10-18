import z from 'zod'

export class CPF{
    private readonly value: string
    constructor(value:string){
        this.value = z.string().transform((val)=> val.replace(/\D/g, "")).parse(value)
    }


    isValid(cpf: string): boolean{
        if(cpf.length !== 11) return false;
        if(/^(\d)\1{10}$/.test(cpf)) return false

        return true
    }

    formatCpf(cpf: string): string{
        return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")
    }
    
    toString(): string{
        if(!this.isValid(this.value)){
            throw new Error('Invalid CPF', {cause: "INVALID_TYPE"})
        }

        return this.formatCpf(this.value);
    }
}