'use strict';

import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'MongoDBConnection',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb://localhost:27017/corver'),
  },
];