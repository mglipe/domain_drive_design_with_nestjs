import { ConfigService } from "@nestjs/config";
import { MailEntity } from "../domain/mail.entity";
import { MailSenderPort } from "../domain/mail-sender-port";
import nodemailer from 'nodemailer'
import { Injectable } from "@nestjs/common";


@Injectable()
export class SmtpMailSenderAdapter implements MailSenderPort{
    private transporter: nodemailer.Transporter

    constructor(private config: ConfigService){

        this.transporter = nodemailer.createTransport({
            host: this.config.get<string>('SMTP_HOST'),
            port: this.config.get<number>('SMTP_PORT'),
           /*  secure: this.config.get<boolean>('SMTP_SECURE'),
            auth:{
                user: this.config.get<string>('SMTP_USER'),
                pass: this.config.get<string>('SMTP_PASSWORD'),
            } */
        })
       
    }

    async send(message: MailEntity){
        await this.transporter.sendMail({
            from: message.from?.getValue() ?? this.config.get<string>('SMTP_FROM'),
            to: message.to.getValue(),
            subject: message.subject,
            text: message.body
        })
        
    }
}