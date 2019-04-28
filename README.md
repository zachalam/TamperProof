![TamperProof Logo](https://github.com/zachalam/TamperProof/blob/master/images/logo.png?raw=true)

A utility that conveniently links MongoDB to EOS blockchains.

## Motive
Blockchains provide security and transparency. Unfortunately it's very difficult for existing applications to take advantage of the benefits they offer. We're migrating towards a world where the public will not trust unverifiable data sources. With **TamperProof**, anyone can prove the state of their MongoDB database by fingerprinting it on a EOS powered blockchain.

![TamperProof Process](https://github.com/zachalam/TamperProof/blob/master/images/process.png?raw=true)

## Installation
```
npm i -g tamperproof
```

## Usage
Hash a 'single' document.
```
tamperproof \
-d database_name \
-c collection_name \
-x mongodb+srv://mongodb_connection_string \
-i 5cbba8a857a66431e9bb2164 \
-a accountuser1 \
-k 5J7J5tD9WrKWAkAVyXLNonh2WcVqWBXxajmMthDPTuJbBksDhyz
```

Hash a 'whole' collection.
```
tamperproof \
-d database_name \
-c collection_name \
-x mongodb+srv://mongodb_connection_string \
-a accountuser1 \
-k 5J7J5tD9WrKWAkAVyXLNonh2WcVqWBXxajmMthDPTuJbBksDhyz
```

## Sample Result
```
Identifier: ["my_mongo_db","predictions"]
=> 0adb7441e30f6970596a759a80114f748ea53da2ac5dcb5f99925762243dd890 (identifier)
-------------------------------------
Talking to MongoDB...
Number of documents in Hash: 2
[{"_id":"5cc5e16c57a66431e9bb217c","home_team":"Eagles","away_team":"Bobcats","prediction":"10-0","winning_team":"Eagles","gametime":"10-03-2020 @ 10:00PM"},{"_id":"5cc5e2104cb78c31e97ebee2","home_team":"Tigers","away_team":"Bears","prediction":"20-15","winning_team":"Tigers","gametime":"10-05-2020 @ 10:00PM"}]
=> 66407328a8492ad22f3a526476059810512e9f65ab012bf7410a31579ec12e7e (data)
-------------------------------------
Writing to Blockchain...
Successfully wrote to chain with TX id.
=> 70c99fc7aa16f33f1f49a6f68bded1ec08a4ccc5f5b4c1dabc27bd3021276f46
https://bloks.io/transaction/70c99fc7aa16f33f1f49a6f68bded1ec08a4ccc5f5b4c1dabc27bd3021276f46
```

## Interpreting Results
Both the "identifier" and the "data" properties are hashed with SHA256.
* The identifier is a hash of an array converted to a string. The array is one of the following formats: ["database","collection"] or ["database","collection","_id"]
* The data is a hash of a string of the Result returned from the database. This string is created by passing the DB result to JSON.stringify().


## Parameters
| Parameter | Example                                                | Purpose                                | Required |
|-----------|--------------------------------------------------------|----------------------------------------|----------|
| -x        | mongodb+srv://<user>:<pass>@cluster0-bwwwb.mongodb.net | MongoDB connection string.             | YES      |
| -d        | my_database_name                                       | MongoDB database name.                 | No       |
| -c        | my_collection_name                                     | MongoDB collection name.               | No       |
| -i        | 5cbba8a857a66431e9bb2164                               | _id for document lookup.               | No       |
| -k        | 5J7J5tD9WrKWAkAVyXLNonh2WcVqWBXxajmMthDPTuJbBksDhyz    | EOSIO private key (active permission). | YES      |
| -a        | useraccount1                                           | EOSIO account name.                    | YES      |
| -e        | https://publicapi-mainnet.eosauthority.com             | EOSIO http endpoint.                   | No       |

* Note: Sensitive parameters should be stored as session data and not passed via command line.

## Use Programatically
```
let tamperproof = require("tamperproof")

;(async () => {
  let result = await tamperproof({
    d: "my_database_name",
    c: "my_collection_name",
    i: "5cbba8a857a66431e9bb2164",
    x: "mongodb+srv://<user>:<pass>@cluster0-bwwwb.mongodb.net",
    a: "useraccount1",
    k: "5J7J5tD9WrKWAkAVyXLNonh2WcVqWBXxajmMthDPTuJbBksDhyz",
    e: "https://publicapi-mainnet.eosauthority.com" // endpoint required.
  })
})()
```

## Acquire Blockchain Account
Accounts are free on private EOS blockchains. If you wish to use the public EOS blockchain (default setting) there is a small one-time fee (typically ~$1). This will provide you with both a private key and account name of your choice (-k and -a params). 

[https://www.eosnameservice.io](https://www.eosnameservice.io/?ref=zachzachzach)

