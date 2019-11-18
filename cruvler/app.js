const puppeteer = require('puppeteer');
const fs = require('fs');
const moveFile = require('move-file');

function getGridLinks() {
    return Array.from(document.querySelectorAll('#sites-chrome-sidebar-left a'))
        .map(link => link.href);
}

function getMagazineNames() {
    return Array.from(document.querySelectorAll('#sites-chrome-sidebar-left a'))
        .map(link => link.textContent);
}

function getYearLinks() {
    return Array.from(document.querySelectorAll('table table tr td:first-of-type a[href*="sites.google.com/site/"]'))
        .map(link => link.href);
}

function getFoldedTitle() {
    return document.querySelector('#sites-page-title').textContent
}

function getMagazineLinks() {
    return Array.from(document.querySelectorAll('a[href*="yadi.sk"]'))
        .map(link => link.href)
}

function delay(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(true), n)
    });
}

function getMagazineName() {
    return document.querySelector('.file-name').textContent
}

(async() => {

    try {
        const browser = await puppeteer.launch({
            headless: false
        });

        const page = await browser.newPage();
        await page.goto('https://sites.google.com/site/zurnalysssr/home', {timeout: 0});

        const gridLinks = await page.evaluate(getGridLinks);

        //105 - Юный technik
        for (let i = 112; i < gridLinks.length; i++) {
            let gridLinkElement = gridLinks[i];

            await page.goto(gridLinkElement, {timeout: 0});

            const yearLinks = await page.evaluate(getYearLinks);

            for (let j = 0; j < yearLinks.length; j++) {
                const yearLink = yearLinks[j];

                await page.goto(yearLink, {timeout: 0});

                const folderTitle = await page.evaluate(getFoldedTitle);

                if (!fs.existsSync(folderTitle)) {
                    fs.mkdirSync(folderTitle);
                }

                const magazineLinks = await page.evaluate(getMagazineLinks);
                let magazineNames = [];

                for (let z = 0; z < magazineLinks.length; z++) {
                    const magazineLink = magazineLinks[z];

                    try {
                        await page.goto(magazineLink, {timeout: 0});
                        const magazineName = await page.evaluate(getMagazineName);
                        magazineNames.push(magazineName);
                        await page.click('.content__centered .action-buttons__button_download');
                        await delay(5000);
                    } catch (e) {
                        continue;
                    }
                }

                for (let m = 0; m < magazineNames.length; m++) {
                    const magazineName = magazineNames[m];
                    let times = 0;

                    while (true) {
                        if (fs.existsSync(`../${magazineName}`) || times > 20) {
                            break;
                        }

                        times++;
                        await delay(3000);
                    }

                    if (times > 20) {
                        continue;
                    }

                    await moveFile(`../${magazineName}`, `${folderTitle}/${magazineName}`);
                }

            }

        }

        await browser.close();

    } catch (e) {
        console.log(e);
    }

})();
