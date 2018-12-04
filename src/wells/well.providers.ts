import { Connection } from 'mongoose';
// 引入schema
import { WellSchema } from './schemas/well.schema';

export const wellsProviders = [
  {
    // 自己定义一个到时候在service.ts中注入
    provide: 'WellModelToken',
    // 使用CatSchema
    useFactory: (connection: Connection) => connection.model('Well', WellSchema),
    // DbConnectionToken是database.providers.ts里面的key
    inject: ['MongoDBConnection'],
  },
];