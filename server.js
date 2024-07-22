// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();
// const { MongoClient, ServerApiVersion } = require("mongodb");

// const uri = "mongodb+srv://aleksandarpavicevicweb:rvm0jn3NTDMbrESz@cluster0.rymaa0m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();

//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// app.post("/quotes", (req, res) => {
//   const db = client.db("languages");
//   const wordsAndPhrases = db.collection("german");
//   wordsAndPhrases.insertOne(req.body);
//   console.log(req.body);
//   res.send("Form data received successfully!");
// });

// app.listen(5000, function () {
//   console.log("listening on 5000");
//   console.log(__dirname);
// });

const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const uri = "mongodb+srv://aleksandarpavicevicweb:rvm0jn3NTDMbrESz@cluster0.rymaa0m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectToDatabase() {
  try {
    // Connect the client to the server
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Set the database for later use
    db = client.db("languages");
  } catch (error) {
    console.error(error);
  }
}

connectToDatabase();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/quotes", async (req, res) => {
  try {
    const wordsAndPhrases = db.collection("german");
    await wordsAndPhrases.insertOne(req.body);
    console.log(req.body);
    res.send("Form data received successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error inserting data");
  }
});

app.listen(5000, function () {
  console.log("listening on 5000");
  console.log(__dirname);
});
