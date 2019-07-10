'use strict';
let express = require('express');
const http = require('http');
let inventaire = require('./routes/Inventaire');
let bodyParser = require("body-parser");
const cors = require('cors')

const corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
    credentials: true
};

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', process.env.PORT || 1337);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));


app.get('/', function (req, res) {
    console.log('DEBUT  public/index.html   res.sendFile (serveurmssql)Salut le Monde, Hello World!, Hola el Mundo')

    //res.sendFile(path.join(__dirname, 'public/index.html')); // views
    res.send('DEBUT  public/index.html   res.sendFile (serveurmssql)Salut le Monde, Hello World!, Hola el Mundo');
});

app.get('/', inventaire.getHome);
app.get('/getinventaire', inventaire.getInventaire);
app.get('/getinventaire/:id', inventaire.getInventaire);
app.post('/postkart', inventaire.postKart);
app.get('/getkart', inventaire.getKart);
app.post('/deletekart', inventaire.deleteKart)
app.post('/pipeMsSQLtoMongo', inventaire.pipeMsSQLtoMongo)


app.get('/getPoidsMetaux', inventaire.getPoidsMetaux);
app.get('/getWhoAmI', inventaire.getWhoAmI);
app.get('/setWhoAmI/:id', inventaire.setWhoAmI);
app.get('/logout', inventaire.logout);

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
http.createServer(app).listen(app.get('port'), function () {
    //res.writeHead(200, {"Content-Type": "text/plain"});
    console.log("Express server listening on port " + app.get('port'));
});

const port = process.env.PORT || 1337;
//server.listen(port);




console.log("Server running at http://localhost:%d", port);
