import { Inject, Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { IUser } from '../users/interfaces/user.interfaces';
import { CryptoUtil } from '../utils/crypto.util';
import { ApiErrorCode } from '../common/enum/api-error-code.enum';
import { ApiException } from '../common/expection/api.exception';

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
        if (!user) throw new ApiException('登陆账号有误', ApiErrorCode.ACCOUNT_INVALID, 406);
        if (user.isDeleted) throw new ApiException('账号已删除', ApiErrorCode.ACCOUNT_DELETED, 406);
        if (!this.cryptoUtil.checkPassword(password, user.password))
            throw new ApiException('密码有误', ApiErrorCode.PASSWORD_INVALID, 406);
        user.accessToken = await this.createToken({ email });
        delete user.password;
        return user;
    }
}