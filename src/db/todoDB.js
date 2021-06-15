const uuid = require("uuid");

class FakeTodoDb {
  store = [
    {
      title: "Buy groceries",
      body: "10 cartons of milk",
      timestamp: "Today",
      id: "0",
      complete: false,
    },
  ];

  constructor() {}

  select(id) {
    if (id === undefined) return this.store;
    const find = this.store.filter((s) => s.id === id);
    return find.length ? find : [];
  }

  insert(t) {
    try {
      const newTodo = {
        id: uuid.v4(),
        title: t.title,
        body: t.body,
        complete: false,
        timestamp: new Date().toLocaleString(),
      };
      this.store.push(newTodo);
      return { success: true, todo: newTodo };
    } catch (error) {
      return { success: false };
    }
  }

  update(t, id) {
    try {
      let success = false;
      this.store = this.store.map((s) => {
        if (s.id === id) {
          success = true;
          return t;
        }
        return s;
      });
      return { success, todo: t };
    } catch (error) {
      return { success: false };
    }
  }

  delete(id) {
    try {
      let success = false;
      this.store = this.store.filter((s) => {
        if (s.id === id) {
          success = true;
          return false;
        }
        return true;
      });
      return { success, id };
    } catch (error) {
      return { success: false };
    }
  }
}

module.exports = {
  FakeTodoDb,
};
