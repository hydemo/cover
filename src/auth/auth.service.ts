import { Inject, Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { IUser } from '../users/interfaces/user.interfaces';
import { CryptoUtil } from '../utils/crypto.util';

@Injectable()
export class AuthService {
    constructor(
        @Inject(UserService) private readonly userService: UserService,
        @Inject(JwtService) private readonly jwtService: JwtService,
        @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil,
    ) { }

    async createToken(payload: { email: string }): Promise<string> {
        return this.jwtService.sign(payload);
    }

    async validateUser(payload: { email: string }): Promise<any> {
        return await this.userService.findOneByEmail(payload.email);
    }

    async login(email: string, password: string): Promise<IUser> {
        const user: IUser = await this.userService.findOneByEmail(email);
        if (!user) throw new HttpException('登录账号有误', 4000);
        if (!this.cryptoUtil.checkPassword(password, user.password)) throw new HttpException('登录密码有误', 4000);
        user.accessToken = await this.createToken({ email });
        delete user.password;
        return user;
    }
}