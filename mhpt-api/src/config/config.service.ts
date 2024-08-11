import * as PostgresConnectionStringParser from 'pg-connection-string';
import { DataSourceOptions } from 'typeorm';

import { User } from '../user/entities/user.entity';
import { Record } from '../record/entities/record.entity';

export default () => {
  const connectionOptions = PostgresConnectionStringParser.parse(
    process.env.DATABASE_URL,
  );
  // Check typeORM documentation for more information.
  const dbConfig: DataSourceOptions = {
    type: 'postgres',
    host: connectionOptions.host,
    port: Number(connectionOptions.port),
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database,
    // TODO should use entities path url, not using entities themselves
    entities: [User, Record],

    // We are using migrations, synchronize should be set to false.
    // TODO: At the moment, using synchronize option
    synchronize: true,

    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    migrationsRun: false,
    logging: false,
    logger: 'file',
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  };

  return {
    dbConfig,
  };
};
