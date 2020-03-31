module.exports.run = async (browser, event) => {
    const page = await browser.newPage();
    await page.goto('https://example.com');

    return await page.title();
};

module.exports.config = {
    pipe: {
        telegram: {bot_id: 'bot639867240:AAFB_skcLXfG2z1JzWXvnm4wN6N9W0NvT-Y', chat_id: '730349437'},
        email: {from: 'san@uploader.win', to: 'sanchitbh@gmail.com', subject: 'yo check this'},
        url: {target: 'https://xxx.requestcatcher.com/test'},
    }
};
