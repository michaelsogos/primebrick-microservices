const OptimisticLockingSubscriber = require('primebrick-sdk')
  .OptimisticLockingSubscriber;

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'prime_brick',
  entities: ['dist/modules/**/entities/*.js'],
  synchronize: true,
  subscribers: [OptimisticLockingSubscriber],
  autoLoadEntities: true,
  migrationsTableName: 'db_migration_history',
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
