//You can set your lambdapuppets.ini to run this script automatically once every week
//See here: https://github.com/san-kumar/lambdapuppets#activating-puppets

module.exports.run = async (browser, event) => {
    const page = await browser.newPage();
    await page.goto('https://www.newegg.com/asus-rog-zenith-ii-extreme/p/N82E16813119220');

    let price = await page.$eval('li.price-current', (element) => element.innerText);

    if (price < 800)
        return 'Hey the price has dropped to ' + price; //this msg will be sent to you via telegram, email and a URL will also be pinged (as described in config below)
    else
        return ''; //returning an empty string does not trigger pipes
};

module.exports.config = {
    pipe: {
        telegram: {bot_id: 'botNNNNN:YYYYY', chat_id: '1234567'}, //how to get bot_id? see here: https://github.com/san-kumar/lambdapuppets#telegram
        email: {from: 'you@domain', to: 'admin@domain', subject: 'get it now'}, //make sure to verify your email in SES account
        url: {target: 'https://xxx.requestcatcher.com/wtf'},
    }
};
