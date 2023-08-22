'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // name: DataTypes.STRING,  
    // email: DataTypes.STRING,
    // password: DataTypes.STRING,
    // address: DataTypes.STRING,
    // image :DataTypes.STRING
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type :Sequelize.STRING
      },
      salary: {
        type :Sequelize.STRING
      },
      address: {
        type :Sequelize.STRING
      },
      image: {
        type : Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};