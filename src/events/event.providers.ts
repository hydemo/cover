import { Connection } from 'mongoose';
import { WarningSchema } from './schemas/warning.schema';
// 引入schema

export const eventProviders = [
  {
    provide: 'WarningModelToken',
    useFactory: (connection: Connection) => connection.model('Warning', WarningSchema),
    inject: ['MongoDBConnection'],
  },
];