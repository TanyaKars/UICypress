export class HomePage {
  navBar = () => cy.get(".navbar-nav");
  // navBar = () => '.navbar-nav'
  navBarSiblings = () => cy.get("div > div > a");

  open = (path: string = "/") => cy.visit(path);

  verifyNavBar = (navBarValues: string[]) => {
    this.navBar().within(() => {
      this.navBarSiblings().each((el, i) => {
        console.log(el.text());
        cy.log(el.text());
        // expect(el.text()).eq(navBarValues[i])
        cy.wrap(el).invoke("text").should("eq", navBarValues[i]);
      });
    });
  };
}
