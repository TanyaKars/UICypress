import { ContactData } from "../interface/interface";
import { validSubmission } from "../fixtures/contact-us.json";

describe("Fixtures/1", () => {
  beforeEach(() => {
    cy.fixture("contact-us.json").as("contactUsData");
    cy.visit("https://webdriveruniversity.com/Contact-Us/contactus.html");
  });
  it("should submit the contact us form with valid data", function () {
    const testData = this.contactUsData;
    cy.get('[name="first_name"]').type(testData.validSubmission.firstName);
    cy.get('[name="last_name"]').type(testData.validSubmission.lastName);
    cy.get('[name="email"]').type(testData.validSubmission.email);
    cy.get('[name="message"]').type(testData.validSubmission.message);
    cy.contains("SUBMIT").click();
    cy.get("h1").should("have.text", "Thank You for your Message!");
  });

  it("should submit the contact us form with valid data", function () {
    const testData = this.contactUsData;
    cy.get('[name="first_name"]').type(testData.invalidSubmission.firstName);
    cy.get('[name="last_name"]').type(testData.invalidSubmission.lastName);
    cy.get('[name="email"]').type(testData.invalidSubmission.email);
    cy.get('[name="message"]').type(testData.invalidSubmission.message);
    cy.contains("SUBMIT").click();
    cy.get("body").should(
      "have.text",
      "\n\n\n Error: Invalid email address\n\n\n",
    );
    cy.get("body").should("contain.text", "Error: Invalid email address");
    cy.get("body").should("include.text", "Invalid email address");
  });
});

describe("Fixtures/2", () => {
  beforeEach(() => {
    cy.visit("https://webdriveruniversity.com/Contact-Us/contactus.html");
  });
  it("should submit the contact us form with valid data", () => {
    cy.test({ validSubmission });
    cy.fixture("contact-us.json").then((testData: ContactData) => {
      cy.get('[name="first_name"]').type(testData.validSubmission.firstName);
      cy.get('[name="last_name"]').type(testData.validSubmission.lastName);
      cy.get('[name="email"]').type(testData.validSubmission.email);
      cy.get('[name="message"]').type(testData.validSubmission.message);
      cy.contains("SUBMIT").click();
      cy.get("h1").should("have.text", "Thank You for your Message!");
    });
  });
});

describe("Fixtures/3", () => {
  beforeEach(() => {
    cy.visit("https://webdriveruniversity.com/Contact-Us/contactus.html");
  });
  it("should submit the contact us form with valid data", () => {
    cy.get('[name="first_name"]').type(validSubmission.firstName);
    cy.get('[name="last_name"]').type(validSubmission.lastName);
    cy.get('[name="email"]').type(validSubmission.email);
    cy.get('[name="message"]').type(validSubmission.message);
    cy.contains("SUBMIT").click();
    cy.get("h1").should("have.text", "Thank You for your Message!");
  });

  it.only("should submit the contact us form with valid data", () => {
    cy.wait(3000);
    cy.get('[name="first_name"]').type(validSubmission.firstName);

    cy.get('[name="last_name"]').invoke("val", validSubmission.lastName);
    cy.get('[name="email"]').invoke("val", validSubmission.email);
    cy.get('[name="message"]').invoke("val", validSubmission.message);
    cy.pause();
    cy.contains("SUBMIT").type("{enter}"); // Using type to simulate pressing Enter key
    cy.get("h1").should("have.text", "Thank You for your Message!");
  });
});
