module.exports.run = async (browser, event) => {
    const page = await browser.newPage();
    await page.goto('https://example.com');

    return await page.title();
};