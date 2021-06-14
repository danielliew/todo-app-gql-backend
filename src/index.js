const { ApolloServer } = require("apollo-server");
const { FakeTodoDb } = require("./db/todoDB");

const todosDB = new FakeTodoDb();

const typeDefs = require("./typeDefs");

const resolvers = {
  Query: {
    todos: (_, { id, complete }) => {
      if (id) return todosDB.select(id);
      if (complete) return todosDB.select().filter((t) => t.complete);
      return todosDB.select().filter((t) => !t.complete);
    },
  },
};

const app = new ApolloServer({ typeDefs, resolvers });

module.exports = app;
