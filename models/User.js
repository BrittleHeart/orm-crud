import Sequelize from 'sequelize'
import connection from '../config/database'

const Users = connection.define('users', {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Anonim'
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    },

    updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
    },

    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
})

export default Users