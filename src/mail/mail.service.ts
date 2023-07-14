import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendUserConfirmation(user: User, token: string) {
        const url = `http://localhost:5000/auth/confirm?token=${token}`;

        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Welcome to Nice App! Confirm your Email',
            template: './confirmation',
            context: {
                username: user.username,
                url,
            },
        });
    }
}
