describe("Mouse Actions Tests", () => {
  beforeEach(() => {
    cy.visit("https://webdriveruniversity.com/index.html");
    cy.get("#actions").scrollIntoView().invoke("removeAttr", "target").click();
  });

  it("drag-n-drop", () => {
    cy.get("#droppable")
      .invoke("text")
      .invoke("trim")
      .should("eq", "DROP HERE!");
    cy.get("#droppable").should(
      "have.css",
      "background-color",
      "rgb(97, 109, 179)",
    );

    cy.get("#draggable").trigger("mousedown", { which: 1 });
    cy.get("#droppable")
      .trigger("mousemove")
      .trigger("mouseup", { force: true });
    cy.get("#droppable").invoke("text").invoke("trim").should("eq", "Dropped!");
    cy.get("#droppable")
      .find("p")
      .should("have.css", "background-color", "rgb(244, 89, 80)");
  });

  it("double click", () => {
    // cy.get('#double-click').should('have.css', 'background-color', 'rgb(254, 196, 45)')
    // // cy.get('#double-click').click().click()
    // cy.get('#double-click').dblclick()
    // cy.get('#double-click').should('have.css', 'background-color', 'rgb(147, 203, 90)')
    cy.get("#double-click")
      .should((color) => {
        expect(color).to.have.css("background-color", "rgb(254, 196, 45)");
      })
      .dblclick()
      .should("have.css", "background-color", "rgb(147, 203, 90)");
  });

  it("click and hold", () => {
    cy.get("#click-box")
      .trigger("mousedown", { which: 1 })
      .then((el) => {
        expect(el).to.have.css("background-color", "rgb(0, 255, 0)");
      });
  });

  it.only("hover", () => {
    cy.get(".dropbtn").each((el, i) => {
      cy.wrap(el).realHover();
      cy.get(".dropdown-content a.list-alert").eq(i).should("be.visible");
    });
  });
});
