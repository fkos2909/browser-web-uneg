const axios = require("axios");
const cheerio = require("cheerio");
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

const saveJson = (data) => {
    let articles = readJson();
    data.forEach((element => {
        articles.push(element);
    }))
    writeJson(articles);
}

const domains = [
    // {1:'https://search.scielo.org/?lang=es&count=15&from=1&output=site&sort=&format=summary&fb=&page=1&q=lenguajes'},
    {1:'https://www.biomedcentral.com/search?query=&searchType=publisherSearch'}, 
    // 'https://www.osti.gov/search/semantic:', 
    // 'https://core.ac.uk/search?q=&page=1', 
    // 'https://eric.ed.gov/?q=',
    // 'https://arxiv.org/search/?query=&searchtype=all&source=header',
    // 'https://dlc.dlib.indiana.edu/dlc/search?scope=%2F&query=&rpp=10&sort_by=0&order=DESC&submit=Go',
    // 'https://www.econbiz.de/Search/Results?lookfor=&type=AllFields'
]

const extractContentScielo = ($) => 
    $('.item') 
		.map((_, item) => { 
			const $item = $(item); 
			return {  
				id: $item.attr('id'), 
				title: $item.find('strong.title').text(), 
				url: $item.find('a[target]').attr('href'), 
			}; 
		}) 
		.toArray(); 

const extractContentBioMed = ($) => 
$('.c-listing__item') 
    .map((_, item) => { 
        const $item = $(item); 
        return {  
            id: $item.find('a[data-test="pdf-link"]').attr('data-track-label'), 
            title: $item.find('a[data-test="title-link"]').text(), 
            url: $item.find('a[data-test="pdf-link"]').attr('href'), 
        }; 
    }) 
    .toArray(); 

const extractContentOsti = ($) => 
$('ol.item-list') 
    .map((_, item) => { 
        const $item = $(item); 
        return {  
            id: $item.find('a[data-ostiid]').attr('data-ostiid'), 
            title: $item.find('h2.title').find('a').text(), 
            url: $item.find('a.fulltext-link').attr('href'), 
        }; //$item.find('a.fulltext-link') !== null ? $item.find('a.fulltext-link').attr('href') : $item.find('a.doi-link').attr('href')
    }) 
    .toArray(); 

const getData = async (url) => {
    const { data } = await axios.get(url); 
    return cheerio.load(data); 
}

const crawl = async (url_base, num, line) => { 
    const search = line.split(' ').join("+");
    const url = new URL(url_base);

    switch(num){
        case 2:
            url.searchParams.set("query", search);
            const contentScielo = extractContentScielo(await getData(url.href.replace('%2B', '+')));
            saveJson(contentScielo);
            break;
        case 1:
            url.searchParams.set("query", search);
            const contentBioMed = extractContentBioMed(await getData(url.href.replace('%2B', '+')));
            saveJson(contentBioMed);
            break;
        case 3:
            // const contentOsti = extractContentOsti($);
            // saveJson(contentOsti);
            break;
        default:
            console-log('default');
            break;
    }
    
}; 

const crawlTask = async (req, res) => {
	for (let i=0; i<domains.length; i++) {
		await crawl(domains[i][i+1], i+1, req.body.line); 
        // console.log(req.body.line);
	} 
    return res;
}; 

const crawlTaskResults = async (req, res) => {
    let articles = readJson();
    return articles;
}

module.exports = {crawlTask, crawlTaskResults};
