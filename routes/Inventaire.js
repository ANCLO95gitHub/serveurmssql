'use strict';
let sql = require('mssql');
const Connection = require('tedious').Connection;  // ac: de Quick.js
const Request = require('tedious').Request;
const fs = require('fs');
let aSession = []
let aSessionID = 'sid123'
let aInc = 1;
let sess = 'v';
// const TYPES = require('tedious').TYPES;

/// ac: de Quici.js
const config = {
    authentication: {
        options: {
            userName: 'andrec', // update me
            password: 'Bonjour1', // update me
            port: 1433
        },
        type: 'default'
    },
    server: 'srv-lrobo-sql-cloud.database.windows.net',
    database: 'LR_INV_CLOUD',
    options: {
        database: 'LR_INV_CLOUD', //update me
        encrypt: true
    },
    user:'andrec',
    password: 'Bonjour1',
    encrypt: true
};

// AC: ICI     /*****************************************************************************/
exports.getHome = function(request, response, next){
  console.log( "DEBUT          GET request to the homepage" );
  request.session.user = { 'id': 'abc123' };
  request.session.pageviews = 1;
  /////sess = JSON.stringify(request.session);
  sess = request.session;
    console.log('sess=' + sess );
  //request.session.user = 'edivasfdasdfqwf234t23g24g2g245gh245g2g';
    console.log('sess=', JSON.stringify(sess));
  //res.sendFile(path.join(__dirname, 'public/index.html')); // views
  //response.send('DEBUT  public/index.html   res.sendFile (serveurmssql)Salut le Monde, Hello World!, Hola el Mundo');

  response.status(200).send('GET request to the homepage ::sess=' + JSON.stringify(sess));
}
exports.getWhoAmI = function(req, res){
  console.log( "DEBUT  export.getWhoAmI = function(req, res){" );
  console.log( "req.DateTime=" + req.DateTime);
  console.log( "req.data=" + req.data);
  console.log( "req.hostname=" + req.hostname);
  console.log( "req.host=" + req.host);
  console.log( "req.client=" + req.client);
  console.log( "req.statusCode=" + req.statusCode);
  console.log( "req.statusMessage=" + req.statusMessage);

//  console.log( "JSON.stringifyreq.client=" + JSON.parse(req.client ) );
  let ii=0;
  for( let titi in req){
    //console.log( "req.titi=" + titi);
    ii++;
  }
  console.log( "ii=" + ii);

  console.log( "response");
  ii=0;
  for( let titi in res){
    //console.log( "res.titi=" + titi);
    ii++;
  }
  console.log( "res.socket=" + res.socket);
  //console.log( "res.getHeaders=" + res.getHeaders);
  console.log( "res.getAllResponseHeaders=" + res.getAllResponseHeaders );
  //console.log( "res.listenerCount=" + res.listenerCount);
  //console.log( "res.eventNames=" + res.eventNames);
  console.log( "res._eventsCount=" + res._eventsCount);
  console.log( "res._maxListeners=" + res._maxListeners);

  console.log( "res.sendDate=" + res.sendDate);
  console.log( "req.user=" + req.user);
  console.log( "res.user=" + res.user);
  console.log( "res.session=" + res.session);
  req.user = "abc123"
  res.user = "abc123"
  res.session = { session: "abc123" };
  console.log( "res.session=" + JSON.stringify(res.session));
  //console.log( "res.status=" + res.status);
  console.log( "ii=" + ii);

    let lareponse = { reponse: req.hostname, laSession: res.session};
    res.json(lareponse);

};
exports.setWhoAmI = function(req, res){
  res.header("content-type: application/json");
  console.log('findFormeById - Recherche de tous les findFormeById');
  let id = req.params.id;
  console.log( "req.params.id=" + id);
  id *= 3;
  let lareponse = { reponse:id };
  res.json(lareponse);

}

// let formData =[];
let connection = new Connection(config);
/*connection.on('connect', function(err) {
  // If no error, then good to proceed.
  console.log("Connected");
  executeStatement();
});*/

exports.getPoidsMetauxQ = function(req, res ) {
    console.log("DEBUT exports.getPoidsMetauxQ ");
    // Attempt to connect and execute queries if connection goes through
    connection.on('connect', function(err)
      {
          if (err)
          {
              console.log(err)
          }
          else
          {
              // eslint-disable-next-line no-undef
              console.log("AVANT queryDatabase(connection, res)");
              queryDatabase();  //(connection, res);
              console.log("APRES queryDatabase(connection, res)");
              //res.json({ status: true, PoidsMetaux: columns});
              //res.send(columns);
              //res.send( formData );
              //console.log("queryDatabase(connection);")
          }
      }
    );
    console.log("FIN exports.getPoidsMetauxQ ");
    let leRecordSet = `{"recordsets":[[{"NomMB":"Acier","DiminutifMB":"AC","NomForme":"Tube","DiminutifForme":"TU","ThickDiam":",125","OptionX":"2","OptionY":"4","OptionZ":"288","Grade":"","PoidsEnLivre":10},{
"NomMB":"Acier","DiminutifMB":"AC","NomForme":"Tube","DiminutifForme":"TU","ThickDiam":",25","OptionX":"2","OptionY":"4","OptionZ":"288","Grade":"","PoidsEnLivre":10}]],"recordset":[{"NomMB":"Acier","Diminu
tifMB":"AC","NomForme":"Tube","DiminutifForme":"TU","ThickDiam":",125","OptionX":"2","OptionY":"4","OptionZ":"288","Grade":"","PoidsEnLivre":10},{"NomMB":"Acier","DiminutifMB":"AC","NomForme":"Tube","Diminu
tifForme":"TU","ThickDiam":",25","OptionX":"2","OptionY":"4","OptionZ":"288","Grade":"","PoidsEnLivre":10}],"output":{},"rowsAffected":[2]}`
    console.log( "JSON.stringify(leRecordSet) =" + JSON.stringify(leRecordSet) )
    console.log( "JSON.parse(JSON.stringify(leRecordSet))) =" + JSON.parse(JSON.stringify(leRecordSet)) )
    //let retData = { status: true, PoidsMetaux: {recordset : JSON.parse(JSON.stringify(leRecordSet)) } };
    let retData = { status: true, PoidsMetaux: {recordset : JSON.parse(JSON.stringify(leRecordSet)).recordsets } };
    res.json(retData);
    return;
};

function queryDatabase()
{
    console.log('DEUBT ueryDatabase()   Reading rows from the Table...');
    // const Request = require('tedious').Request;

    // Read all rows from table
    // 'select * from PoidsMetaux',
    let leSelect ='select DISTINCT NomMB, DiminutifMB, NomForme, DiminutifForme, ThickDiam, OptionX, OptionY, OptionZ, Grade, 0 as PoidsEnLivre from SelecteurInventaire where ID <= 4000';
    //let leSelect = 'Select * from PoidsMetaux';
    let request = new Request(leSelect,
      function(err, rowCount, rows)
      {
          console.log(err + ' err returned');
          console.log(rowCount + ' rowCount(s) returned');
          console.log(rows + ' row(s) returned');
          //this.PoidsMetaux = rows;
          process.exit();
      }
    );
    var result = "";
    request.on('row', function(columns) {
        console.log('AVANT columns=' + columns);
        //console.log('AVANT columns.value=' + columns.value);
        //console.log('AVANT columns.metadata=' + columns.metadata);

        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
            //
            //result += column.value + ", ";
        });
        // return res.json({ status: true, PoidsMetaux: columns.recordset});
        console.log("result=%s=result", result);
        //console.log('AVANT columns.metadata=' + columns.metadata);
        //console.log('AVANT return columns;');
        //res.send(columns);
        //return columns;
    });
    connection.execSql(request);

    //session.endDialog();
    console.log('FIN ueryDatabase()   Reading rows from the Table...');
    return;
};
exports.getPoidsMetaux3 = function(req, res ) {
    console.log('DEUBT exports.getPoidsMetaux3 = function(req, res )');
    try{
        //sql.close();
        //sql.connect(config3);
        //   let leSelect ='select DISTINCT NomMB, DiminutifMB, NomForme, DiminutifForme, ThickDiam, OptionX, OptionY, OptionZ, Grade, 0 as PoidsEnLivre from SelecteurInventaire where ID <= 4000';
        const result =  sql.query`select DISTINCT NomMB, DiminutifMB, NomForme, DiminutifForme, ThickDiam, OptionX, OptionY, OptionZ, Grade, 0 as PoidsEnLivre from SelecteurInventaire where ID <= 4000`
        console.log(result);
    }catch(err){
        console.log(err);
    }
}
exports.getPoidsMetaux = function(req, res ) {
  console.log('DEUBT exports.getPoidsMetaux = function(req, res )');
  res.header("content-type: application/json");
  let id = req.param('id').toString();
  //if( !( id >=0 )){
  //  id=3100;  // ac: reviser
  //}
  let MB = id.toString().substr(0, 2);
  let Forme = id.toString().substr( 2);
  console.log('MB = ' + MB);
  console.log('Forme = ' + Forme );
  sql.close();
  console.log('avant toto()');
  getPoidsMetaux_async(res, MB, Forme);
  console.log('apres toto()');
}
async function getPoidsMetaux_async(res, MB, Forme)  {
  try {
    console.log('DEUBTasync function toto() ');
    // make sure that any items are correctly URL encoded in the connection string
    //let theConnect = 'mssql://andrec:Bonjour1@srv-lrobo-sql-cloud.database.windows.net/LR_INV_CLOUD;encrypt=true'
    let theConnect = 'mssql://andrec:Bonjour1@tcp:srv-lrobo-sql-cloud;databaseName=LR_INV_CLOUD;encrypt=true;integratedSecurity=true;trustServerCertificate=false'
    await sql.connect(config)
    const result = await sql.query`select DISTINCT NomMB, DiminutifMB, NomForme, DiminutifForme, ThickDiam, OptionX, OptionY, OptionZ, Grade, 0 as PoidsEnLivre from SelecteurInventaire where  DiminutifMB = ${MB} AND DiminutifForme = ${Forme}`
    console.log(result)
    //// let retData = { status: true, PoidsMetaux: {recordset : JSON.parse(JSON.stringify(result)).recordset } };
    let retData = { status: true, PoidsMetaux: result.recordset  };
    res.json(retData);
  } catch (err) {
    console.log("section catch")
    console.log(err)
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getInventaire = function (req, res) {
  ///console.log('DEBUT  exports.getInventaire = function (req, res) {   req.params.id=' + req.query.id);
  res.header("content-type: application/json");
  console.log('DEBUT  exports.getInventaire = function (req, res) {   req.param(id) ' + req.param('id') );
  console.log('exports.getInventaire      req.param(laSession) = ' +  req.param('laSession') );
  //let ediv = req.param('laSession').toString();
  let ediv = req.query.laSession;
  console.log('ediv=' + ediv );
  req.session.user = ediv;
  if( ediv === 'ediv'){
    ///create new session ID
    if( aSession.length == 0 ){
      aSession[0] = aSessionID;
    }else{
      //if( aSession.find( ediv ) ){      }

    }

    //return;
  }
  //console.log('---exports.getInventaire   req.params = ' + JSON.stringify( req.params) );

  //console.log('req.query.id=' + req.query.id );
  //console.log('req.query.laSession=' + req.query.laSession );
    let id = req.param('id').toString();
    /*
    let laSession = req.param('laSession').toString();
    console.log('exports.getInventaire    let laSession = ' + laSession );
    */
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    let ii=0;
    for( let titi in req){
    //  console.log( "req.titi=" + titi);
      ii++;
    }
  console.log('req.titi=sessionCookies=' + req.query.sessionCookies );
  console.log('req.titi=sessionOptions=' + req.query.sessionOptions );
  console.log('req.titi=sessionKey=' + req.query.sessionKey );
  console.log('req.titi=session=' + req.session );
  console.log('req.titi=session. stringify=' + JSON.stringify( req.session ) );
  console.log('req.titi=session.user=' + JSON.stringify( req.session.user ) );
  console.log('req.titi=session.secret=' + JSON.stringify( req.session.secret ) );
  console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
    //if( !( id >=0 )){
  //  id=3100;  // ac: reviser
  //}
    let MB = id.toString().substr(0, 2);
    let Forme = id.toString().substr( 2);
    console.log('MB = ' + MB);
    console.log('Forme = ' + Forme );
    sql.close();
    getInventaire_async(res, MB, Forme);
    console.log('getInventaire_async(res, MB, Forme); complete');
}
async function getInventaire_async(res, MB, Forme)  {
    try {
        console.log('DEUBTasync function getInventaire_async() ');
        // make sure that any items are correctly URL encoded in the connection string
        //let theConnect = 'mssql://andrec:Bonjour1@srv-lrobo-sql-cloud.database.windows.net/LR_INV_CLOUD;encrypt=true'
        let theConnect = 'mssql://andrec:Bonjour1@tcp:srv-lrobo-sql-cloud;databaseName=LR_INV_CLOUD;encrypt=true;integratedSecurity=true;trustServerCertificate=false'
        await sql.connect(config)
        ///ac: reviser le ID entre ticks
        ///const result = await sql.query`select DISTINCT * from SelecteurInventaire where ID <= ${id} AND DiminutifForme <> 'PL' `
        //const result = await sql.query`select DISTINCT * from SelecteurInventaire where DiminutifMB = ${MB} AND DiminutifForme = ${Forme}  `
      const result = await sql.query`select ID,
            InPurcId_ExPurcId,
            ExPurcId,
            NomMB,
            DiminutifMB,
            NomForme,
            DiminutifForme,
            ThickDiam,
            OptionX,
            OptionY,
            case when Modifier = 1 then OptionZ_modif when Morceler = 1 then OptionZ_modif else OptionZ  end as OptionZ,
            Grade,
            DescriptionCourte,
            DescriptionLongue,
            Montant,
            Modifier,
            Consommer
        from SelecteurInventaire where DiminutifMB = ${MB} AND DiminutifForme = ${Forme} AND Consommer = 0 AND Karted = 0 ORDER BY DescriptionCourte `

       // console.log(result)
        //// let retData = { status: true, PoidsMetaux: {recordset : JSON.parse(JSON.stringify(result)).recordset } };
        let retData = { status: true, InvenDet: result.recordset  };
        res.json(retData);
    } catch (err) {
        console.log("section catch")
        console.log(err)
    }
}

///// ICI le client place son choix dans son kart
exports.postKart = function( request, response){
  request.header("content-type: application/json, 'Access-Control-Allow-Origin': '*' ");
  console.log('DEBUT:: exports.postKart = function( request, response){   2 calls ....');
  console.log('req.body.ExPurcId=' + request.body.ExPurcId );
  sql.close();
  postKart_async( request.body.clientID, request.body.courriel, request.body.IDID, request.body.ExPurcId, request.body.laLongueur, request.body.Quantity, request.body.prix, request.body.OptionZ, request.body.response);
  ///sql.close();
  ///updateSelecteurInventaire_async( request.body.IDID, request.body.laLongueur, request.body.Quantity, response);
};
async function postKart_async(clientID, courriel, IDID, ExPurcId, laLongueur, Quantity, prix, OptionZ, response)  {
  try {
      let theConnect = 'mssql://andrec:Bonjour1@tcp:srv-lrobo-sql-cloud;databaseName=LR_INV_CLOUD;encrypt=true;integratedSecurity=true;trustServerCertificate=false'
      await sql.connect(config)
      //console.log('POST req.body.ExPurcId=' + request.body.ExPurcId );
      //let ls_sql = `INSERT INTO dbo.Kart( InPurcId_ExPurcId ) VALUES( '${clientID}' ) `;
      //const result = await sql.query `${ls_sql}`;
      console.log('Quantity=' + Quantity );
    //for( let jj = 1 ; jj <= +Quantity ; jj++ ){
      console.log("postKart_async ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ");
      const result = await sql.query`INSERT INTO dbo.Kart( clientID, courriel, IDID, InPurcId_ExPurcId, Longueur, Quantity, prix  ) VALUES( ${clientID},${courriel},${IDID},${ExPurcId},${laLongueur},${Quantity},${prix}  ) `;
      console.log(result)
      //}


    let resultat = (+laLongueur * +Quantity);
    console.log("updateSelecteurInventaire_async::resultat=" + resultat)
    let lbConsommer = false
    if( resultat >= +OptionZ){ []
      lbConsommer = true
    }
    const result2 = await sql.query`UPDATE  dbo.SelecteurInventaire set  Consommer = ${lbConsommer},  Karted = 1, Morceler = 1, OptionZ_modif = (OptionZ_modif - ${resultat} ) where ID = ${IDID} `;
    console.log(result2)
      //// let retData = { status: true, PoidsMetaux: {recordset : JSON.parse(JSON.stringify(result)).recordset } };
      let retData = { "status": true }; //, "valDeRetour": result.recordset
      //response.JSON(retData);
  } catch (err) {
      console.log("section catch  du postKart_async")
      console.log(err)
  }
};
async function updateSelecteurInventaire_async(  IDID, laLongueur, Quantity, response)  {
  try {
    let theConnect = 'mssql://andrec:Bonjour1@tcp:srv-lrobo-sql-cloud;databaseName=LR_INV_CLOUD;encrypt=true;integratedSecurity=true;trustServerCertificate=false'
    await sql.connect(config)
    //console.log('POST req.body.ExPurcId=' + request.body.ExPurcId );
    //let ls_sql = `INSERT INTO dbo.Kart( InPurcId_ExPurcId ) VALUES( '${clientID}' ) `;
    //const result = await sql.query `${ls_sql}`;
    let resultat = (+laLongueur * +Quantity);
    console.log("updateSelecteurInventaire_async::resultat=" + resultat)
    const result = await sql.query`UPDATE  dbo.SelecteurInventaire set Karted = 1, Morceler = 1, OptionZ_modif = (OptionZ_modif - ${resultat} ) where ID = ${IDID} `;
    console.log(result)
    //// let retData = { status: true, PoidsMetaux: {recordset : JSON.parse(JSON.stringify(result)).recordset } };
    let retData = { "status": true }; //, "valDeRetour": result.recordset
    //response.JSON(retData);
    sql.close();
  } catch (err) {
    console.log("section catch  du updateKarted_async")
    console.log(err)
  }
};

exports.getKart = function (req, res) {
  req.header("content-type: application/json, 'Access-Control-Allow-Origin': '*' ");
  ///console.log('DEBUT  exports.getInventaire = function (req, res) {   req.params.id=' + req.query.id);
  console.log('DEBUT  exports.getKart = function (req, res)' );
  res.header("content-type: application/json");
  //let id = req.param('id').toString();
  //if( !( id >=0 )){
  //  id=3100;  // ac: reviser
  //}
  //let MB = id.toString().substr(0, 2);
  //let Forme = id.toString().substr( 2);
  //console.log('MB = ' + MB);
  //console.log('Forme = ' + Forme );
  sql.close();
  getKart_async(res);
  console.log('getInventaire_async(res, MB, Forme); complete');
}
async function getKart_async(res)  {
  try {
    // AC: TODO faire une restriction par client
    console.log('DEBUT async function Kart() ');
    // make sure that any items are correctly URL encoded in the connection string
    //let theConnect = 'mssql://andrec:Bonjour1@srv-lrobo-sql-cloud.database.windows.net/LR_INV_CLOUD;encrypt=true'
    let theConnect = 'mssql://andrec:Bonjour1@tcp:srv-lrobo-sql-cloud;databaseName=LR_INV_CLOUD;encrypt=true;integratedSecurity=true;trustServerCertificate=false'
    await sql.connect(config)
    const result = await sql.query`select DISTINCT Kart.ID, clientID, courriel, IDID, Kart.InPurcId_ExPurcId, SelecteurInventaire.NomMB, SelecteurInventaire.NomForme, Longueur, Quantity, prix, vendu, DateTime from Kart left outer join SelecteurInventaire on kart.IDID = SelecteurInventaire.ID where Quantity != -1 ORDER BY Kart.ID  `
    //console.log(result)
    //// let retData = { status: true, PoidsMetaux: {recordset : JSON.parse(JSON.stringify(result)).recordset } };
    let retData = { status: true, KartMetaux: result.recordset  };
    res.json(retData);
    sql.close();
  } catch (err) {
    console.log("getKart_async(res::section catch")
    console.log(err)
  }
};

exports.deleteKart = function( request, response){
  console.log('req.body.ExPurcId=' + request.body.IDID );
  sql.close();
  deleteKart_async( request.body.IDID );
};
async function deleteKart_async(IDID){
  try{
    console.log('DEBUT deleteKart_async() ');
    let theConnect = 'mssql://andrec:Bonjour1@tcp:srv-lrobo-sql-cloud;databaseName=LR_INV_CLOUD;encrypt=true;integratedSecurity=true;trustServerCertificate=false'
    await sql.connect(config)
    const result = await sql.query`UPDATE dbo.Kart Set Quantity = -1 Where IDID = ${IDID} `
    console.log(result)

  } catch( err ){
    console.log("getKart_async(res::section catch  1er UPDATE  dbo.Kart")
    console.log(err)
  }

  try{
    const result2 = await sql.query`UPDATE dbo.SelecteurInventaire  set Karted = 0 where ID = ${IDID} `;
    console.log(result2)
    sql.close();
  }
  catch( err ){
    console.log("getKart_async(res::section catch  2ieme UPDATE  dbo.SelecteurInventaire")
    console.log(err)
  }

};


exports.logout = function(request, response, next){
   /*, next*/
    return response.redirect('/');

    /*if (request.session) {
        // delete session object
        request.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return response.redirect('/');
            }
        });
    }*/
};

/*****************************************************************************/
//string connectionUrl =  "jdbc:sqlserver://localhost:1433;databaseName=AdventureWorks;integratedSecurity=true;encrypt=true; trustServerCertificate=false;trustStore=storeName;trustStorePassword=storePassword";
/*****************************************************************************/
/*****************************************************************************/
exports.pipeMsSQLtoMongo = function (request, result, next) {
  request.header("content-type: application/json, 'Access-Control-Allow-Origin': '*' ");
  console.log('DEBUT  exports.pipeMsSQLtoMongo = function (req, res, next) {   req.param(id) ' + request.param('id') );
  result.header("content-type: application/json");
  let id = request.param('IDID').toString();
  sql.close();
  pipeMsSQLtoMongo_async();
  console.log(' FIN pipeMsSQLtoMongo (); complete');
}
//Pour un testing checkout
/*
asdf

 */
async function pipeMsSQLtoMongo_async(){
  try{
    console.log('DEUBTasync function pipeMsSQLtoMongo_async() ');
    // make sure that any items are correctly URL encoded in the connection string
    //let theConnect = 'mssql://andrec:Bonjour1@srv-lrobo-sql-cloud.database.windows.net/LR_INV_CLOUD;encrypt=true'
    let theConnect = 'mssql://andrec:Bonjour1@tcp:srv-lrobo-sql-cloud;databaseName=LR_INV_CLOUD;encrypt=true;integratedSecurity=true;trustServerCertificate=false'
    await sql.connect(config)
    ///ac: reviser le ID entre ticks
    ///const result = await sql.query`select DISTINCT * from SelecteurInventaire where ID <= ${id} AND DiminutifForme <> 'PL' `
    //const result = await sql.query`select DISTINCT * from SelecteurInventaire where DiminutifMB = ${MB} AND DiminutifForme = ${Forme}  `
    const result = await sql.query`select ID,
             InPurcId_ExPurcId,
             ExPurcId,
           NomMB,
           DiminutifMB,
           NomForme,
           DiminutifForme,
             ThickDiam,
             OptionX,
             OptionY,
             case when Modifier = 1 then OptionZ_modif when Morceler = 1 then OptionZ_modif else OptionZ  end as OptionZ,
             Grade,
           DescriptionCourte,
           DescriptionLongue,
           Montant,
             Modifier,
             Consommer
        from SelecteurInventaire
         WHERE ( DiminutifForme != 'PL' ) AND Consommer = 0 AND Karted = 0  
        ORDER BY DescriptionCourte `

    // console.log(result)
    //// let retData = { status: true, PoidsMetaux: {recordset : JSON.parse(JSON.stringify(result)).recordset } };
    let retData = { status: true, InvenDet: result.recordset  };
   // res.json(retData);
    /*AC: faire ecriture en JSON ici */
    let leFichier = `${__dirname}/testdata.json`;
    console.log( __dirname );
    console.log( __filename );
    fs.writeFileSync(leFichier, `{ \n "products":[ \n`);
    console.log('Boucler ');
    console.log('Boucler   result.recordset.length=' + result.recordset.length );
    for( let unRecord in result.recordset){
      console.log(unRecord);
      //console.log(result.recordset[unRecord]);
      //console.log(result.recordset[unRecord].NomMB);
      fs.appendFileSync(leFichier, "{ \n" );
      fs.appendFileSync(leFichier,`"productPermalink":  "${result.recordset[unRecord].DiminutifMB} ${result.recordset[unRecord].DiminutifForme}", \n` );
      fs.appendFileSync(leFichier, `"productTitle":  "${result.recordset[unRecord].NomMB} ${result.recordset[unRecord].NomForme}", \n`);
      fs.appendFileSync(leFichier, `"productPrice":  "${result.recordset[unRecord].Montant}", \n`);
      fs.appendFileSync(leFichier, `"productDescription":  "<p style=\\"margin-bottom: 25px; text-rendering: optimizeLegibility;\\">  bla ble bli  DescriptionLongue .<\\/p><ul class=\\"tabs-content\\" style=\\"margin-right: 0px; margin-bottom: 25px; margin-left: 20px; padding: 0px; text-rendering: optimizeLegibility;\\"><li style=\\"margin-bottom: 0px;\\">  DescriptionCourte  .<\\/li><\\/ul>", \n`);
      fs.appendFileSync(leFichier, `"productPublished":  "true", \n`);

      fs.appendFileSync(leFichier, `"productTags":  "${result.recordset[unRecord].DiminutifMB}, ${result.recordset[unRecord].DiminutifForme}, ${result.recordset[unRecord].NomMB}, ${result.recordset[unRecord].NomForme}, ${result.recordset[unRecord].DescriptionCourte}, ${result.recordset[unRecord].DescriptionLongue}", \n`);
      fs.appendFileSync(leFichier, `"productOptions": "{\\"Size\\":{\\"optName\\":\\"Size\\",\\"optLabel\\":\\"Select size\\",\\"optType\\":\\"select\\",\\"optOptions\\":[\\"S\\",\\"M\\",\\"L\\",\\"XL\\"]},\\"Colour\\":{\\"optName\\":\\"Colour\\",\\"optLabel\\":\\"Select colour\\",\\"optType\\":\\"select\\",\\"optOptions\\":[\\"Harvest\\",\\"Navy\\"]}}", \n`);
      fs.appendFileSync(leFichier, `"productImage":   "/uploads/Metaux/${result.recordset[unRecord].DiminutifMB}${result.recordset[unRecord].DiminutifForme}.jpg",\n`);
      fs.appendFileSync(leFichier, `"productStock": 1 \n` );

      ///ac: ici verifier si c est le dernier item pour ne pas ecrire virgule
      if( unRecord < ( result.recordset.length - 1 )){
        fs.appendFileSync(leFichier, "}, \n" );
      }else{
        fs.appendFileSync(leFichier, "} \n" );
      }
      ////if( unRecord > 10 ){        break;      }
    }
    fs.appendFileSync(leFichier, `], \n`);
    /*ac: partie de l origine */
    fs.appendFileSync(leFichier, ` \n `);
    fs.appendFileSync(leFichier, `     "customers": [ \n `);
    fs.appendFileSync(leFichier, `         { \n `);
    fs.appendFileSync(leFichier, `             "email" : "test@test.com", \n `);
    fs.appendFileSync(leFichier, `             "firstName" : "Testy", \n `);
    fs.appendFileSync(leFichier, `             "lastName" : "Cles", \n `);
    fs.appendFileSync(leFichier, `             "address1" : "1 test street", \n `);
    fs.appendFileSync(leFichier, `             "address2" : "testvile", \n `);
    fs.appendFileSync(leFichier, `             "country" : "Netherlands", \n `);
    fs.appendFileSync(leFichier, `             "state" : "", \n `);
    fs.appendFileSync(leFichier, `             "postcode" : "2000TW", \n `);
    fs.appendFileSync(leFichier, `             "phone" : "123456789", \n `);
    fs.appendFileSync(leFichier, `             "password" : "$2a$10$kKjnX1J/CAdgdmLI0WuPY.ILH1c7N8mD0H/ZyUXEfee1mJxJvZIS." \n `);
    fs.appendFileSync(leFichier, `         } \n `);
    fs.appendFileSync(leFichier, `     ], \n `);
    fs.appendFileSync(leFichier, `     "users": [ \n `);
    fs.appendFileSync(leFichier, `         { \n `);
    fs.appendFileSync(leFichier, `             "usersName" : "test", \n `);
    fs.appendFileSync(leFichier, `             "userEmail" : "test@test.com", \n `);
    fs.appendFileSync(leFichier, `             "userPassword" : "$2a$10$7jQx/hQOWrRni531b/dHRuH8o1ZP8Yo8g..GpTOF4M7RrEH/pzTMy", \n `);
    fs.appendFileSync(leFichier, `             "isAdmin" : true \n `);
    fs.appendFileSync(leFichier, `         } \n `);
    fs.appendFileSync(leFichier, `     ], \n `);
    fs.appendFileSync(leFichier, `     "orders": [ \n `);
    fs.appendFileSync(leFichier, `         { \n `);
    fs.appendFileSync(leFichier, `             "orderPaymentId" : "ch_1ElPw5L7TBqK1az83hbmOFuJ", \n `);
    fs.appendFileSync(leFichier, `             "orderPaymentGateway" : "Stripe", \n `);
    fs.appendFileSync(leFichier, `             "orderPaymentMessage" : "Payment complete.", \n `);
    fs.appendFileSync(leFichier, `             "orderTotal" : 310, \n `);
    fs.appendFileSync(leFichier, `             "orderEmail" : "test@test.com", \n `);
    fs.appendFileSync(leFichier, `             "orderFirstname" : "Testy", \n `);
    fs.appendFileSync(leFichier, `             "orderLastname" : "Cles", \n `);
    fs.appendFileSync(leFichier, `             "orderAddr1" : "1 test street", \n `);
    fs.appendFileSync(leFichier, `             "orderAddr2" : "testvile", \n `);
    fs.appendFileSync(leFichier, `             "orderCountry" : "Netherlands", \n `);
    fs.appendFileSync(leFichier, `             "orderState" : "SA", \n `);
    fs.appendFileSync(leFichier, `             "orderPostcode" : "2000TW", \n `);
    fs.appendFileSync(leFichier, `             "orderPhoneNumber" : "123456789", \n `);
    fs.appendFileSync(leFichier, `             "orderComment" : "", \n `);
    fs.appendFileSync(leFichier, `             "orderStatus" : "Paid", \n `);
    fs.appendFileSync(leFichier, `             "orderProducts" : [] \n `);
    fs.appendFileSync(leFichier, `         }, \n `);
    fs.appendFileSync(leFichier, `         { \n `);
    fs.appendFileSync(leFichier, `             "orderPaymentId" : "ch_1ElPw5L7TBqK1az83hbmOFuJ", \n `);
    fs.appendFileSync(leFichier, `             "orderPaymentGateway" : "Stripe", \n `);
    fs.appendFileSync(leFichier, `             "orderPaymentMessage" : "Payment complete.", \n `);
    fs.appendFileSync(leFichier, `             "orderTotal" : 310, \n `);
    fs.appendFileSync(leFichier, `             "orderEmail" : "test@test.com", \n `);
    fs.appendFileSync(leFichier, `             "orderFirstname" : "Testy", \n `);
    fs.appendFileSync(leFichier, `             "orderLastname" : "Cles", \n `);
    fs.appendFileSync(leFichier, `             "orderAddr1" : "1 test street", \n `);
    fs.appendFileSync(leFichier, `             "orderAddr2" : "testvile", \n `);
    fs.appendFileSync(leFichier, `             "orderCountry" : "Netherlands", \n `);
    fs.appendFileSync(leFichier, `             "orderState" : "SA", \n `);
    fs.appendFileSync(leFichier, `             "orderPostcode" : "2000TW", \n `);
    fs.appendFileSync(leFichier, `             "orderPhoneNumber" : "123456789", \n `);
    fs.appendFileSync(leFichier, `             "orderComment" : "", \n `);
    fs.appendFileSync(leFichier, `             "orderStatus" : "Declined", \n `);
    fs.appendFileSync(leFichier, `             "orderProducts" : [] \n `);
    fs.appendFileSync(leFichier, `         } \n `);
    fs.appendFileSync(leFichier, `     ], \n `);
    fs.appendFileSync(leFichier, `     "menu": { \n `);
    fs.appendFileSync(leFichier, `         "items": [ \n `);
    fs.appendFileSync(leFichier, `             { \n `);
    fs.appendFileSync(leFichier, `                 "title" : "Backpacks", \n `);
    fs.appendFileSync(leFichier, `                 "link" : "/category/backpack", \n `);
    fs.appendFileSync(leFichier, `                 "order" : 0 \n `);
    fs.appendFileSync(leFichier, `             }, \n `);
    fs.appendFileSync(leFichier, `             { \n `);
    fs.appendFileSync(leFichier, `                 "title" : "Boots", \n `);
    fs.appendFileSync(leFichier, `                 "link" : "/category/boots", \n `);
    fs.appendFileSync(leFichier, `                 "order" : 1 \n `);
    fs.appendFileSync(leFichier, `             }, \n `);
    fs.appendFileSync(leFichier, `             { \n `);
    fs.appendFileSync(leFichier, `                 "title" : "Acier", \n `);
    fs.appendFileSync(leFichier, `                 "link" : "/category/acier", \n `);
    fs.appendFileSync(leFichier, `                 "order" : 2 \n `);
    fs.appendFileSync(leFichier, `             }, \n `);
    fs.appendFileSync(leFichier, `             { \n `);
    fs.appendFileSync(leFichier, `                 "title" : "Aluminium", \n `);
    fs.appendFileSync(leFichier, `                 "link" : "/category/aluminium", \n `);
    fs.appendFileSync(leFichier, `                 "order" : 3 \n `);
    fs.appendFileSync(leFichier, `             }, \n `);
    fs.appendFileSync(leFichier, `             { \n `);
    fs.appendFileSync(leFichier, `                 "title" : "StainLess Steal", \n `);
    fs.appendFileSync(leFichier, `                 "link" : "/category/stainlesssteal", \n `);
    fs.appendFileSync(leFichier, `                 "order" : 4 \n `);
    fs.appendFileSync(leFichier, `             } \n `);
    fs.appendFileSync(leFichier, `         ] \n `);
    fs.appendFileSync(leFichier, `     } \n `);
    fs.appendFileSync(leFichier, ` } \n `);

    sql.close();
  } catch (err) {
    console.log("section catch")
    console.log(err)
  }

};

exports.getCookieResultat = function (request, result, next) {
  console.log( "\nDEBUT exports.getCookieResultat" );
  console.log('request.session.user=' + JSON.stringify( request.session.user ) );
  console.log('JSON.stringify(request)=', JSON.stringify(request.query));
  console.log('sess=', JSON.stringify(sess));
  let id = request.param('id').toString();
  console.log( "===>>>request.params.id=" + id);
  console.log( '\n');
  console.log('request.params=', request.params);  //ac:OK
  console.log('request.body=', request.body);
  console.log('request.query=', request.query);
//  console.log( "request.user=" + request.user);
//  console.log( "request.session=" + JSON.stringify(request.session));

//  console.log('req.titi=session.secret=' + JSON.stringify( request.session.secret ) );
  //request.session

  /*
  let ii=0;
  for( let unItem in request){
      //console.log( "req.unItem=" + unItem);
    //console.log( unItem +"=req.param="+request.param('unItem') );
    //console.log( unItem +"=="+request.param('unItem') );
    //console.log("");
    ii++;
  }*/
 /////result.send('GET getCookieResultat');
  return result.status(200).send("Welcome to super-s = " + JSON.stringify( request.session ));

}
/* commentaire en FIN */
/*
git add .
git commit -m " ecrire message"
git push origin master
*/
