const { FakeTodoDb } = require("./db/todoDB");

const todosDB = new FakeTodoDb();

const resolvers = {
  Query: {
    todos: (_, { id, complete }) => {
      if (id) return todosDB.select(id);
      if (complete) return todosDB.select().filter((t) => t.complete);
      return todosDB.select().filter((t) => !t.complete);
    },
  },
  Mutation: {
    addTodo: (_, { title, body }) => todosDB.insert({ title, body }),
    updateTodo: (_, { todo }) => todosDB.update(todo, todo.id),
    deleteTodo: (_, { id }) => todosDB.delete(id),
  },
};

module.exports = resolvers;
