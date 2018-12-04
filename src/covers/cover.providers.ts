import { Connection } from 'mongoose';
// 引入schema
import { CoverSchema } from './schemas/cover.schema';

export const coversProviders = [
  {
    // 自己定义一个到时候在service.ts中注入
    provide: 'CoverModelToken',
    // 使用CatSchema
    useFactory: (connection: Connection) => connection.model('Cover', CoverSchema),
    // DbConnectionToken是database.providers.ts里面的key
    inject: ['MongoDBConnection'],
  },
];