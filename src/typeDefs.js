const { gql } = require("apollo-server");

const typeDefs = gql`
  type Todo {
    id: ID
    title: String
    body: String
    complete: Boolean
    timestamp: String
  }

  type Query {
    todos(id: ID, complete: Boolean): [Todo]
  }
`;

module.exports = typeDefs;
