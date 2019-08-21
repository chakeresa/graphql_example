const express = require("express");
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");
const app = express();

const schema = buildSchema(`
  type Query {
    pet(id: Int!): Pet
    pets(animalType: String): [Pet]
  },
  type Pet {
    id: Int
    name: String
    animalType: String
  }
`);

var pets = [
  { id: 1, name: "Zoe", animalType: "dog" },
  { id: 2, name: "Kima", animalType: "dog" },
  { id: 3, name: "Penny", animalType: "cat" }
];

function getPet(args) {
  return pets.find(function(pet) {
    return pet.id === args.id;
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

const root = {
  pet: getPet,
  pets: getPets
};

app.use('/graphql', express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(3000, () => console.log('Express GraphQL Server Now Running On localhost:3000/graphql'));
