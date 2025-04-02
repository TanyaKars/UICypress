import { navBarValues } from "../fixtures/test-data";
import { HomePage } from "./HomePage";

export class LoginPage extends HomePage {
  private loginInput = () => cy.get("#normal_login_email");
  private passwordInput = () => cy.get("#normal_login_password");
  submitBtn = () => cy.get(".ant-btn-primary");

  filloutLoginFields = (email: string, password: string) => {
    this.open("/user/login");
    this.loginInput().type(email);
    this.passwordInput().type(password);
  };

  submitLoginForm = () => {
    this.submitBtn().click();
    this.verifyNavBar([...navBarValues, "Дневник"]);
  };
}
