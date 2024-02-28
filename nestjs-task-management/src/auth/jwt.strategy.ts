import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UsersRepository } from "./users.repository";
import { User } from "./user.entity";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private usersRepository: UsersRepository,
        private configService: ConfigService,
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload) {
        const { username } = payload;
        const user = await this.usersRepository.findOne({ username });

        if (!user) {
            return false;
        }

        return user;
    }

}