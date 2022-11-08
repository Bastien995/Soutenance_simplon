
const {DataTypes} = require ('sequelize');
const { sequelize } = require('.');

module.exports = (sequelize, Sequelize) => {
    const Logements = sequelize.define("logement", {

    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },    
    titre: {
        type: Sequelize.STRING
      },
    description: {
        type: Sequelize.STRING
      },
    prix: {
        type: Sequelize.INTEGER
      },
    });
    return Logements
  };
  
