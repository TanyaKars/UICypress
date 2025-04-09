import { ContactData } from "../interface/interface";
import "./commands";
import "cypress-real-events";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Cypress.Chainable<void>;
      sessionLogin(email: string, password: string): Cypress.Chainable<void>;
      test(testData: ContactData): Cypress.Chainable<void>;
      getIframeBody(iframe: string): Cypress.Chainable<JQuery<HTMLElement>>;
    }
  }
}
