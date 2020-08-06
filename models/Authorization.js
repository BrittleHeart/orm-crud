import Sequelize from 'sequelize'
import connection from '../config/database'
import Users from './User'

const Authorization = connection.define('authorizations', {
    authorizationId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    authorizedAt: {
        type: Sequelize.DATE,
        allowNull: false
    },

    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    },

    updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
})

Authorization.hasMany(Users)

export default Authorization
