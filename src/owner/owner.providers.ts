import { Connection } from 'mongoose';
// 引入schema
import { OwnerSchema } from './schemas/owner.schema';

export const ownersProviders = [
  {
    provide: 'OwnerModelToken',
    useFactory: (connection: Connection) => connection.model('Owner', OwnerSchema),
    inject: ['MongoDBConnection'],
  },
];