import { MailAddres } from "./value-object/mail-adress.vo";


export class MailEntity{

    constructor(
        public to: MailAddres,
        public subject?: string,
        public body?: string,
        public readonly from?: MailAddres
        
    ){}

    public static create(to: MailAddres, subject: string, body: string): MailEntity{
        return new MailEntity(
            new MailAddres(to.getValue()),
            subject,
            body,
        )
    }

}