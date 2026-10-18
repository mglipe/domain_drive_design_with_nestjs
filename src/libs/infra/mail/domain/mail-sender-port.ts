import { MailEntity } from "./mail.entity";

export interface MailSenderPort{
    send(message: MailEntity):Promise<void>
}


export const MailSenderPort = Symbol.for('MailSenderPort')