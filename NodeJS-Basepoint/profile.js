//This is practice by creating a simple way to look at a user's badge count and JavaScript points 
//Solve it by using Node.js to connect to Treehouse's API to get profile information to print out
var http = require("http");

//This is for printing out the message
function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
  console.log(message);
}
//This would be for printing out any error messages
function printError(error){
  console.error(error.message);
}

function get(username) {
  //Connect to the API URL
  var request = http.get("http://teamtreehouse.com/" + username + ".json", function(response) {
    var body = "";
      
    //Here the app will read the data
      response.on('data', function (chunk) {
        body += chunk;
     });
    response.on('end', function(){
      if(response.statusCode === 200) {
      try{
     //Here the app will parse (or analyze) the data
      var profile = JSON.parse(body);
     //Here the app will now print the data in an organized format.
      printMessage(username, profile.badges.length, profile.points.JavaScript);
      } catch(error) {
    //This is for a parse error
        printError(error);
      }
      } else {
        //Status Code error goes here
        printError({message: "There seems to be a problem with retrieving the profile for " + username + ". ("+ http.STATUS_CODES[response.statusCode] +")"});
     }
   });
});
  
  //If there is a Connection Error
  request.on("error",printError);
}

module.exports.get = get;