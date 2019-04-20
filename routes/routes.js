const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const cors = require("cors");




router.use(cors());
//Read-All
router.get("/", async (req, res) => {
  try {
    const heroes = await dbase
      .collection("Hero")
      .find({})
      .toArray(async (error, resp) => {
        await res.send(resp);
        console.table("In findAll");
      });
    
  } catch (err) {
    console.log("Error in findAll");
  }
});

//Read-All-CanFly
// router.get("/canFly", async (req, res) => {
//   try {
//     var value = JSON.parse(req.headers["canfly"]);
//     console.log(value);
//     await dbase
//       .collection("Hero")
//       .find({ canFly: value }).toArray(async (error, resp) => {
//         await res.send(resp);
//         console.log("In findAll-header");
//       });
//   } catch (err) {
//     console.log("Error in findAll-header");
//   }
// });
//Read-One
// router.get("/:id", async (req, res) => {
//   try {
//     await dbase
//       .collection("Hero")
//       .findOne({ _id: ObjectId(req.params.id) }, async (error, resp) => {
//         await res.send(resp);
//         console.log("In findOne");
//       });
//   } catch (err) {
//     console.log("Error in findOne");
//   }
// });

//Insert
router.post("/", async (req, res) => {
  try {
    await dbase
      .collection("Hero")
      .insertOne(req.body, async (err, resp) => {
        await res.send({ type: "POST" });
        // console.log(req);
      });
  } catch (err) {
    console.log("Error in insert");
  }
});

//Update-All
router.put("/", async (req, res) => {
  try {
    var myquery = {
      $and: [
        { fightsWon: { $gt: 10 } },
        { $and: [{ superPowers: "Fly" }, { superPowers: "Swim" }] }
      ]
    };
    var newquery = { $mul: { fanFollowing: 2 } };
    await dbase
      .collection("Hero")
      .updateMany(myquery, newquery, async (err, resp) => {
        console.log("In UpdateAll");
        await res.send(resp);
      });
  } catch (err) {
    console.log("Error in UpdateAll");
  }
});

//Update-One
router.put("/:id", async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.params.id);

    var myquery = { _id: ObjectId(req.params.id) };
    var newquery = {
      $set: {
        heroName: req.body.heroName,
        heroHeight: req.body.heroHeight,
        heroType: req.body.heroType,
        canFly: req.body.canFly,
        superPowers: req.body.superPowers,
        fanFollowing: req.body.fanFollowing,
        fightsWon: req.body.fightsWon
      }
    };
    await dbase
      .collection("Hero")
      .updateOne(myquery, newquery, async (err, resp) => {
        console.log("In UpdateOne");
        await res.send(resp);
      });
  } catch (err) {
    console.log("Error in UpdateOne");
  }
});

//Delete-All
router.delete("/", async (req, res) => {
  try {
    var myquery = { $where: "this.superPowers.length <= 2" };
    await dbase.collection("Hero").deleteMany(myquery, async (err, resp) => {
      console.log("In deleteAll");
      await res.send(resp);
    });
  } catch (err) {
    console.log("Error in deleteAll");
  }
});

//Delete-One
router.delete("/:id", async (req, res) => {
  try {
    await dbase
      .collection("Hero")
      .deleteOne({ _id: ObjectId(req.params.id) }, async (err, resp) => {
        console.log("In deleteOne");
        await res.send(resp);
      });
  } catch (err) {
    console.log("Error in deleteOne");
  }
});

module.exports = router;
