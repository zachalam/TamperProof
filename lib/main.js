let args = require("./helpers/args")

var hash = require('object-hash')

let argv = args(process)

console.log(argv)



const MongoClient = require('mongodb').MongoClient;
const uri = argv.x;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db(argv.d).collection(argv.c);
  // perform actions on the collection object

  collection.find({}).toArray(function(err, docs) {
    console.log("Found the following records");
    console.log(docs)
    docs = docs.map((e) => { return { ...e, _id: `${e._id}` }})
    console.log("Found the following records");

    console.log(docs)

    const stateObj = {
        database: argv.d,
        collection: argv.c,
        data: hash(docs),
        count: docs.length
    }
    const stateHash = hash(stateObj)

    console.log("stateObj", stateObj)
    console.log("stateHash", stateHash)
  });
  client.close();
});


console.log("yah")