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

    userId: {
        type: Sequelize.INTEGER,
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

Authorization.associate = models => {
    Authorization.hasOne(models.users, {foreignKey: 'userId'})
}

export default Authorization
