import { UserData } from '../../interface/interface';

const userId: string = "67c761439f09318cd7245231";
let cookie: string;

describe("API tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("API login 1", () => {
    cy.request({
      method: "POST",
      url: "https://server-prod.pasv.us/user/login",
      body: {
        email: "romoxe8197@hartaria.com",
        password: "Aa12323",
      },
    }).as("postLogin");
    // cy.get('@postLogin').its('status').should('eq', 200);
    cy.get("@postLogin").its("status").should("be.oneOf", [200, 201, 204]);

    cy.intercept("GET", "https://server-prod.pasv.us/user/auth").as("getAuth");
    cy.reload();
    cy.wait("@getAuth").then((res) => {
      expect(res.response.statusCode).to.be.oneOf([200, 204]);
      expect(res.response.body.payload).to.have.property("_id");
    });
  });

  it("API login 2 (save cookie)", () => {
    cy.request({
      method: "POST",
      url: "https://server-prod.pasv.us/user/login",
      body: {
        email: "romoxe8197@hartaria.com",
        password: "Aa123123",
      },
    }).as("postLogin");

    cy.get("@postLogin").then((res: any) => {
      cy.wrap(res).its("status").should("eq", 200);
      const cookieHeader = res.headers["set-cookie"];
      cookie = JSON.stringify(cookieHeader);
    });
  });

  it("API login 3 (save cookie using task 'save')", () => {
    cy.request({
      method: "POST",
      url: "https://server-prod.pasv.us/user/login",
      body: {
        email: "romoxe8197@hartaria.com",
        password: "Aa123123",
      },
    }).as("postLogin");

    cy.get("@postLogin").then((res: any) => {
      cy.wrap(res).its("status").should("eq", 200);
      const cookieHeader = res.headers["set-cookie"];
      cookie = JSON.stringify(cookieHeader);
      cy.task("save", { cookie });
    });
  });

  it("Spy on api calls", () => {
    cy.visit("/user/login");
    const spy = cy.spy();
    cy.get("#normal_login_email").type(Cypress.env("email"));
    cy.get("#normal_login_password").type(Cypress.env("password"), {
      log: false,
    });
    cy.intercept("POST", "https://server-prod.pasv.us/user/login", spy);
    cy.get(".ant-btn-primary").dblclick();
    cy.wrap({}).should(() => {
      expect(spy).to.be.called;
      expect(spy).to.be.callCount(1);
    });
  });

  it.only("Mock user data", () => {
    cy.request({
      method: "POST",
      url: "https://server-prod.pasv.us/user/login",
      body: {
        email: "romoxe8197@hartaria.com",
        password: "Aa123123",
      },
    }).as("postLogin");
    cy.get("@postLogin").its("status").should("be.oneOf", [200, 201, 204]);
    cy.intercept('GET', `https://server-prod.pasv.us/user/${userId}`, {
        payload: {
            name: 'Tanya Karsova'
        } as UserData
    }).as('mockUser')

    cy.visit(`/profile/${userId}`)
    cy.wait('@mockUser')
    cy.get('h1').should('have.text', 'Tanya Karsova')
  });
});
