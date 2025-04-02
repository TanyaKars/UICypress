describe("Alert", () => {
  beforeEach(() => {
    cy.visit("https://webdriveruniversity.com/Popup-Alerts/index.html");
  });

  it("should display the alert with correct message", () => {
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("I am an alert box!");
    });
    cy.get("#button1").click();
  });

  it("should display the alert with correct message using Spy", () => {
    const spyAlert = cy.spy();
    cy.on("window:alert", spyAlert);
    cy.get("#button1")
      .click()
      .then(() => {
        expect(spyAlert).to.be.calledOnce;
        expect(spyAlert.getCall(0)).to.be.calledWith("I am an alert box!");
      });
  });

  it.only("Should check modal pop-ups", () => {
    cy.get("#button2").click();
    cy.get("h4").should(
      "have.text",
      "It’s that Easy!!  Well I think it is.....",
    );
    // cy.contains('Close').click()
    cy.get('[class="btn btn-default"]').click();
  });

  it("Should display ajax alert", () => {
    cy.get("#button3").click();
    cy.get("#loader", { timeout: 6000 }).should("not.be.visible");
    cy.get("#button1").click();
    cy.get("p")
      .last()
      .should(
        "have.text",
        "The waiting game can be a tricky one; this exercise will hopefully improve your understandings of the various types of waits.",
      );
    cy.contains("Close").click();
  });

  it("Should display prompt", () => {
    cy.on("window:confirm", (confirmText) => {
      expect(confirmText).to.equal("Press a button!");
      return true;
    });
    cy.get("#button4").click();
    cy.get("#confirm-alert-text").should("have.text", "You pressed OK!");
  });

  it("Should display prompt", () => {
    cy.on("window:confirm", (confirmText) => {
      expect(confirmText).to.equal("Press a button!");
      return false;
    });
    cy.get("#button4").click();
    cy.get("#confirm-alert-text").should("have.text", "You pressed Cancel!");
  });

  it("Should display prompt using stub", () => {
    cy.window().then((win) => {
      cy.stub(win, "confirm").returns(false);
    });
    cy.get("#button4").click();
    cy.get("#confirm-alert-text").should("have.text", "You pressed Cancel!");
    cy.window().its("confirm").should("be.calledOnce");
    cy.window().its("confirm").should("be.calledWith", "Press a button!");
  });
});
