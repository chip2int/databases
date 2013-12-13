var mysql = require('mysql');
var http = require("http");
//var requestHandler = require("./request-handler.js");
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  // password: "plantlife",
  database: "chatterboxdb"
});

//dbConnection.connect();
 //dbConnection.query("insert into rooms  values(1, 'ATL');");
// dbConnection.end();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */

/////////////////Server Code /////////////////////////////////////




// Request-handler//


var statusCode;

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  "Content-Type": "application/json"
};


var storage = {
  messages: [],

  storeData: function (chatMsg) {
    this.messages.push(chatMsg);
  },

  getData: function () {
    return this.messages;
  }
};

var actionListener = {
  'POST': function(request, response){
    console.log("POST");
    var data = '';
    request.on('data', function(chunk) {
      data += chunk;
    });

    //Split the data into username and message
    request.on('end', function(){
      var msgs = data.split('&');
      var uid;
      var uName = msgs[0].split('=')[1];
      var msg = msgs[1].split('=')[1];

      dbConnection.connect();
      dbConnection.query("insert into rooms  values(1, 'ATL');");

      //Insert Username and userid into chatterboxmain
      dbConnection.query("INSERT INTO chatterboxmain VALUES (101,'" + uName + "');");


      //Select the userid from the database for use in inserting msgs
      var queryString = "SELECT userid from chatterboxmain where username='" + uName + "';";
      var queryArgs = null;
      console.log("qString", queryString);


      dbConnection.query(queryString, queryArgs, function(err, results, fields){
        console.log("////These are from the Select Query////");
        console.log("err", err);
        uid = results[0].userid;
        console.log("results", uid);
        console.log("fields", fields);



      var entry =   "INSERT INTO messages VALUES (" + uid + ',"' + msg + '",' + "'2013-02-02'" + ", 1);";
      console.log("Entry -->", entry);

      dbConnection.query(entry);
      dbConnection.end();

    });
/*}
      var temp = JSON.parse(data);
      temp['createdAt'] = new Date();
      temp = JSON.stringify(temp);
      storage.storeData(temp);

*/
      statusCode = 201;
      response.writeHead(statusCode, headers);
      response.end("Hello");
      //response.end('[' + storage.getData() + ']');
      //dbConnection.end();
    });

  },
  'GET': function(request, response){
    console.log("here");
    var result = "";
    statusCode = 200;
    response.writeHead(statusCode, headers);

    var queryString = 'select * from messages;';
    dbConnection.query(queryString, null, function (err, results, fields) {
      result = results;


    console.log(result[0]);
    response.end(JSON.stringify(result[0]));
  });
  },

  'OPTIONS': function(request, response){
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(null));
    }
  };

var handleRequest = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  request.setEncoding('utf8');

  //response.writeHead(statusCode, headers);

  actionListener[request.method](request, response);

};


var port = 8085;
var ip = "127.0.0.1";
var server = http.createServer(handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);











