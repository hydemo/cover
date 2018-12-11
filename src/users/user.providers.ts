import { Connection } from 'mongoose';
// 引入schema
import { UserSchema } from './schemas/user.schema';

export const usersProviders = [
  {
    provide: 'UserModelToken',
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['MongoDBConnection'],
  },
];