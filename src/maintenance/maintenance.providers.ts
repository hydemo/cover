import { Connection } from 'mongoose';
// 引入schema
import { MaintenanceSchema } from './schemas/maintenance.schema';

export const maintenancesProviders = [
  {
    provide: 'MaintenanceModelToken',
    useFactory: (connection: Connection) => connection.model('Maintenance', MaintenanceSchema),
    inject: ['MongoDBConnection'],
  },
];