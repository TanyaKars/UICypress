import { commonLocators } from "../../fixtures/common";
import { loginPage, pasvLocators, data } from "../../fixtures/test-data";

describe("Negative tests", () => {
  it.only("Login with invalid credentials", () => {
    cy.login(data.invalid.email, `${Cypress.env("password")}1`);
    cy.get(pasvLocators.errors.loginMessage).should(
      "have.text",
      loginPage.loginError,
    );
    cy.task("load").then((savedData: Record<string, any>) => {
      console.log(savedData.cookie);
    });
  });
});

describe("Positive tests", () => {
  it("Login with valid credentials", () => {
    cy.login(Cypress.env("email"), Cypress.env("password"));
    cy.get(commonLocators.h1).should("have.text", loginPage.name);
  });
});
