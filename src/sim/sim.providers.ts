import { Connection } from 'mongoose';
// 引入schema
import { SimSchema } from './schemas/sim.schema';

export const simsProviders = [
  {
    provide: 'SimModelToken',
    useFactory: (connection: Connection) => connection.model('Sim', SimSchema),
    inject: ['MongoDBConnection'],
  },
];