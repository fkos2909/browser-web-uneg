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

module.exports = {readJson, writeJson, saveJson};