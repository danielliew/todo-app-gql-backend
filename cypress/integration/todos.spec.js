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
    cy.request("POST", "/todos/todo", {
      query,
    })
      .its("body.data.todos")
      .should("be.an", "array");
  });

  it("contains only incomplete todos", () => {
    cy.request("POST", "/todos/todo", {
      query,
    })
      .its("body.data.todos")
      .each((item) => expect(item.complete).to.equal(false));
  });
});

describe("Get all incomplete todos", () => {
  const query = `{
    todos {
        title
        body
        complete
    }
  }`;

  it("returns array", () => {
    cy.request("POST", "/todos/todo", {
      query,
    })
      .its("body.data.todos")
      .should("be.an", "array");
  });

  it("contains only complete todos", () => {
    cy.request("POST", "/todos/todo", {
      query,
    })
      .its("body.data.todos")
      .each((item) => expect(item.complete).to.equal(true));
  });
});

describe("Get todo by id", () => {
  it("returns array and load up to 1 item", () => {
    cy.request("POST", "/todos/todo", {
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

// add
// update
// delete
