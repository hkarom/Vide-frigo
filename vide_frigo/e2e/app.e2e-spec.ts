import { browser, by, element, protractor } from 'protractor';

describe('vide-frigo App', function() {

  it('should get the title VideFrigo', function() {
    browser.get('/');
    expect(browser.getTitle()).toEqual('VideFrigo');
  });

  it('should navigate to login', function(){
    element(by.id('login')).click();
    expect(element(by.id('pagelogin')).getText()).toEqual('Login');
  })

  it('should navigate to signup', function(){
    element(by.id('signup')).click();
    expect(element(by.id('pagesignup')).getText()).toEqual('Register form');
  })

  it('should renavigate to home', function(){
    element(by.id('home')).click();
    expect(element(by.id('filter')).getText()).toEqual('Filters');
  })

});
