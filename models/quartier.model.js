module.exports = (sequelize, Sequelize) => {
    const Quartiers = sequelize.define("quartier", {
      nom: {
        type: Sequelize.STRING
      }
    });
  
    return Quartiers;
  };