import { Connection } from 'mongoose';
// 引入schema
import { DeviceSchema } from './schemas/device.schema';

export const devicesProviders = [
  {
    provide: 'DeviceModelToken',
    useFactory: (connection: Connection) => connection.model('Device', DeviceSchema),
    inject: ['MongoDBConnection'],
  },
];