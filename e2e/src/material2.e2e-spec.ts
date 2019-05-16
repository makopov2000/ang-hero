import { browser, by, element, logging, promise, ElementFinder, ElementArrayFinder } from 'protractor';


describe('workspace-project App', () => {
   

  beforeEach(() => {
    browser.get('/matedit2');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('should display button', () => {
    element(by.buttonText('Load Data')).isPresent;
    element(by.buttonText('Load Data')).isEnabled;
  });


  it('Load button should work', () => {

    element(by.buttonText('Load Data')).click();
    //expect(element(by.id('source-modal')).isPresent()).toBeTruthy('The modal window should appear now');
    //element(by.name('title')).sendKeys('Hello world in Ruby');
    //element(by.name('language')).element(by.cssContainingText('option', 'Ruby')).click();
    //element(by.name('paste')).sendKeys("puts 'Hello world';");
    
    //element(by.id('firstName')).sendKeys('nithinkumar');

    //element(by.id('lastName')).sendKeys('123456');

    //element(by.id('userName')).sendKeys('nithin');

    //element(by.id('pwd')).sendKeys('123456');

    //element(by.css('.btn-register')).click();
  });

  //it('should redirect the user to the dashboard page if they provided correct credentials', () => {
  //  const dashboardPage = new DashboardPage();
  //  page.username.sendKeys('correct');
  //  page.password.sendKeys('correct');
  //  page.signIn.click();
  //  browser.wait(EC.visibilityOf(dashboardPage.title));
  //  expect(dashboardPage.title.isPresent()).toBeTruthy();
  //});


});
