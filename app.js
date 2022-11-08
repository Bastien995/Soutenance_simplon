const express = require('express');
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const Connect = require('connect-pg-simple')
const session = require('express-session')
const app = express();
const uploadFeature = require('@adminjs/upload')
const dotenv = require ('dotenv');  
const port = process.env.PORT || 3001;
const AdminJSSequelize = require('@adminjs/sequelize')
const path = require ('path')
dotenv.config();

//Pour parser le content-type application/json
app.use(express.json())
//Pour parser le content-type application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');
const db = require("./models/");
const { villes, logement, quartiers, fichiers } = require('./models/');

const localProvider = {
    bucket: 'public/img',
    opts: {
      baseUrl: '/img',
    },
  };
  
  const fichier = {
    resource: fichiers,
    options: {
      properties: {
        s3Key: {
          type: 'string',
        },
        bucket: {
          type: 'string',
        },
        mime: {
          type: 'string',
        },

      },
    },

    features: [
      uploadFeature({
        properties: {
            key: 'path',
            filePath: 'imagePaths'
        },
        provider: { local: localProvider },
        validation: { mimeTypes: ['image/png','image/jpg','image/jpeg','application/pdf', 'audio/mpeg'] },
        multiple: true,
      }),
    
    ],
  };

const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    password: 'password',
  }
  AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database,
  })
  
  const start = async () => {
  
    const admin = new AdminJS({
        rootPath: '/admin',
        resources: [villes, logement, quartiers, fichier],
        database: []
    })
  
    const adminRouter = AdminJSExpress.buildRouter(
      admin,
      
    )
    app.use(admin.options.rootPath, adminRouter)
  
  }
  
start() 

db.sequelize.sync({ force: false })
  .then(() => {
    console.log("DB synchronisée");
  })
  .catch((err) => {
    console.log("Impossible de synchroniser la DB: " + err.message);
  });
 
require("./Routes/route")(app)

app.listen(port, ()=>{console.log(`Le seurveur tourne sur le port ${port}`);})