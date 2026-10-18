import { Inject, Injectable, Logger } from "@nestjs/common";
import { MailSenderPort } from "../domain/mail-sender-port";
import { MailAddres } from "../domain/value-object/mail-adress.vo";
import { MailEntity } from "../domain/mail.entity";

@Injectable()
export class MailService{
    private readonly logger = new Logger(MailService.name)
    constructor(
        @Inject(MailSenderPort)
        private readonly mailSender: MailSenderPort
    ){}

     public async execute(to: MailAddres, subject: string, body: string){
        const message = MailEntity.create(
            new MailAddres(to.getValue()),
            subject,
            body
        )
        this.logger.debug(`Email enviado ${to.getValue()} com assunto: ${subject}`)
        await this.mailSender.send(message)
    }
}