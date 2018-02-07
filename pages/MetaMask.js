//"use strict";
console.log(module.filename);
const key = require('selenium-webdriver').Key;
const page=require('./Page.js');
const webdriver = require('selenium-webdriver'),
      chrome = require('selenium-webdriver/chrome'),
      firefox = require('selenium-webdriver/firefox'),
      by = require('selenium-webdriver/lib/by');
const By=by.By;

const IDMetaMask="nkbihfbeogaeaoehlefnkodbefgpgknn";
const URL="chrome-extension://"+IDMetaMask+"//popup.html";
const passMetaMask="kindzadza";
const fieldEnterPass= By.xpath("//*[@id=\"password-box\"]");
const buttonUnlock=By.xpath("//*[@id=\"app-content\"]/div/div[4]/div/div[1]/button");
const buttonBuy= By.xpath("//*[@id=\"app-content\"]/div/div[4]/div/div/div[2]/button[1]");
const buttonSend= By.xpath("//*[@id=\"app-content\"]/div/div[4]/div/div/div[2]/button[2]");
const buttonSubmit=By.xpath("//*[@id=\"pending-tx-form\"]/div[3]/input");
const fieldGasPrise=By.xpath("//*[@id=\"pending-tx-form\"]/div[1]/div[2]/div[3]/div[2]/div/div/input");
///////Imported from TestCircle//////
const buttonAccept=By.xpath('//*[@id="app-content"]/div/div[4]/div/button');
const agreement=By.xpath("//*[@id=\"app-content\"]/div/div[4]/div/div/div/p[1]/strong");
const fieldNewPass=By.xpath("//*[@id=\"password-box\"]");
const fieldConfirmPass=By.xpath("//*[@id=\"password-box-confirm\"]");
const buttonCreate=By.xpath("//*[@id=\"app-content\"]/div/div[4]/div/button");
const fieldSecretWords=By.xpath("//*[@id=\"app-content\"]/div/div[4]/div/textarea");
const buttonIveCopied=By.xpath("//*[@id=\"app-content\"]/div/div[4]/div/button[1]");
const popupNetwork=By.xpath("//*[@id=\"network_component\"]/div/i");
const popupRinkeby=By.className("menu-icon golden-square");
const popupAccount=By.xpath("//*[@id=\"app-content\"]/div/div[1]/div/div[2]/span/div");
const popupImportAccount=By.xpath("//*[@id=\"app-content\"]/div/div[1]/div/div[2]/span/div/div/span/div/li[3]/span");
const popupImportAccountCSS="#app-content > div > div.full-width > div > div:nth-child(2) > span > div > div > span > div > li:nth-child(4) > span";
const fieldPrivateKey=By.xpath("//*[@id=\"private-key-box\"]");
const pass="kindzadza";
//const privateKey="03c06a9fab22fe0add145e337c5a8251e140f74468d72eab17ec7419ab812cd0";
//const address="0xF16AB2EA0a7F7B28C267cbA3Ed211Ea5c6e27411";
const buttonImport=By.xpath("//*[@id=\"app-content\"]/div/div[4]/div/div[3]/button");
const secretWords="mask divorce brief insane improve effort ranch forest width accuse wall ride";
const amountEth=By.xpath("//*[@id=\"app-content\"]/div/div[4]/div/div/div[2]/div[1]/div/div/div[1]/div[1]");




class MetaMask extends page.Page{

    constructor(driver,wallet){
        super(driver);
        this.URL=URL;
        this.wallet=wallet;


    }
    setGasPriceTransaction(price){
        super.fillWithWait(fieldGasPrise,price);
    }


    clickButtonSubmit(){
        super.clickWithWait(buttonSubmit);

    }
    clickPopupNetwork(){
        super.clickWithWait(popupNetwork);

    }
     isReadyTransaction(){
        return this.isElementPresent(buttonSubmit);
    }
    submitTransaction(){
        this.clickButtonSubmit();

    }

    unlock() {
    //this.open();
    super.fillWithWait(fieldEnterPass,passMetaMask);
    super.clickWithWait(buttonUnlock);
}

    open()
    {
        this.driver.get(this.URL);

    }
    clickDotMenu(){
        super.clickWithWait(dotMenu);
    }


    getAddressWallet(){
        //super.clickWithWait(addrWallet);
        return this.driver.findElement(addrWallet).getText();

    }

activate(){
    super.clickWithWait(buttonAccept);
    const action=this.driver.actions();
    action.click(this.driver.findElement(agreement)).perform();

    for (var i=0;i<9;i++) {
        action.sendKeys(key.TAB).perform();
    }
    super.clickWithWait(buttonAccept);
    super.fillWithWait(fieldNewPass,pass);
    super.fillWithWait(fieldConfirmPass,pass);
    super.clickWithWait(buttonCreate);
    this.driver.sleep(1500);
    this.driver.findElement(fieldSecretWords).getText().then(console.log);
    super.clickWithWait(buttonIveCopied);
    super.clickWithWait(popupNetwork);
    this.driver.executeScript("document.getElementsByClassName('menu-icon golden-square')[0].click();");
    super.clickWithWait(popupAccount);
    this.driver.executeScript("document.getElementsByClassName('dropdown-menu-item')[2].click();");
    super.fillWithWait(fieldPrivateKey,this.wallet.privateKey);
    this.driver.sleep(1500);
    super.clickWithWait(buttonImport);
    this.driver.sleep(1500);
    this.driver.findElement(amountEth).getText().then(console.log);



}


}
module.exports={MetaMask:MetaMask,
    buttonSubmit:buttonSubmit,

}
