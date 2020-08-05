'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Users',
          key: 'userId',
          as: 'userId'
        }
      },
      bannedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bans');
  }
};
