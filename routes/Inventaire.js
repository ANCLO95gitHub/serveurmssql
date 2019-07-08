'use strict';
let sql = require('mssql');
const Connection = require('tedious').Connection;  // ac: de Quick.js
const Request = require('tedious').Request;
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
    res.send('GET request to the homepage');
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
 //   console.log( "req.titi=" + titi);
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
  //console.log( "res.status=" + res.status);
  console.log( "ii=" + ii);

    let lareponse = { reponse: req.hostname };
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
  console.log('DEBUT  exports.getInventaire = function (req, res) {   req.param(id) ' + req.param('id') );
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
exports.pipeMsSQLtoMongo = function (reques, result, next) {
  req.header("content-type: application/json, 'Access-Control-Allow-Origin': '*' ");
  console.log('DEBUT  exports.pipeMsSQLtoMongo = function (req, res, next) {   req.param(id) ' + req.param('id') );
  res.header("content-type: application/json");
  let id = req.param('id').toString();
  pipeMsSQLtoMongo_async(res, MB, Forme);
  console.log(' FIN pipeMsSQLtoMongo (); complete');
}
//Pour un testing checkout
/*
asdf

 */
