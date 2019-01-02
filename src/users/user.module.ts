import { Module, MulterModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { join } from 'path';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { usersProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';
import { CryptoUtil } from '../utils/crypto.util';

@Module({
  providers: [
    UserService,
    CryptoUtil,
    ...usersProviders,
  ],
  exports: [UserService],
  controllers: [UserController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 24 * 60 * 60,
      },
    }),
    MulterModule.registerAsync({
      useFactory: () => {
        const uploadPath = join(__dirname, '../..', 'upload');
        const storage = diskStorage({
          destination: uploadPath
          , filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
          },
        });
        return { storage };
      },
    }),
    DatabaseModule,
  ],
})

export class UserModule { }
