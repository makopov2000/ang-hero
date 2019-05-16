import { browser, by, element } from 'protractor';
export class LoginPage {
  navigateTo() {
    return browser.get('/admin');
  }

  getEmailTextbox() {
    return element(by.id('username'));
  }
  getPasswordTextbox() {
    return element(by.id('password'));
  }

  getForm() {
    return element(by.css('#loginForm'));
  }

  getSubmitButton() {
    return element(by.css('#btnSubmit'));
  }

  get username() {
    return element(by.id('username'));
  }
  get password() {
    return element(by.id('password'));
  }
  get signIn() {
    return element(by.className('login__button'));
  }

  getPoints() {
    //<div>
    //  Points: <span>{{ points }}</span>
    //< /div>
    return element(by.cssContainingText('div', 'Points')).$('span').getText();
  }

  getPlus1Button() {
    //<button (click)="plus1()" > Plus 1 < /button>
    return element(by.cssContainingText('button', 'Plus 1'));
  }


}
