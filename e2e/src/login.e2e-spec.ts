import { browser, by, element, logging, promise, ElementFinder, ElementArrayFinder, protractor } from 'protractor';
import { LoginPage } from './login.po';
//import { DashboardPage } from './dashboard.po';

describe('Login tests', () => {
  let page: LoginPage;
  //const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
  });

  it('Login form should be valid', () => {
    page.getEmailTextbox().sendKeys('mike');
    page.getPasswordTextbox().sendKeys('1234');
    let form = page.getForm().getAttribute('class');
    
    expect(form).toContain('ng-valid');
  });

  it('Should set email value to local storage', () => {
    page.getEmailTextbox().sendKeys('info@sibeeshpassion.com');
    page.getPasswordTextbox().sendKeys('1234');
    page.getSubmitButton().click();
    //let valLocalStorage = browser.executeScript("return window.localStorage.getItem('LoggedInUser');");
    //expect(valLocalStorage).toEqual('info@sibeeshpassion.com');
  });

  it('should redirect the user to the dashboard page if they provided correct credentials', () => {
    //const dashboardPage = new DashboardPage();
    page.username.sendKeys('correct');
    page.password.sendKeys('correct');
    page.signIn.click();
    //browser.wait(EC.visibilityOf(dashboardPage.title));
    //expect(dashboardPage.title.isPresent()).toBeTruthy();
  });

  it('Should rest points by clicking plus1', () => {
    page.navigateTo();
    page.getPlus1Button().click();
    page.getPlus1Button().click();

    expect(page.getPoints()).toEqual('2');
  });

});
