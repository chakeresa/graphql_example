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
`)

let pets = [
  { id: 1, name: "Zoe", animalType: "dog" },
  { id: 2, name: "Kima", animalType: "dog" },
  { id: 3, name: "Penny", animalType: "cat" }
]

function getPet(id) {
  return pets.find(function(pet) {
    return pet.id === id
  })
}

function getPets(animalType) {
  // TODO: filter down to a particular animalType
  return pets
}

const root = {
  pet: getPet,
  pets: getPets
}

app.use('/graphql', express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(3000, () => console.log('Express GraphQL Server Now Running On localhost:3000/graphql'));
