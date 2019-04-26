#include <eosio/eosio.hpp>

using namespace eosio;

class[[eosio::contract]] prove : public contract
{
 public:
   using contract::contract;

   [[eosio::action]] void record(std::string identifier, std::string data) {
      print(identifier, " ", data);
   }
};
