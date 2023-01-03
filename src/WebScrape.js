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
  const maxCharacters = 4900;

  const allText = p_tags.join(" "); // join all the p_tags elements into a single string
  let currentIndex = 0;

  while (currentIndex < allText.length) {
    let slice = allText.slice(currentIndex, currentIndex + maxCharacters);

    // If the slice ends in the middle of a word, move the end index back to the beginning of the word
    if (/\S/.test(allText.charAt(currentIndex + maxCharacters))) {
      let endIndex = slice.lastIndexOf(" ");
      if (endIndex === -1) {
        endIndex = slice.length;
      }
      slice = slice.slice(0, endIndex);
    }

    slices.push(slice);
    currentIndex += slice.length;
  }

  //console.log(slices[0]);
  
  // Close the browser
  await browser.close();
  
  return slices;
  }
} 