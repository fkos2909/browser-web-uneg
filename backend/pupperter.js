// import puppeteer from "puppeteer";
// import fs, { read } from "fs";
// import path from "path";
// import {fileURLToPath} from 'url';


const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const pathJson = path.join(__dirname, './data.json');

const readJson = () => {
    const base = {articles: []};
    try{
        const data = fs.readFileSync(pathJson, 'utf-8');
        const { articles } = (data.length === 0) ?  base :  JSON.parse(data);
        return articles;
    }
    catch(error){
        fs.writeFileSync("data.json", JSON.stringify(base, null, 4), 'utf-8');
        return [];
    }
    
}

const writeJson = (data) => {    
    try{
        fs.writeFileSync(pathJson, JSON.stringify({articles: data}, null, 4), 'utf-8');
    }
    catch(error){
        console.log(error);
    }
}


const getScielo = async () => {
    try{
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
        });
        const page = await browser.newPage();
        await page.goto("https://search.scielo.org/?lang=es&count=15&from=1&output=site&sort=&format=summary&fb=&page=1&q=lenguajes", {waitUntil: "domcontentloaded",});
        const Results = await page.evaluate(() => {
            const items = document.querySelectorAll("div.results > .item");
            const results = [];
            // Podemos construir la url para avanzar de pagina
            // const count = document.searchForm.count.value;
            // const from = (2*count)-count+1;

            // var url = new URL(document.URL);
            // url.searchParams.set("from", from);
            // url.searchParams.set("page", (++document.searchForm.page.value));
            // url_list.push(url);

            items.forEach((item) => {
                results.push(
                    {
                        title: item.querySelector('div > div.line > a > strong.title').innerText,
                        div: item.querySelector('div > div.line').innerText,
                        url: item.querySelector('div > div.line > a').href,
                        id: item.id
                    }
                )
            })
            return results;
        }) 
        let articles = readJson();
        Results.forEach((element => {
            articles.push(element);
        }))
        writeJson(articles);
        await browser.close();
    }
    catch(error){
        console.log(error);
    }

};

const getBioMedCentral = async () => {
    try{
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
        });
        const page = await browser.newPage();        
        await page.goto("https://www.biomedcentral.com/search?query=languages+and+culture&searchType=publisherSearch", {waitUntil: "domcontentloaded", timeout: 0});
        const Results = await page.evaluate(() => {
            const items = document.querySelectorAll("ol.c-listing > li");
            const results = [];
            items.forEach((item) => {
                results.push(
                    {
                        title: item.querySelector('article > h3.c-listing__title > a').innerText,
                        url: item.querySelector('article > ul.c-listing__view-options > li:nth-child(2) > a').href,
                    } 
                )
            })
            return results;
        }) 

        let articles = readJson();
        Results.forEach((element => {
            articles.push(element);
        }))
        writeJson(articles);
        await browser.close();
    }
    catch(error){
        console.log(error);
    }
};

const getOsti = async () => {
    try{
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
        });
        const page = await browser.newPage();
        await page.goto("https://www.osti.gov/search/semantic:languages", {waitUntil: "domcontentloaded", timeout: 0});
        const Results = await page.evaluate(() => {

            const items = document.querySelectorAll("ol.item-list > li");
            const results = [];
            
            items.forEach((item) => {
                results.push({
                    title: item.querySelector('h2.title > a').innerText,
                    url_doi: item.querySelector('a.doi-link') !== null ? item.querySelector('a.doi-link').href : null,
                    url_text : item.querySelector('a.fulltext-link') !== null ? item.querySelector('a.fulltext-link').href : null,
                }) 
            })
            return results;
        }) 
        let articles = readJson();
        Results.forEach((element => {
            articles.push(element);
        }))
        writeJson(articles);
        await browser.close();
        
    }
    catch(error){
        console.log(error);
    }

};

const getCore = async () => {
    try{
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
        });
        const page = await browser.newPage();
        await page.goto("https://core.ac.uk/search?q=languages+and+culture&page=1", {waitUntil: "domcontentloaded", timeout: 0});
        const Results = await page.evaluate(() => {

            const items = document.querySelectorAll("div.styles_main__3YQAh > div.styles_search-results__2AZDM");
            const results = [];
            items.forEach((item) => {
                results.push({
                    title: item.querySelector('h3.styles-title-1k6Ib > a').innerText,
                    url: item.querySelector('figure.styles-thumbnail-1xurx > a').href,
                })
            })
            return results;
        }) 
        let articles = readJson();
        Results.forEach((element => {
            articles.push(element);
        }))
        writeJson(articles);
        await browser.close();
        
    }
    catch(error){
        console.log(error);
    }

};

const getEric = async () => {
    try{
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
        });
        const page = await browser.newPage();
        await page.goto("https://eric.ed.gov/?q=languages", {waitUntil: "domcontentloaded", timeout: 0});
        const Results = await page.evaluate(() => {
            const items = document.querySelectorAll("#rrw > div.r_i");
            const results = [];
            items.forEach((item) => {
                results.push({
                    title: item.querySelector('div.r_t > a').innerText,
                    url: item.querySelector('div.r_f > a').href,
                })
            })
            return results;
        }) 
        let articles = readJson();
        Results.forEach((element => {
            articles.push(element);
        }))
        writeJson(articles);
        await browser.close();
        
    }
    catch(error){
        console.log(error);
    }

};

const getArxiv = async () => {
    try{
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
        });
        const page = await browser.newPage();
        await page.goto("https://arxiv.org/search/?query=languages&searchtype=all&source=header", {waitUntil: "domcontentloaded", timeout: 0});
        const Results = await page.evaluate(() => {

            const items = document.querySelectorAll("ol.breathe-horizontal > li");
            const results = [];
            items.forEach((item) => {
                results.push({
                    title: item.querySelector('p.title').innerText,
                    url: item.querySelector('p.list-title > span > a').href,
                })
            })
            return results;
        }) 
        let articles = readJson();
        Results.forEach((element => {
            articles.push(element);
        }))
        writeJson(articles);
        await browser.close();
        
    }
    catch(error){
        console.log(error);
    }

};

const getDLC = async () => {
    try{
        //launch the chrome 
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
        });
        
        // open a new page in chrome
        const page = await browser.newPage();
        await page.goto("https://dlc.dlib.indiana.edu/dlc/search?scope=%2F&query=languages&rpp=10&sort_by=0&order=DESC&submit=Go", {waitUntil: "domcontentloaded", timeout: 0});
        const Results = await page.evaluate(() => {

            const items = document.querySelectorAll("ul.ds-artifact-list > li");
            const results = [];
            items.forEach((item) => {

                results.push({
                    title: item.querySelector('div.artifact-title > a').innerText,
                    url: item.querySelector('div.artifact-title > a').href,
                })
            })
            return results;
        })         

        let articles = readJson();
        Results.forEach((element => {
            articles.push(element);
        }))
        writeJson(articles);
        await browser.close();
    }
    catch(error){
        console.log(error);
    }

};

const getEconbiz = async () => {
    try{
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
        });
        const page = await browser.newPage();
        await page.goto("https://www.econbiz.de/Search/Results?lookfor=languages&type=AllFields", {waitUntil: "domcontentloaded", timeout: 0});
        const Results = await page.evaluate(() => {

            const items = document.querySelectorAll("form.form-inline > span > div > span");
            const results = [];

            items.forEach((item) => {
                results.push(
                    {
                        title: item.querySelector('div.result-content > div > a').innerText,
                        url: item.querySelector('div.result-content > div > a').href, 
                    }
                )
            })
            return results;
        }) 
        let articles = readJson();
        Results.forEach((element => {
            articles.push(element);
        }))
        writeJson(articles);
        await browser.close();
        
    }
    catch(error){
        console.log(error);
    }

};

const makeConsulte = async (req, res) => {
    try{
        // getScielo()
        // getBioMedCentral()
        // getOsti()
        // getCore()
        // getEric()
        // getArxiv()
        // getDLC()
        // getEconbiz()
    }
    catch(error){
        res.error(error);
    }
    
    return res.status(200);
}

const searchWeb = async (req, res) => {
    try{
        let articles = readJson();
        return articles;
    }
    catch(e){
        const error = e;
    }    
}
module.exports = {searchWeb, makeConsulte};
