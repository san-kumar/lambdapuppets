# Little Lambda Puppets (LLP)

Little Lambda Puppets (LLP) are self-contained instances of [puppeteer](https://developers.google.com/web/tools/puppeteer) 
that run on AWS lambda (and have a life of their own). 

## What can LLPs do?

- Check your website every 5 minutes (and [telegram](https://telegram.org/) you if something looks off)
- Watch the price of your favorite product and email you when it changes.
- Scrape a website using Puppeteer and return the HTML using a simple GET request.
- Scrape a website using Puppeteer every X minutes and ping a URL with fresh data.

## Installation

Installation is simple. All you need is PHP 7+ with [`composer`](https://getcomposer.org)

To install, just type this on your command line (terminal)

    composer create-project lambdapuppets/lambdapuppets project-name

This should create a *project-name* directory inside which there is a `puppets` directory. 

Put your [puppeteer scripts](#examples) inside this `puppets` directory and then run the following command: 

    llp deploy -v

*You may need to enter your AWS credentials as [described here](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) (same as aws-cli)*.

If everything goes as expected, you should see this message:

    Your puppets are alive!
    
    To talk to your puppets just visit these URLs: 
    scraper: https://XXXX.execute-api.us-east-1.amazonaws.com/puppet/scraper

*(If you get a "command not found" error, make sure you have `./vendor/bin` in your PATH)*

That's it! Depending on each puppet it will either run as a cron job (i.e. every X minutes) or you can talk to it directly 
via its URL (as shown after deployment). 

## Examples

 - **Uptime puppet**

   This puppet checks a website every "X" minutes and send you a [telegram](https://telegram.org/) if something feels off.
   You can also configure it to send an email or ping a URL instead. 
     
   [source](#) 

 - **Price watch puppet**

   This puppet checks the price of product every "X" minutes and notifies you if it changes (telegram, email, ping, sms, etc)
     
   [source](#) 
   
 - **Scraper puppet**

   This puppet scrapes the data off a web page and returns it as CSV (comma separated values). 
   It does not run automatically but have to manually invoke it using a GET request (the URL that's shown after [deployment](#installation)). 
     
   [source](#) 
   
- **Screenshot puppet**

   This puppet turns a webpage into a pdf or jpeg file.  It does not run automatically but have to manually invoke it using a GET request (the URL that's shown after [deployment](#installation)).
        
   [source](#) 

## Scripting

Here is an example of a very simple puppet:

````javascript
const browser = require('browser');

module.exports.run = async (event) => {
  const page = await browser.newPage();
  await page.goto('https://example.com');
  
  return await page.content();
};
````
   
Save this code as `scraper.js` inside your `puppets` directory and run the following command on your terminal:

````
~$ llp deploy -v

   Your puppet is alive!

   To talk to your puppet, just visit this URL: 
   scraper: https://XXXX.execute-api.us-east-1.amazonaws.com/puppet/scraper
````    
   
### Two important differences

- You need to use `const browser = require('browser');` instead of `const puppeteer = require('puppeteer');` inside your puppeteer scripts.
- You must place your puppeteer code inside `module.exports.run = async (event) => {...}` as shown in the example above.  
   
## Activating puppets

In the example above the puppet does not run until you visit the URL shown after deployment. It's a dormant puppet.

It is also possible to run your puppets via CRON. This will wake up your puppets every "X" minutes and pipe the results to you via telegram, email, sms, URL ping, etc.
This is called an active puppet.

To create active puppets:

- First create a `llp.ini` in your project's root directory (i.e. the directory above your `puppets` directory)
- Then create a section named after your *puppet* like shown below

So if your puppet name is `scraper` (i.e. `scraper.js` in `puppets` dir), do this

````ini
[scraper] 
cron=*/5 * * * *
telegram=telegram_sid
email=youremail@domain
ping=https://someurl.com
````

This will run your scraper puppet every 5 minutes and send the output to telegram, email and url ping (unless it returns *false*)

## Cost

It's free and open-source. In addition to that AWS lambda also gives you 1 million free requests per month and 400,000 GB-seconds of compute time per month ([details here](https://aws.amazon.com/lambda/pricing/)). So it's virtually free for doing lightweight jobs. 
   
## Need more features?

This was just a weekend project for my own amusement but I will definitely add more features soon.

- Please [star this project](https://github.com/san-kumar/lambdapuppets) to show your interest.
- Leave me some feedback on this [HN thread](https://news.ycombinator.com/item?id) (please use *Issues* for bugs only).
- Contribute and send me PRs because that's what OSS is all about.

## License

The software is licensed using a GPL License. It means you can do whatever you want with it (including using it for commercial purposes freely), as long as you include the original copyright and license notice in any copy of the software/source.