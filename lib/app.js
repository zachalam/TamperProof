//  hashing algo..
var hash = require("crypto-js/sha256");


const args = require("./helpers/args")
const mongo = require("./helpers/mongo")
const eos = require("./helpers/eos")

let argv = args(process)

console.log("==============================")

let id = [argv.d, argv.c]
if (argv.i) id.push(argv.i) // add id to identifier (if presented)
id = JSON.stringify(id) // stringify id.
const identifier = hash(id)
console.log("Using identifier.", id)
console.log(`"Identifier" hash generated: ${identifier}`)

console.log("Accessing Mongo records...")
mongo(argv, docs => {
  // hash docs into data string.
  docString = JSON.stringify(docs) // stringify docs..
  const data = hash(docString)

  console.log(`Number of documents in Hash: ${docs.length}`)
  console.log(docString)
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
