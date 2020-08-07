import Sequelize from 'sequelize'
import connection from '../config/database'

const Comment = connection.define('comments', {
    commentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Comment",
    },

    content: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
})

export default Comment