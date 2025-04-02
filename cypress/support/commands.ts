/// <reference types="cypress" />
import "cypress-iframe";

import { loginPage, pasvLocators } from "../fixtures/test-data";
import { ContactData } from "../interface/interface";

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit(loginPage.pasvLoginUrl);
  cy.get(pasvLocators.fields.email).type(email);
  cy.get(pasvLocators.fields.password).type(password);
  cy.get(pasvLocators.buttons.submit).click();
});

Cypress.Commands.add("getIframeBody", (iframe: string) => {
  return cy
    .get(iframe)
    .its("0.contentDocument.body")
    .should("not.be.empty")
    .then(cy.wrap) as Cypress.Chainable<JQuery<HTMLElement>>;
});

Cypress.Commands.add("test", (testData: ContactData) => {
  cy.fixture("contact-us.json").then(() => {
    cy.get('[name="first_name"]').type(testData.validSubmission.firstName);
    cy.get('[name="last_name"]').type(testData.validSubmission.lastName);
    cy.get('[name="email"]').type(testData.validSubmission.email);
    cy.get('[name="message"]').type(testData.validSubmission.message);
    cy.contains("SUBMIT").click();
    cy.get("h1").should("have.text", "Thank You for your Message!");
  });
});
