Hash MongoDB Collections or Documents on EOSIO blockchains.

## Motive
Blockchains provide security and transparency. Unfortunately it's very difficult for existing applications to take advantage of the bennefits they offer. In the future, the public at large will not trust data sources that cannot be proven. With **TamperProof**, anyone can prove the state of their MongoDB state by stamping it on any EOSIO powered blockchain.

## Usage
```
tamperproof
```

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