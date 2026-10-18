import { Module } from "@nestjs/common";
import { MailSenderPort } from "./domain/mail-sender-port";
import { SmtpMailSenderAdapter } from "./infrastructure/smtp-mail-sender-adapter";
import { MailService } from "./application/mail.service";


@Module({
    imports:[],
    providers:[
        MailService,
        {
            provide: MailSenderPort,
            useClass: SmtpMailSenderAdapter,
        }
    ],
    exports:[MailService]
})

export class MailModule{}