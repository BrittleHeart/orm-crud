import Sequelize from 'sequelize'

const connection = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
})

export default connection