//This puppet does not run automatically but have to manually invoke it using a GET request (the URL that's shown after deployment).

module.exports.run = async (browser, event) => {
    const params = event['queryStringParameters'] || {};
    const targetUrl = params.url || 'https://www.example.com';
    const targetFormat = params.type || 'png';

    let output;

    const page = await browser.newPage();
    await page.setViewport({width: 1024, height: 768});
    await page.goto(targetUrl, {waitUntil: ['domcontentloaded', 'networkidle0'],});

    if (targetFormat === 'pdf') {
        const margin = params.margin || '1cm';
        const pdf = await page.pdf({format: 'A4', printBackground: true, margin: {top: margin, right: margin, bottom: margin, left: margin}});
        output = pdf.toString('base64');
    } else {
        output = await page.screenshot({clip: {x: 0, y: 0, width, height}, encoding: 'base64'});
    }

    return { //if return value is an object, it is returned directly without any additional processing
        statusCode: 200,
        body: output,
        headers: {
            'Content-Type': targetFormat === 'pdf' ? 'application/pdf' : 'image/png',
            'Access-Control-Allow-Origin': '*',
        },
        isBase64Encoded: true
    };
};