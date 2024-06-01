import { defineStore } from "pinia";

export const initialForms = {
  register: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    accept: false,
  },
  login: {
    email: "",
    password: "",
  },
  smsCode: ["", "", "", "", "", ""],
};

export const useMyFormsStore = defineStore({
  id: "myFormsStore",
  state: () => ({
    register: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      accept: false,
    },
    login: {
      email: "",
      password: "",
    },
    smsCode: ["", "", "", "", "", ""],
  }),
  actions: {
    clearForm(formName: string) {
      switch (formName) {
        case "register":
          this.register = initialForms.register;
          return true;
        case "login":
          this.login = initialForms.login;
          return true;
        default:
          return false;
      }
    },
  },
  getters: {
    registerFilled: ({ register }) =>
      register.username &&
      register.email &&
      register.password &&
      register.confirmPassword &&
      register.accept,
    loginFilled: ({ login }) => login.email && login.password,
    code: ({ smsCode }) => smsCode.join(""),
  },
});
