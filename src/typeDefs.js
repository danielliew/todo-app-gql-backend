const { gql } = require("apollo-server");

const TodoFields = `
  id: ID
  title: String
  body: String
  complete: Boolean
  timestamp: String
`;

const typeDefs = gql`
  type Todo {
    ${TodoFields}
  }

  input TodoInput {
    ${TodoFields}
  }

  type MutationResponse {
    success: Boolean
  }

  type Query {
    todos(id: ID, complete: Boolean): [Todo]
  }

  type Mutation {
    addTodo(title: String, body: String): MutationResponse
    updateTodo(todo: TodoInput): MutationResponse
    deleteTodo(id: ID): MutationResponse
  }
`;

module.exports = typeDefs;
