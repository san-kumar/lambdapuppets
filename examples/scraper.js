//This puppet does not run automatically but have to manually invoke it using a GET request (the URL that's shown after deployment).

module.exports.run = async (browser, event) => {
    const page = await browser.newPage();
    await page.goto('https://duckduckgo.com/', {waitUntil: 'networkidle2'});
    await page.type('input#search_form_input_homepage', 'chrome puppeteer', {delay: 50});
    await page.click('input#search_button_homepage');
    await page.waitForSelector('.results--main #r1-0');

    return await page.evaluate(() => document.querySelector('a.result__a').textContent.trim());
};