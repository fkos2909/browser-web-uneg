const express = require("express");
const cors = require("cors");

const {crawlTask, crawlTaskResults} = require('./cheerio');

const app = express();
app.use(express.json());
app.use(cors());


app.get('/', async (req, res) => {
    return res.status(200).json({response: 'response'});
});

app.post("/api/search", async (req, res) => {
    await crawlTask(req, res);
    return res.status(200).json({response: 'success'});
});

app.get('/api/results', async (req, res) => {
    const results = await crawlTaskResults(req, res);
    return res.status(200).json(results);
});

app.listen(3001);