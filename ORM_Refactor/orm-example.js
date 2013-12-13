/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chatServerDB", "root");
/* TODO this constructor takes the  database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = sequelize.define('User', {
  user_name: Sequelize.STRING
});

var Message = sequelize.define('Message', {
  message: Sequelize.STRING
});

User.sync({force: true}).complete(function(err){
  if(!!err){console.log(err);}
  else {console.log("User Table creation worked!");}
});
Message.sync({force: true}).complete(function(err){
  if(!!err){console.log(err);}
  else {console.log("Message Table creation worked!");}
});
User.hasOne(Message);

///////////////////////////////////////////POST
var insertMsgFromUser = function(user, message) {
  User.build({
      user_name: user
    }).save().success(function(queryResult){
      var uid = queryResult["dataValues"].id;
      Message.build({UserId:uid, message: message}).save();
    });
};

insertMsgFromUser("Romeo", "Hey Juliet!");
insertMsgFromUser("Dracula", "Blood!!");

/////////////////////////////////////////////GET
Message.findAll().complete(function(err, findQueryResult){
  console.log("here");
  console.log(findQueryResult);
});


