//This script uses Zombie browser http://zombie.js.org/

module.exports.run = async (browser, event) => {
    await browser.visit('https://example.com');

    return browser.html('h1');
};

module.exports.config = {
    browser: 'zombie',
};