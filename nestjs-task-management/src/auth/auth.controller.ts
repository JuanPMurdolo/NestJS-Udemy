import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Post('/signup')
    signUp(@Body() AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(AuthCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() AuthCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.signIn(AuthCredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req) {
        console.log(req);
    }




}
