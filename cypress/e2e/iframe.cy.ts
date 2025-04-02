describe("iframe", () => {
  beforeEach(() => {
    cy.visit("https://webdriveruniversity.com/index.html");
    cy.get("#iframe").invoke("removeAttr", "target").click();
  });
  it("iframe using promises", () => {
    cy.get("#frame").then((frame) => {
      const iframeBody = frame.contents().find("body");
      cy.wrap(iframeBody).find("#button-find-out-more").click();
      cy.wrap(iframeBody)
        .find(".modal-body")
        .should(
          "include.text",
          "Welcome to webdriveruniversity.com we sell a wide range of electrical goods such as laptops, game consoles, cameras...",
        );
    });
  });
  it("iframe using alias", () => {
    cy.get("#frame").then((frame) => {
      const iframeBody = frame.contents().find("body");
      cy.wrap(iframeBody).as("iframeBody");
      cy.get("@iframeBody").find("#button-find-out-more").click();
      cy.get("@iframeBody")
        .find(".modal-body")
        .should(
          "include.text",
          "Welcome to webdriveruniversity.com we sell a wide range of electrical goods such as laptops, game consoles, cameras...",
        );
    });
  });
  it("iframe using plugin", () => {
    cy.frameLoaded("#frame");
    cy.iframe("#frame").then((frame: JQuery) => {
      cy.wrap(frame).as("iframeBody");
      cy.get("@iframeBody").find("#button-find-out-more").click();
      cy.get("@iframeBody")
        .find(".modal-body")
        .should(
          "include.text",
          "Welcome to webdriveruniversity.com we sell a wide range of electrical goods such as laptops, game consoles, cameras...",
        );
    });
  });

  it("iframe using custom commands", () => {
    cy.getIframeBody("#frame").as("iframeBody");
    cy.get("@iframeBody").find("#button-find-out-more").click();
    cy.get("@iframeBody")
      .find(".modal-body")
      .should(
        "include.text",
        "Welcome to webdriveruniversity.com we sell a wide range of electrical goods such as laptops, game consoles, cameras...",
      );
  });
});

describe("HW", () => {
  it.only("1", () => {
    cy.visit("https://letcode.in/frame");
    cy.frameLoaded("#firstFr");
    cy.wait(2000);
    cy.iframe("#firstFr").then((frame: JQuery) => {
      cy.wrap(frame).as("iframeBody");
      cy.get("@iframeBody").find('[name="fname"]').type("Hello");
    });
  });
});
