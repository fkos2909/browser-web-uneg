const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const pathJson = path.join(__dirname, '../data.json');

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
    {0:'https://search.scielo.org/?lang=es&count=15&from=1&output=site&sort=&format=summary&fb=&page=1&q='},
    {1:'https://www.biomedcentral.com/search?query=&searchType=publisherSearch'}, 
    {2:'https://www.osti.gov/search/semantic:'}, 
    {3:'https://core.ac.uk/search?q=&page=1'}, 
    {4:'https://eric.ed.gov/?q='},
    {5:'https://arxiv.org/search/?query=&searchtype=all&source=header'},
    {6:'https://dlc.dlib.indiana.edu/dlc/search?scope=%2F&query=&rpp=10&sort_by=0&order=DESC&submit=Go'},
    {7:'https://www.econbiz.de/Search/Results?lookfor=&type=AllFields&limit=10&sort=relevance'}
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
$('.article') 
    .map((_, item) => { 
        const url = 'https://www.osti.gov';
        const $item = $(item); 
        const href = $item.find('a.fulltext-link').attr('href') === undefined ? $item.find('a.doi-link').attr('href') : url.concat('', $item.find('a.fulltext-link').attr('href'));
        return {  
            id: $item.find('a[data-ostiid]').attr('data-ostiid'), 
            title: $item.find('h2.title').find('a').text(), 
            url: href, 
        }; 
    }) 
    .toArray(); 

const extractContentCore = ($) => 
$('.styles-container-2Sli1') 
    .map((_, item) => {
        const $item = $(item); 
        return {  
            id: $item.attr('id'), 
            title: $item.find('h3.styles-title-1k6Ib').find('a').text(), 
            url: $item.find('h3.styles-title-1k6Ib').find('a').attr('href'), 
        }; 
    }) 
    .toArray(); 

const extractContentEric = ($) => 
$('.r_i') 
    .map((_, item) => {
        const $item = $(item); 
        return {  
            id: $item.attr('id'), 
            title: $item.find('.r_t').find('a').text(), 
            url: $item.find('.r_f').find('a').attr('href'), 
        }; 
    }) 
    .toArray(); 

const extractContentArxiv = ($) => 
$('.arxiv-result') 
    .map((_, item) => {
        const $item = $(item); 
        return {  
            id: $item.find('.list-title').find('a').text(), 
            title: $item.find('.title').text().replace('\n      \n        ', '').replace('\n      \n    ', ''), 
            url: $item.find('.list-title').find('span').find('a').attr('href'), 
        }; 
    }) 
    .toArray(); 

const extractContentDlc = ($) => 
$('.artifact-title') 
    .map((_, item) => {
        const url = 'https://www.econbiz.de/';
        const $item = $(item); 
        return {  
            id: $item.find('a').attr('href'), 
            title: $item.find('a').text(), 
            url: url.concat('', $item.find('a').attr('href')), 
        }; 
    }) 
    .toArray(); 

const extractContentEconbiz = ($) => 
$('.result') 
    .map((_, item) => {
        const url = 'https://www.econbiz.de';
        const $item = $(item); 
        return {  
            id: $item.attr('id'), 
            title: $item.find('.result-content').find('a.title').text().replace('\n                              ', '').replace('\n        ', ''), 
            url: url.concat('', $item.find('.result-content').find('a.title').attr('href')), 
        }; 
    }) 
    .toArray(); 

const getData = async (url) => {
    const { data } = await axios.get(url); 
    return cheerio.load(data); 
}

const crawl = async (url_base, num, line) => { 
    try{
        const search = line.split(' ').join("+");
        const url = new URL(url_base);
        switch(num){
            case 0:
                try{
                    url.searchParams.set("q", search);
                    const contentScielo = extractContentScielo(await getData(url.href.replace('%2B', '+')));
                    saveJson(contentScielo);
                }catch(e){
                    console.log(e);
                }
                break;
            case 1:
                try{    
                    url.searchParams.set("query", search);
                    const contentBioMed = extractContentBioMed(await getData(url.href.replace('%2B', '+')));
                    saveJson(contentBioMed);
                }catch(e){
                    console.log(e);
                }               
                break;
            case 2:
                try{
                    const contentOsti = extractContentOsti(await getData(url.href.concat('', line.split(' ').join("%20"))));
                    saveJson(contentOsti);
                }catch(e){
                    console.log(e);
                }
                break;
            case 3:
                try{
                    url.searchParams.set("q", search);
                    const contentCore = extractContentCore(await getData(url.href.replace('%2B', '+')));
                    saveJson(contentCore);
                }catch(e){
                    console.log(e);
                }
                console.log('contentCore');
                break;
            case 4:
                try{
                    url.searchParams.set("q", search);
                    const contentEric = extractContentEric(await getData(url.href.replace('%2B', '+')));
                    saveJson(contentEric);
                }catch(e){
                    console.log(e);
                }
                break;
            case 5:
                try{
                    url.searchParams.set("query", search);
                    const contentArxiv = extractContentArxiv(await getData(url.href.replace('%2B', '+')));
                    saveJson(contentArxiv);
                }catch(e){
                    console.log(e);
                }
                break;
            case 6:
                try{
                    url.searchParams.set("query", search);
                    const contentDlc = extractContentDlc(await getData(url.href.replace('%2B', '+')));
                    saveJson(contentDlc);
                }catch(e){
                    console.log(e);
                }
                break;
            case 7:
                try{
                    url.searchParams.set("lookfor", search);
                    const contentEconbiz = extractContentEconbiz(await getData(url.href.replace('%2B', '+')));
                    saveJson(contentEconbiz);
                }catch(e){
                    console.log(e);
                }
                break;
            default:
                console.log('default');
                break;
        }
    }catch(e){
        console.log(e);
    }
}; 

const crawlTask = async (req, res) => {
	for (let i=0; i<domains.length; i++) {
        
		await crawl(domains[i][i], i, req.body.line);
	} 
    return res;
}; 

const crawlTaskResults = async (req, res) => {
    let articles = readJson();
    writeJson([]);
    return articles;
}

module.exports = {crawlTask, crawlTaskResults};
