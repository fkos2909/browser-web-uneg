const express = require("express");
const cors = require("cors");

const {crawlTask} = require('./crawl');

const app = express();
app.use(express.json());
app.use(cors());


app.get('/', async (req, res) => {
    return res.status(200).json('Response');
});

app.post("/api/search", async (req, res) => {
    const results = await crawlTask(req, res);
    return res.status(200).json(results);
});

app.listen(3001);