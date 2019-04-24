const hash = require("object-hash")

const args = require("./helpers/args")
const mongo = require("./helpers/mongo")
const eos = require("./helpers/eos")

let argv = args(process)

console.log("==============================")

let id = [argv.d, argv.c]
if (argv.i) id.push(argv.i) // add id to identifier (if presented)
const identifier = hash(id)
console.log("Using identifier.", id)
console.log(`"Identifier" hash generated: ${identifier}`)

console.log("Accessing Mongo records...")
mongo(argv, docs => {
  // hash docs into data string.
  const data = hash(docs)

  console.log(`Number of documents in Hash: ${docs.length}`)
  console.log(docs)
  console.log(`"Data" hash generated: ${data}`)

  console.log("==============================")

  console.log("Writing to blockchain...")

  eos(argv, identifier, data, result => {
    if (result && result.transaction_id) {
      console.log(`Successfully wrote to chain with TX id.`)
      console.log(`=> ${result.transaction_id}`)
      console.log(`https://bloks.io/transaction/${result.transaction_id}`)
    } else {
      console.log(`Error, unable to write to chain.`)
      console.log(result)
    }
  })
})
