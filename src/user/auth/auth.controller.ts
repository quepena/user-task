import { Body, ClassSerializerInterceptor, Controller, Inject, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, TokenDto } from './auth.dto';
import { User } from '../user.entity';

@Controller('auth')
export class AuthController {
    @Inject(AuthService)
    private readonly service: AuthService;

    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    register(@Body() body: RegisterDto) {
        return this.service.register(body);
    }

    @Post('login')
    login(@Body() body: LoginDto): Promise<TokenDto> {
        return this.service.login(body);
    }

    @Post('profile')
    getProfile(@Body() token: TokenDto) {
        return this.service.getProfile(token);
    }
}
