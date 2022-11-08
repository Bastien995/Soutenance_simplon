const { villes, quartiers } = require("../models");
const db = require("../models");
const Villes = db.villes;
const Logements = db.logement
const Quartiers = db.quartiers

// Creer une ville
exports.createVille = async (req, res) => {
  const villes = {
    nom: req.body.nom,
  };


// Enregistre une ville dans la BDD
await Villes.create(villes)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Affiche toutes les villes de la BDD
exports.findAllVille =async (req, res) => {
  await Villes.findAll()
    .then(data => {
      res.render(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Affiche une ville a partir de son id
exports.findOneVille = async (req, res) => {
  const id = req.params.id;

    await Villes.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Mettre a jour une ville
exports.updateVille = (req, res) => {
  const id = req.params.id;

  Villes.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Villes was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Villes with id=${id}. Maybe Villes was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Villes with id=" + id
      });
    });
};

// Supprimer une ville dans la BDD
exports.deleteVille = (req, res) => {
  const id = req.params.id;

  Villes.destroy({
    where: { id: id }
  })
    .then(data => {
      if (data) {
        res.send({
          message: "Villes was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Villes with id=${id}. Maybe Villes was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Villes with id=" + id
      });
    });
};

// Supprimer toutes les villes dans la BDD
exports.deleteAllVille = (req, res) => {
  Villes.destroy({
    where: {},
    truncate: false
  })
    .then(data => {
      res.send({ message: `${data} Villes were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Villes."
      });
    });
};

// Creer un logement
exports.createLogement = async (req, res) => {
  const logement = {
    titre: req.body.titre,
    description: req.body.description,
    prix: req.body.prix,
    quartierId: req.body.quartierId
  };

await Logements.create(logement)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};
// Affiche tous les logements de la BDD
exports.findAllLogement =async (req, res) => {
  await Logements.findAll({
    include:[
      {
        model: Quartiers
      }
    ]
  })
    .then(data => {
      res.render('pages/logements.ejs', {data});
      console.log(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
// Affiche un logement a partir de son id
exports.findOneLogement = async (req, res) => {
  const id = req.params.id;

    await Logements.findByPk(id)
    .then(data => {
      if (data) {
        res.render('pages/logement.ejs',{data});
      } else {
        res.status(404).send({
          message: `impossible de trouver le logement avec l'id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};


//creer un quartier
exports.createQuartier = async (req, res) => {

  const quartier = {
    nom: req.body.nom,
    villeId: req.body.villeId
  };
  
// Enregistre un quartier dans la BDD
await Quartiers.create(quartier)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Affiche tous les quartiers de la BDD
exports.findAllQuartier = async (req, res) => {

  await Quartiers.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};