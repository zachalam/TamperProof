//  hashing algo..
var hash = require("crypto-js/sha256")
var colors = require("colors/safe")

const mongo = require("./helpers/mongo")
const eos = require("./helpers/eos")

module.exports = (argv) => {

  let id = [argv.d, argv.c]
  if (argv.i) id.push(argv.i) // add id to identifier (if presented)
  id = JSON.stringify(id) // stringify id.
  const identifier = hash(id)
  console.log("Identifier:", id)
  console.log(
    `=> ${colors.blue(identifier.toString())} (identifier)`
  )

  console.log("-------------------------------------")
  console.log("Talking to MongoDB...")
  mongo(argv, docs => {
    // hash docs into data string.
    docString = JSON.stringify(docs) // stringify docs..
    const data = hash(docString)

    console.log(`Number of documents in Hash: ${docs.length}`)
    console.log(colors.gray(docString))
    console.log(`=> ${colors.blue(data.toString())} (data)`)

    console.log("-------------------------------------")

    console.log("Writing to Blockchain...")

    eos(argv, identifier, data, result => {
      if (result && result.transaction_id) {
        console.log(`Successfully wrote to chain with TX id.`)
        console.log(`=> ${colors.green.bold(result.transaction_id)}`)
        console.log(`https://bloks.io/transaction/${result.transaction_id}`)
      } else {
        console.log(`Error, unable to write to chain.`)
        console.log(result)
      }
      return result
    })
  })
}
