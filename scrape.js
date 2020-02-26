const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const fs = require("fs");
const noticeSchema = require("./noticeSchema.js");

mongoose.connect("mongodb://localhost/notices", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function scrape(url) {
  console.log("\x1b[32m%s\x1b[32m", "[x] Launching Browser");
  // Launch the Chromium Browser
  const browser = await puppeteer.launch();

  // Open Tab
  const page = await browser.newPage();

  // Waiting 3 seconds to Load the Browser
  //"\x1b[5m"
  console.log("\x1b[36m%s\x1b[36m", "  ├[x] Waiting for browser to load");
  await page.waitFor(3000);

  // Navigating to the URL => kes e-notices page
  await page.goto(url);

  // Waiting for URL to load
  console.log("\x1b[36m%s\x1b[36m", "  ├[x] Waiting for URL to load");
  await page.waitFor(3000);

  // Setting Viewport for the Window
  console.log("\x1b[36m%s\x1b[36m", "  ├[x] Setting Viewport");
  await page.setViewport({
    width: 1200,
    height: 800
  });

  console.log("%s", "  └[✓] URL Loaded Succesfully!\n");

  // Taking Screenshot of the Page (DEBUG Purpose)
  await page.screenshot({
    path: "webpage.png"
  });
  console.log("\x1b[33m%s\x1b[33m", "  [✓] took Screenshot\n");

  console.log("  [x] Starting to Scrape");
  // Getting all the Notices
  const data = await page.evaluate(() => {
    // Targeting the notices group
    x = document.querySelectorAll(".list-group-item");
    title = [];
    console.log("\x1b[36m%s\x1b[36m", "    ├[x] Iterating over array of Nodes");
    // Iterating Over the array of Nodes
    for (let i = 0; i < x.length; i++) {
      if (x[i].childElementCount != 0) {
        let noticeIndex = parseInt(x[i].children[1].innerText.split(" ", 1)[0]);
        let noticeTitle = x[i].children[1].innerText
          .replace(/[0-9]/g, "")
          .replace(" ", "", 1);
        let noticeDescription = x[i].children[2].innerText.toUpperCase();
        let noticeLink = x[i].getAttribute("href");
        let exam = false;
        let defaulter = false;
        let atkt = false;
        let seating_arrangement = false;
        let attendance = false;
        let result = false;
        let detention = false;

        if (noticeDescription.search("EXAM") != -1) {
          exam = true;
        }
        if (noticeDescription.search("DEFAULTER") != -1) {
          defaulter = true;
        }
        if (noticeDescription.search("ATKT") != -1) {
          atkt = true;
        }
        if (noticeDescription.search("SEATING") != -1) {
          seating_arrangement = true;
        }
        if (noticeDescription.search("ATTENDANCE" || "ATTENDENCE") != -1) {
          attendance = true;
        }
        if (noticeDescription.search("RESULT") != -1) {
          result = true;
        }
        if (noticeDescription.search("DETENTION") != -1) {
          detention = true;
        }

        let filters = {
          exam,
          defaulter,
          atkt,
          seating_arrangement,
          attendance,
          result,
          detention
        };

        title.push({
          noticeIndex,
          noticeTitle,
          noticeDescription,
          noticeLink,
          filters
        });
      }
    }
    console.log("\x1b[36m%s\x1b[36m", "    ├[x] Completed generating JSON");
    return title;
  });

  console.log("\x1b[36m%s\x1b[36m", "    └[✓] Completed Scraping!");

  console.log("\x1b[33m%s\x1b[33m", "\n[x] Creating JSON File");
  jsonData = JSON.stringify(data);
  fs.writeFile("./notices.json", jsonData, function(err) {
    if (err) {
      return console.log(err);
    }

    console.log(
      "\x1b[32m%s\x1b[32m",
      "    └[✓] The file was saved! : './notices.json'\n"
    );
  });
  console.log(
    "\x1b[35m%s\x1b[35m",
    `    ├[x] The length of data is ${data.length}`
  );

  await browser.close();

  console.log("\x1b[34m%s\x1b[34m", "[✓] Closed Browser\n");

  console.log("[x] Starting Database Processing");
  await noticeSchema.deleteMany({}, err => {
    if (err) return err;
    else
      console.log(
        "\x1b[31m%s\x1b[31m",
        "  ├[x] Deleted Old Notices in Database"
      );
  });

  await noticeSchema.insertMany(data, err => {
    if (err) return err;
    else
      console.log(
        "\x1b[32m%s\x1b[32m",
        "  └[✓] Saved New Notices in Database!\n"
      );
    console.log("\x1b[31m[x] Press CTRL + C to stop now!\x1b[31m");
  });
  return true;
}

scrape("http://kesshroffcollege.com/enotices/");
