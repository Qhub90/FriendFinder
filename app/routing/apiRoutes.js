var friends = require("../data/friends.js");



module.exports = function (app){

// Displays our friends object //////
  app.get("/api/friends", function(req, res) {

    res.json(friends);
    });





  app.post("/api/friends", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    // this is from our form data
    var newFriend = req.body;
  
  
    console.log("++++++++++++++" , newFriend , "+++++++++++");
  
    // Set a variable to 0 it will hold the sum of the users score array
    var userTotal = 0;

    // Set this variable to a high number to start
    var lowestDifference = 100;


    // Loop through the users score array and save the sum of them to our userTotal Variable
    for(var x =  0; x < newFriend.scores.length; x++){
      userTotal += parseInt(newFriend.scores[x]);
    }
    console.log("NewTotal!!!", userTotal ,"--------")


// Creating an object with  empty keys that we will define later
    var bestMatch= {
      name:"",
      photo:""};

// Loop thru our "friends" array
    for (var i = 0; i < friends.length; i ++){

// Setting a variable same as we did with the "userTotal"
    var totalDiff = 0;

    // looping thru the "scores" array of current index of "friends  ("j" is index number)
      for(var j =  0; j < friends[i].scores.length; j++){

        // This is getting the differnce of each index of the users score and the current friends score. The "j" keeps them the same index
        var difference = Math.abs(parseInt(newFriend.scores[j]) - parseInt(friends[i].scores[j]));

        // adding all differences to our variable
        totalDiff += difference;
      }
      
   
    // If statement
      if(totalDiff < lowestDifference){

        // if above is true we now set the "lowestDifference" to equal the current friends "totalDiff" and set the values of our object to equal the current friends "name" and "photo"
        lowestDifference = totalDiff
        bestMatch.name = friends[i].name;
        bestMatch.photo = friends[i].photo;
      }

    }

    // finally we push the newFriend object to our friends object
    friends.push(newFriend);

    console.log(bestMatch);

    // We pass your new best friend to this
    res.json(bestMatch);
  });

}