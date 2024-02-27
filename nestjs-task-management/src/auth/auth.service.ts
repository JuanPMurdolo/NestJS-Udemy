import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private UsersRepository: UsersRepository,
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
}

