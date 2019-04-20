const MongoClient = require("mongodb");
const url = "mongodb://localhost:27017/";

MongoClient.connect(url)
  .then(db => {
    console.log("In connection");
    dbase = db.db("HeroDB");
    dbase
      .createCollection("Hero")
      .then(() => {
         console.log("In collection") ;
      });
  })
  .catch(err => {
    console.log("Error in connection");
  });


  

  
  
  
