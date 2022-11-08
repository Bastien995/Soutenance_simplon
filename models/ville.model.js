module.exports = (sequelize, Sequelize) => {
    const villes = sequelize.define("ville", {
      nom: {
        type: Sequelize.STRING
      },
    });
  
    return villes;
  };