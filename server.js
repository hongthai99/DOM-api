const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
// models import
const list = require('./models/list');
//router import
//const listRoutes = require('./routes/api/lists');
//config
const config = require('config');


const app = express();
app.use(express.json()); // middleware

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  next();
});
// middleware
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false}));


// mongo config
const DB_URI = config.get('mongoURI');

// mongo connection
mongoose
    .connect(DB_URI)
    .then(() => console.log('MongoDB connected ... '))
    .catch(err => console.log(err));

//Use Routes get
app.use('/api/list', require('./routes/api/lists'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// port connection
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => console.log(`Server started ... `));
//
//
//
//
//Import api doc library
const SwaggerJsDoc = require('swagger-jsdoc');
const SwaggerUi = require('swagger-ui-express');
//swaggerDoc
//extended https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Remaining Task API-DOC',
        description: "List API of Remaining Tasks",
        contact: {
          name: "mai nem i sờ Thái",
          email: "thai@domedia.com",
        },
        server: ["localhost:8888"]
      }
    },
    // [.routes/api/lists.js]
    apis: ["server.js"]
  };
  const swaggerDocs = SwaggerJsDoc(swaggerOptions);
  app.use('/api-doc', SwaggerUi.serve, SwaggerUi.setup(swaggerDocs));
  //router


/**
 * @swagger
 * /api/list:
 *  get:
 *   tags:
 *    - List
 *   description: Use to request all list
 *   access: true
 *   responses:
 *    '200':
 *      description: A successful response
 *  post:
 *   tags:
 *    - Action
 *   description: Use to create list
 *   responses:
 *    '401':
 *      description: No Token and Authorrization denied
 *  put:
 *   tags:
 *    - Action
 *   description: Use to bulk update list
 *   responses:
 *    '401':
 *      description: No Token and Authorrization denied
 * /api/list/{id}:
 *  delete:
 *   tags:
 *    - Action
 *   description: Use to delete list
 *   responses:
 *    '401':
 *      description: No Token and Authorrization denied
 */


/**
 * @swagger
 * /api/auth/user:
 *  get:
 *   tags:
 *    - User
 *   description: Use to request a user
 *   security:
 *    - cookieAuth: []
 *   responses:
 *    '200':
 *      description: isAuthenticated True
 */

/**
 * @swagger
 * /api/auth:
 *  post:
 *   tags:
 *    - Login
 *   summary: Logs user into the system
 *   operationId: loginUser
 *   parameters:
 *    - name: email
 *      in: query
 *      description: The user name for login
 *      required: true
 *      schema:
 *       type: string
 *    - name: password
 *      in: query
 *      description: The password for login in clear text
 *      required: true
 *      schema:
 *       type: string
 *   responses:
 *    '200':
 *      description: successful operation
 *    '400':
 *      description: Invalid username/password supplied
 */