import { randomUUID } from "crypto"

export class Code{
    constructor(private value: string){}

    public static generator(): Code{
        return new Code(randomUUID());
    }


    public getValue(): string{
        return this.value
    }
}