const puppeteer = require('puppeteer');

//getSlices();
module.exports = {
  getSlices: async () => {
    console.log("Inside of WebScrape.js...")
    let slices = [];

  // Launch a headless Chrome instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto("https://cis.org/Report/Immigrant-Workers-November-2022-19-Million-Over-2019");

  // Wait for the page to load
  await page.waitForSelector("p");

  // Get the text of all the <p> tags on the page
  const p_tags = await page.evaluate(() => {
    const tags = document.querySelectorAll("p");
    return Array.from(tags).map(tag => tag.textContent);
  });

  // Print the text of each <p> tag
  let textArr = [];



    for (let i = 0; i < p_tags.length; i++) {
        let j = 0;

        while (p_tags[i].length > 0) {
            if (textArr[j] == null) {
                textArr[j] = "";
            }
        
            if (textArr[j].length + p_tags[i].length >= 4800) {
                let remainingLength = 4800 - textArr[j].length;
                textArr[j] += p_tags[i].substring(0, remainingLength);
                p_tags[i] = p_tags[i].substring(remainingLength);
                j++;
            } else {
                textArr[j] += p_tags[i];
                p_tags[i] = "";
            }
        }
    }

  //console.log(slices[0]);
  
  // Close the browser
  await browser.close();
  
  return textArr;
  }
} 