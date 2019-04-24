const { Api, JsonRpc } = require("eosjs")
const { JsSignatureProvider } = require("eosjs/dist/eosjs-jssig") // development only
const fetch = require("node-fetch") // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require("util") // node only; native TextEncoder/Decoder

module.exports = (argv, identifier, data, cb) => {
  const defaultPrivateKey = argv.k // private key
  const signatureProvider = new JsSignatureProvider([defaultPrivateKey])
  const rpc = new JsonRpc(argv.e, {
    fetch
  })

  const api = new Api({
    rpc,
    signatureProvider,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder()
  })

  ;(async () => {
    const result = await api.transact(
      {
        actions: [
          {
            account: "prove.x",
            name: "record",
            authorization: [
              {
                actor: argv.a, // account name
                permission: "active"
              }
            ],
            data: {
              identifier,
              data
            }
          }
        ]
      },
      {
        blocksBehind: 3,
        expireSeconds: 30
      }
    )
    cb(result)
  })()
}
