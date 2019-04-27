let consoleWarning = (paramType, paramName, fallbackVal) => {
  console.log(
    `Warning: No ${paramType} set with param -${paramName}, using fallback "${fallbackVal}".`
  )
}

let consoleError = (paramType, paramName) => {
  console.log(
    `Error: No ${paramType} set with param -${paramName}, cannot continue, exiting.".`
  )
  process.exit()
}

module.exports = process => {
  let argv = require("minimist")(process.argv.slice(2))

  // => DATABASE ARGS
  if (!argv.x) {
    // connection string
    consoleError("mongodb connection string.", "x")
  }

  if (!argv.d) {
    // database name, must be provided
    consoleWarning("database", "d")
    argv.d = "mongodb"
  }

  if (!argv.c) {
    // collection name (table), must be provided
    consoleWarning("collection", "c")
    argv.c = "collection"
  }

  if (!argv.i) {
    // _id for document lookup.
  }

  // => BLOCKCHAIN ARGS
  if (!argv.e) {
    // by default use eosauthority endpoint to broadcast TX.
    argv.e = "https://publicapi-mainnet.eosauthority.com"
  }

  if (!argv.k) {
    // private key for account, must be provided
    consoleError("private key", "k")
  }

  if (!argv.a) {
    // account name, must be provided
    consoleError("account name", "a")
  }

  // return updated arg list
  return argv
}
