module.exports = (sequelize, Sequelize)=>{
    const Fichiers = sequelize.define("fichier", {
        s3Key: {
            type: Sequelize.STRING
          },
        bucket: {
            type: Sequelize.STRING
          },
        mime: {
            type: Sequelize.STRING
          },  
      });
      return Fichiers
}