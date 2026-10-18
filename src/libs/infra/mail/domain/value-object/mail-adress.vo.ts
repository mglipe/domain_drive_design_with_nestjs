import { IsEmail } from "class-validator";

export class MailAddres{
    @IsEmail()
    private readonly value!: string;

    constructor( value: string){
        this.value = value;
    }

    public getValue(): string{
        return this.value
    }

    
    
}