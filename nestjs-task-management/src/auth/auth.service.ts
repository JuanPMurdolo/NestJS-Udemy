import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private UsersRepository: UsersRepository,
        private jwtService: JwtService
    ) {}

    async signUp(AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.UsersRepository.createUser(AuthCredentialsDto);
    }

    async validateUser(username: string, pass: string): Promise<any> {
        if (username === 'admin' && pass === 'admin') {
            return { username: 'admin' };
        }
        return null;
    }

    async signIn(AuthCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const { username, password } = AuthCredentialsDto;
        const user = await this.UsersRepository.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username };
            const accessToken: string = this.jwtService.sign(payload);
            return {accessToken};
        } else {   
            throw new UnauthorizedException('Invalid credentials');
    }
}

}

