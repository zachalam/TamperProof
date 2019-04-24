module.exports = (argv, cb) => {
  const MongoClient = require("mongodb").MongoClient
  const ObjectID = require("mongodb").ObjectID

  const uri = argv.x
  const client = new MongoClient(uri, { useNewUrlParser: true })
  client.connect(err => {
    const collection = client.db(argv.d).collection(argv.c)
    // perform actions on the collection object
    // add if to query (if provided)
    const findObj = argv.i
      ? { _id: new ObjectID("5cbbd0ef57a66431e9bb2169") }
      : {}
    collection.find(findObj).toArray(function(err, docs) {
      // encompass id in quotes

      docs = docs.map(e => {
        return { ...e, _id: `${e._id}` }
      })

      client.close()
      cb(docs)
    })
  })
}
