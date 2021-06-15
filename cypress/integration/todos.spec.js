/// <reference types="cypress" />

describe("Get all completed todos", () => {
  const query = `{
    todos(id:null, complete:true) {
        title
        body
        complete
    }
  }`;

  it("returns array", () => {
    cy.request("POST", "/", {
      query,
    })
      .its("body.data.todos")
      .should("be.an", "array");
  });

  it("contains only completed todos", () => {
    cy.request("POST", "/", {
      query,
    })
      .its("body.data.todos")
      .each((item) => expect(item.complete).to.equal(true));
  });
});

describe("Get all incomplete todos", () => {
  const query = `{
    todos(id: null, complete: false) {
        title
        body
        complete
    }
  }`;

  it("returns array", () => {
    cy.request("POST", "/", {
      query,
    })
      .its("body.data.todos")
      .should("be.an", "array");
  });

  it("contains only incomplete todos", () => {
    cy.request("POST", "/", {
      query,
    })
      .its("body.data.todos")
      .each((item) => expect(item.complete).to.equal(false));
  });
});

describe("Get todo by id", () => {
  it("returns array and load up to 1 item", () => {
    cy.request("POST", "/", {
      query: `{
          todos(id: 0) {
              title
              body
              complete
          }
      }`,
    })
      .its("body.data.todos")
      .should("be.an", "array")
      .and("have.length.at.most", 1);
  });
});

describe("Add Todo", () => {
  const query = `mutation {
      addTodos(title: "Test", body: "test body") {
        success
      }
  }`;
  it("returns success boolean", () => {
    cy.request("POST", "/", {
      query,
    })
      .its("body.data.addTodos.success")
      .should("be.a", "boolean");
  });
});

describe("Update Todo", () => {
  const query = `mutation {
    updateTodo(todo: {
      id: "0",
      title: "Test", body: "test body",
      complete: false,
      timestamp: "Today"
    }) {
      success
    }
  }`;
  it("returns success boolean", () => {
    cy.request("POST", "/", {
      query,
    })
      .its("body.data.updateTodo.success")
      .should("be.a", "boolean");
  });
});

describe("Delete Todo", () => {
  const query = `mutation {
    deleteTodo(id: "0") {
      success
    }
  }`;
  it("returns success boolean", () => {
    cy.request("POST", "/", {
      query,
    })
      .its("body.data.deleteTodo.success")
      .should("be.a", "boolean");
  });
});
