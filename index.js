const express = require("express");
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");
const app = express();

const schema = buildSchema(`
  type Query {
    pet(id: Int!): Pet
    pets(animalType: String): [Pet]
    owner(id: Int!): Owner
    owners: [Owner]
  },
  type Pet {
    id: Int
    name: String
    animalType: String
    owner: Owner
  },
  type Owner {
    id: Int
    name: String
  }
`);

var owners = [
  { id: 1, name: "Alexandra" },
  { id: 2, name: "Eric" }
];

var pets = [
  { id: 1, name: "Zoe", animalType: "dog", owner: owners[1] },
  { id: 2, name: "Kima", animalType: "dog", owner: owners[0] },
  { id: 3, name: "Penny", animalType: "cat", owner: owners[1] }
];

function getPet(args) {
  return getById("pet", args)
}

function getOwner(args) {
  return getById("owner", args)
}

function getById(type, args) {
  let collection

  if (type === "pet") {
    collection = pets
  } else if (type === "owner") {
    collection = owners
  }

  return collection.find(function (element) {
    return element.id === args.id;
  });
}

function getPets(args) {
  if (args.animalType) {
    return pets.filter(function(pet) {
      return pet.animalType === args.animalType;
    })
  } else {
    return pets;
  }
}

function getOwners() {
  return owners;
}

const root = {
  pet: getPet,
  pets: getPets,
  owner: getOwner,
  owners: getOwners
};

app.use('/graphql', express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(3000, () => console.log('Express GraphQL Server Now Running On localhost:3000/graphql'));
