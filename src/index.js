const { ApolloServer } = require("apollo-server");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const app = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true,
  formatError: (err) => {
    console.log(err.message);
    return err;
  },
});

module.exports = app;
