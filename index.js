'use strict';
let express = require('express');
const http = require('http');
let inventaire = require('./routes/Inventaire');
let bodyParser = require("body-parser");
const cors = require('cors')
const keys = require('./config/keys');
const passport = require('passport');
const session = require('express-session');
const cookieSession = require('cookie-session');
//const paypal = require('paypal-rest-sdk');

//const router = express.Router()
/////npm install vue-cookie --save
// Require dependencies
if( 1 == 2 ){  ////ac: serveur cloud azure pas content
let Vue = require('vue');
let VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);
}
// methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
const corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST',  'DELETE'],
    credentials: true
};

let app = express();
let jsonParser = bodyParser.json();
let  urlencodedParser = bodyParser.urlencoded({extended: false});
//app.use(session( {secret:"abc123", resave:false,saveUninitialized:true}));
//app.use(session( {secret:"abc123"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', process.env.PORT || 1337);

if( 1 === 1 ){
    app.use(cors(corsOptions));

    app.use(cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [keys.session.cookieKey]
    }));
    //initialize passport
    app.use(passport.initialize());
    app.use(passport.session());
}
/*
app.get('/', function (req, res) {
    console.log('DEBUT  public/index.html   res.sendFile (serveurmssql)Salut le Monde, Hello World!, Hola el Mundo')
    //res.sendFile(path.join(__dirname, 'public/index.html')); // views
    res.send('DEBUT  public/index.html   res.sendFile (serveurmssql)Salut le Monde, Hello World!, Hola el Mundo');
}); */
/** ***/
app.get('/', inventaire.getHome);
app.get('/getWhoAmI', inventaire.getWhoAmI);
app.get('/getinventaire', inventaire.getInventaire);
app.get('/getinventaire/:id&:laSession', inventaire.getInventaire);

app.post('/postkart',  inventaire.postKart); //urlencodedParser,
app.get('/getkart', inventaire.getKart);
app.get('/getkart/:id', inventaire.getKart);
app.get('/isClientID', inventaire.isClientID);
app.get('/isClientID/:id', inventaire.isClientID);


app.post('/deletekart', inventaire.deleteKart)
app.post('/pipeMsSQLtoMongo', inventaire.pipeMsSQLtoMongo)
app.get('/getPoidsMetaux', inventaire.getPoidsMetaux);

app.get('/setWhoAmI/:id', inventaire.setWhoAmI);
app.get('/logout', inventaire.logout);
app.get('/getCookieResultat/:id', inventaire.getCookieResultat);
app.post('/createAccount', inventaire.createAccount);

app.post('/send-email', inventaire.sendEmail );

app.post('/paymentAuthorized', inventaire.paymentAuthorized );
app.post('/paymentCompleted', inventaire.paymentCompleted );
app.post('/paymentCancelled', inventaire.paymentCancelled );

////// PAYPAL



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found (Voir dans server.js)');
    err.status = 404;
    next(err);
});

//const server = http.createServer((request, response) => {
//    response.writeHead(200, {"Content-Type": "text/plain"});
//    response.end("(serveurmssql)Salut le Monde, Hello World!, Hola el Mundo");
//});
console.log( "app.get('port')", app.get('port') );
http.createServer(app).listen(app.get('port'), function () {
    //res.writeHead(200, {"Content-Type": "text/plain"});
    console.log("Express server listening on port " + app.get('port'));
});

const port = process.env.PORT || 1337;
///// server.listen(port);


console.log("Server running at http://localhost:%d", port);
