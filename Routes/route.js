const { logement } = require("../models");

module.exports = app => {
    const ville = require("../controllers/logements.controller");
    const logement = require("../controllers/logements.controller");
    const quartier = require("../controllers/logements.controller");

    var router = require("express").Router();
  
    // Routes pour les ville
    router.get("/allVille", ville.findAllVille);
    router.post("/addVille", ville.createVille);
    router.put('/updateVille/:id', ville.updateVille)
    router.delete('/deleteOneVille/:id', ville.deleteVille)
    router.delete('/deleteAllVille/', ville.deleteAllVille)

    // Routes pour les logement
    router.get('/allLogement', logement.findAllLogement)
    router.get('/contact', (req, res)=>{
        res.render('pages/contact.ejs')
    })
    router.get('/contact', (req, res)=>{
        res.render('pages/index.ejs')
    })
    router.post('/addLogement', logement.createLogement)
    router.get('/allLogement_:id', logement.findOneLogement);

    // Routes pour les quartier
    router.get('/getAllQuartier', quartier.findAllQuartier)
    router.post('/addQuartier', quartier.createQuartier)

    app.use('/api', router)
}