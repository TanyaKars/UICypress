import { first } from "cypress/types/lodash";

const locator = {
  dropdown: (index) => `#dropdowm-menu-${index}`,
  programmingLangOptions: {
    java: "JAVA",
    "c#": "C#",
    python: "Python",
    sql: "SQL",
  },
};
describe("Dropdown", () => {
  beforeEach(() => {
    cy.visit(
      "https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html",
    );
  });
  describe("Dropdown", () => {
    it("Select first dropdown", () => {
      cy.wait(1000);
      cy.get(locator.dropdown(1)).select("C#").should("be.visible");
      cy.get(locator.dropdown(1)).select("Python").should("be.visible");
    });

    it("Should verify if all dd elements are visible", () => {
      for (const key in locator.programmingLangOptions) {
        cy.get(`[value="${key}"]`).should(
          "have.text",
          locator.programmingLangOptions[key],
        );
      }
    });
  });
  describe("Checkboxes", () => {
    it("verify functionality os checkboxes", () => {
      cy.get('[value="option-1"]').check().should("be.checked");
      cy.get('[value="option-2"]').click().should("be.checked");
      cy.get('[value="option-4"]').should("not.be.checked");
    });

    it.only("should check all checkboxes", () => {
      cy.get('[value^="option-"]').each((el) => {
        cy.log(el.attr("value"));
        cy.wrap(el).click().should("be.checked");
      });
    });
  });
  describe("Radio Buttons", () => {
    it("should select the radio button", () => {
      cy.get('[value="orange"]').first().click().should("be.checked");
    });
  });
});
