import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto, TokenDto } from './auth.dto';
import { AuthHelper } from './auth.helper';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
    @InjectRepository(User) private readonly repository: Repository<User>;
    @Inject(AuthHelper) private readonly helper: AuthHelper;
    @Inject(MailService) private readonly service: MailService;

    public async register(body: RegisterDto) {
        const { username, email, photo, password }: RegisterDto = body;
        let user: User = await this.repository.findOne({ where: { email } });

        if (user) {
            throw new HttpException('ERROR: User with this E-mail already exists', HttpStatus.CONFLICT);
        }

        user = new User();

        user.username = username;
        user.email = email;
        user.photo = photo;        
        user.password = this.helper.encodePassword(password);

        await this.repository.save(user);
        
        const token = Math.floor(1000 + Math.random() * 9000).toString();
        await this.service.sendUserConfirmation(user, token);

        // return user
    }

    public async login(body: LoginDto): Promise<TokenDto> {
        const { email, password }: LoginDto = body;
        const user: User = await this.repository.findOne({ where: { email } });

        if (!user) {
            throw new HttpException('No user found', HttpStatus.NOT_FOUND);
        }
            
        const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

        if (!isPasswordValid) {
            throw new HttpException('Incorrect password', HttpStatus.NOT_FOUND);
        }

        const token: TokenDto = {
            token: this.helper.generateToken(user)
        }

        return token;
    }

    public async refresh(user: User): Promise<string> {
        return this.helper.generateToken(user);
    }

    async getProfile(token: TokenDto) {
        return this.helper.getProfile(token)
    }
}
