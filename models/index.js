const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.logement = require("./logement.model.js")(sequelize, Sequelize);
db.villes = require("./ville.model")(sequelize, Sequelize);
db.quartiers = require("./quartier.model")(sequelize, Sequelize);
db.fichiers = require("./fichier.model")(sequelize, Sequelize);

db.quartiers.hasMany(db.logement);
db.logement.belongsTo(db.quartiers);

db.villes.hasMany(db.quartiers);
db.quartiers.belongsTo(db.villes)

module.exports = db; 