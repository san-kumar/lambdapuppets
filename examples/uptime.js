//You can set your lambdapuppets.ini to run this script automatically every 5 minutes
//See here: https://github.com/san-kumar/lambdapuppets#activating-puppets

module.exports.run = async (browser, event) => {
    const page = await browser.newPage();
    await page.goto('https://example.com');

    let title = await page.title();

    if (title !== 'Example Domain')
        return 'Bloody murder on example.com'; //this msg will be sent to you via telegram, email and a URL will also be pinged (as described in config below)
    else
        return ''; //returning an empty string does no
};

module.exports.config = {
    pipe: {
        telegram: {bot_id: 'botNNNNN:YYYYY', chat_id: '1234567'}, //how to get bot_id? see here: https://github.com/san-kumar/lambdapuppets#telegram
        email: {from: 'you@domain', to: 'admin@domain', subject: 'yo check this out'}, //make sure to verify your email in SES account
        url: {target: 'https://xxx.requestcatcher.com/wtf'},
    }
};
