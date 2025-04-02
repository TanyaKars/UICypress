import { LoginPage } from "../page-object/LoginPage";

const loginPage = new LoginPage();
describe("Negative tests", () => {
  it.only("Login with mixed credentials", () => {
    loginPage.filloutLoginFields(Cypress.env("email"), Cypress.env("password"));
    loginPage.submitLoginForm();
  });
  it("Login with wrong credentials", () => {
    cy.visit(loginPage.pasvLoginUrl);
    cy.get("#normal_login_email").type("wrong@gmail.com");
    cy.get("#normal_login_password").type("wrong");
    cy.get(".ant-btn-primary").click();
    cy.get(".ant-notification-notice-message").should(
      "have.text",
      loginPage.loginError,
    );
  });
  it("Login invalid email and valid password", () => {
    cy.visit(loginPage.pasvLoginUrl);
    cy.get("#normal_login_email").type("invalid@gmail.com");
    cy.get("#normal_login_password").type(Cypress.env("password"));
    cy.get(".ant-btn-primary").click();
    cy.get(".ant-notification-notice-message").should(
      "have.text",
      loginPage.loginError,
    );
  });
  it("Login with invalid password and valid email", () => {
    cy.visit(loginPage.pasvLoginUrl);
    cy.get("#normal_login_email").type(Cypress.env("email"));
    cy.get("#normal_login_password").type("invalid");
    cy.get(".ant-btn-primary").click();
    cy.get(".ant-notification-notice-message").should(
      "have.text",
      loginPage.loginError,
    );
  });
  it("Login with empty credentials", () => {
    cy.visit(loginPage.pasvLoginUrl);
    cy.get("#normal_login_email").type("");
    cy.get("#normal_login_password").type("");
    cy.get(".ant-btn-primary").click();
    cy.get(".ant-btn-primary").should("be.disabled");
  });
});

describe("Positive tests", () => {
  it("Login with valid credentials", () => {
    cy.visit(loginPage.pasvLoginUrl);
    cy.get("#normal_login_email").type(Cypress.env("email"));
    cy.get("#normal_login_password").type(Cypress.env("password"));
    cy.get(".ant-btn-primary").click();
    cy.get("h1").should("have.text", loginPage.name);
  });
  it("Login with capitalized email", () => {
    cy.visit(loginPage.pasvLoginUrl);
    cy.get("#normal_login_email").type(Cypress.env("email").toUpperCase());
    cy.get("#normal_login_password").type(Cypress.env("password"));
    cy.get(".ant-btn-primary").click();
    cy.get("h1").should("have.text", loginPage.name);
  });
});
