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
    // database connection string
    if (!argv.u) {
      // mongo username
      const fallback = "mongodb"
      consoleWarning("user", "u", fallback)
      argv.u = fallback
    }

    if (!argv.p) {
      // mongo pass
      const fallback = "mongodb"
      consoleWarning("password", "p", fallback)
      argv.p = fallback
    }

    if (!argv.h) {
      // mongo host
      const fallback = "cluster0-bwwwb.mongodb.net/test?retryWrites=true"
      consoleWarning("host", "h", fallback)
      argv.h = fallback
    }

    // build a connectionString with these params.
    const { u, p, h } = argv
    argv.x = `mongodb+srv://${u}:${p}@${h}`
  }

  if (!argv.d) {
    // database name, must be provided
    consoleError("database", "d")
  }

  if (!argv.c) {
    // collection name (table), must be provided
    consoleError("collection", "c")
  }

  // => BLOCKCHAIN ARGS
  if (!argv.i) {
    // fallback to mainnet chain id if missing.
    argv.i = "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
  }

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
