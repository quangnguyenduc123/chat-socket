import Sequelize from 'sequelize'
import cls from 'continuation-local-storage'
import config from '../config/index.js'

const namespace = cls.createNamespace('transaction-namespace')
Sequelize.useCLS(namespace)

const sequelize = new Sequelize(
  config.DB_DATABASE,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: 'postgres',

    pool: {
      max: config.DB_POOL_MAX,
      acquire: config.DB_POOL_IDLE,
      idle: config.DB_POOL_ACQUIRE,
    },
    define: {
      underscored: false,
      freezeTableName: true,
      charset: 'utf8',
      dialectOptions: {
        useUTC: false,
        dateStrings: true,
        typeCast: true,
      },
      timestamps: false,
    },
    logging: true,
    timezone: config.TIMEZONE,
    protocol: 'postgres',
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
  }
)

export default sequelize
