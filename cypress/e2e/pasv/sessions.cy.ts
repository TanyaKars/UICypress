import { faker } from '@faker-js/faker';

describe("Using cy.sessions()", () => {

  it.only("should login using new session", () => {
    cy.sessionLogin(Cypress.env("email"), Cypress.env("password"));
    cy.get('[data-qa="topmenu-Дневник"]').click()
    cy.get('.ant-btn-primary').click()
    // cy.get('[id="Your project: \'Test Project\'"]').then((frame) => {
    //   const iframeBody = frame.contents().find("body");
    //   cy.wrap(iframeBody).find('.close').click();
    // });
    // cy.frameLoaded('iframe');
    cy.wait(2000)
     cy.get('[id*="getsitecontrol-465163"]')
    .should('be.visible')
    .within(() => {
      // Find the close button inside the iframe
      cy.get('.close-button') // Adjust selector based on actual close button
        .should('be.visible')
        .click()
    })
    cy.get('[role="dialog"]').find('[class="close"]').click()
    // cy.wait(2000)
    cy.pause()
    cy.get('[data-qa="code_practice"] > .ant-checkbox-wrapper > :nth-child(2)').click()
    cy.get('.ant-input-number-input').first().type('1')
    cy.get('#morale').click()
    cy.get('[title="9"]').click()
    cy.get('#description').type(faker.lorem.sentences(2))
    cy.get('.ant-btn-primary').last().click()
  });

  it("should login using existing session", () => {
    cy.sessionLogin(Cypress.env("email"), Cypress.env("password"));
    cy.get('[data-qa="topmenu-Дневник"]').click()
    // cy.get('.col-md-3').should("contain", 'Test User')
  });

  it("should login using session", () => {
    cy.sessionLogin(Cypress.env("sEmail"), Cypress.env("sPassword"));
    cy.get('[data-qa="topmenu-Дневник"]').click()
  });

  it.skip("should login using session", () => {
    cy.sessionLogin(Cypress.env("email"), Cypress.env("password"));
    cy.get('[data-qa="topmenu-Дневник"]').click()
  });
});
