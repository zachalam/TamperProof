![TamperProof Logo](https://github.com/zachalam/TamperProof/blob/master/images/logo_white.png?raw=true)

Hash MongoDB Documents on EOS blockchains.

## Motive
Blockchains provide security and transparency. Unfortunately it's very difficult for existing applications to take advantage of the benefits they offer. In the future, the public at large will not trust data sources that cannot be proven. With **TamperProof**, anyone can prove the state of their MongoDB database by finger printing it on _any_ EOS powered blockchain.

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
==============================
TamperProof => by Zach Alam
==============================
Using identifier. ["lol","winter","5cbba8a857a66431e9bb2164"]
"Identifier" hash generated: d3c1cd112a74e8048131bca20ddc40d40481664b7ef73f2a778ae407bdc1a1dd
Accessing Mongo records...
Number of documents in Hash: 1
[{"_id":"5cbba8a857a66431e9bb2164","yes":"true","no":"blue1"}]
"Data" hash generated: 5bfcbba66dc024a850865a7b8716d18d69d9b45188842f6bf1792f32c61b9cda
==============================
Writing to blockchain...
Successfully wrote to chain with TX id.
=> 5cd534d252ad380e92c26a5c119918865e42ab400b880d9cafc2b9d308da1fa5
https://bloks.io/transaction/5cd534d252ad380e92c26a5c119918865e42ab400b880d9cafc2b9d308da1fa5
```

## Parameters
Note: Sensitive parameters should be stored as session data and not passed via command line.
| Parameter | Example                                                | Purpose                                | Required |
|-----------|--------------------------------------------------------|----------------------------------------|----------|
| -x        | mongodb+srv://<user>:<pass>@cluster0-bwwwb.mongodb.net | MongoDB connection string.             | YES      |
| -d        | my_database_name                                       | MongoDB database name.                 | No       |
| -c        | my_collection_name                                     | MongoDB collection name.               | No       |
| -i        | 5cbba8a857a66431e9bb2164                               | _id for document lookup.               | No       |
| -k        | 5J7J5tD9WrKWAkAVyXLNonh2WcVqWBXxajmMthDPTuJbBksDhyz    | EOSIO private key (active permission). | YES      |
| -a        | useraccount1                                           | EOSIO account name.                    | YES      |
| -e        | https://publicapi-mainnet.eosauthority.com             | EOSIO http endpoint.                   | No       |
