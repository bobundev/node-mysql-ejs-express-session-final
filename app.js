const express  = require('express')
,     app = express()
,     util = require('util')
,     mysql = require('mysql')
,     session = require('express-session')
,     connectFlash = require('connect-flash')
,     MySQLStore = require('express-mysql-session')(session)
,     port = 3500;

// DotEnv
require('dotenv').config()

// MySQL
const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:  process.env.DB_PASS,
    database: process.env.DB_NAME
  }
)

db.connect(
  (err) => {
    if (err) { throw err }
    console.log('Connecté au serveur MySQL');
  }
)

global.querysql = util.promisify(db.query).bind(db)

// Express Session MySQL
var sessionStore = new MySQLStore({}, db);

//Express session
app.use(session({
  name: 'biscuit',
  secret : 'secret',
  resave : true,
  saveUninitialized : true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 *24 // 24 heures
  }
}));


// EJS
app.set('view engine', 'ejs'); 

// Active les messages Flash
app.use(connectFlash());

// Static folder
app.use(express.static('public'));


// Middleware - BodyParser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Middleware
const verifyAuth = require('./middleware/verifyAuthMiddleware')

// Routes
const index = require('./routes/indexRoute')
const auth = require('./routes/authRoute')
const dashboard = require('./routes/dashboardRoute')

app.use('/auth', auth)
app.use('/dashboard',verifyAuth.getVerifyAuth, dashboard)
app.use('/', index)

app.get('*', function(req, res){
  res.render('404');
});


// Listen
app.listen(port, () => {
  console.log(`Le serveur tourne sur le port: ${port}`);
});