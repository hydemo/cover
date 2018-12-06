import { Connection } from 'mongoose';
// 引入schema
import { AlarmSchema } from './schemas/alarm.schema';
import { AudioFreSchema } from './schemas/audioFre.schema';
import { BatterySchema } from './schemas/battery.schema';
import { ConfigReportSchema } from './schemas/configReport.schema';
import { DeviceInfoSchema } from './schemas/deviceInfo.schema';
import { WellCoverSchema } from './schemas/wellCover.schema';

export const dataProviders = [
  {
    provide: 'AlarmModelToken',
    useFactory: (connection: Connection) => connection.model('Alarm', AlarmSchema),
    inject: ['MongoDBConnection'],
  },
  {
    provide: 'AudioFreModelToken',
    useFactory: (connection: Connection) => connection.model('AudioFre', AudioFreSchema),
    inject: ['MongoDBConnection'],
  },
  {
    provide: 'BatteryModelToken',
    useFactory: (connection: Connection) => connection.model('Battery', BatterySchema),
    inject: ['MongoDBConnection'],
  },
  {
    provide: 'ConfigReportModelToken',
    useFactory: (connection: Connection) => connection.model('ConfigReport', ConfigReportSchema),
    inject: ['MongoDBConnection'],
  },
  {
    provide: 'DeviceInfoModelToken',
    useFactory: (connection: Connection) => connection.model('DeviceInfo', DeviceInfoSchema),
    inject: ['MongoDBConnection'],
  },
  {
    provide: 'WellCoverModelToken',
    useFactory: (connection: Connection) => connection.model('WellCover', WellCoverSchema),
    inject: ['MongoDBConnection'],
  },
];