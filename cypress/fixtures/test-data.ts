export const loginPage = {
  name: "Test User",
  pasvLoginUrl: "https://coding.pasv.us/user/login",
  loginError: "User login. Fail",
} as const;

export const pasvLocators = {
  fields: {
    email: "#normal_login_email",
    password: "#normal_login_password",
  },
  buttons: {
    submit: ".ant-btn-primary",
  },
  errors: {
    loginMessage: ".ant-notification-notice-message",
  },
} as const;

export const data = {
  invalid: {
    email: "test@test.com",
  },
} as const;

export const navBarValues: string[] = ["Курсы", "Задачи", "Интервью"] as const;
