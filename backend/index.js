const express = require("express");
const cors = require("cors");

const {searchWeb, makeConsulte} = require('./pupperter');
const {crawlTask, crawlTaskResults} = require('./cheerio');

// New hostname+path as specified by question:

const app = express();
// app.use(cors({
//     origin: function(origin, callback){
//         // allow requests with no origin 
//         // (like mobile apps or curl requests)
//         if(!origin) return callback(null, true);
//         if(allowedOrigins.indexOf(origin) === -1){
//             var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//             return callback(new Error(msg), false);
//         }
//         return callback(null, true);
//     }
// }));

app.use(express.json());
app.use(cors());


app.get('/', async (req, res) => {
    return res.status(200).json({response: 'response'});
});

app.get("/newSearch", async (req, res) => {
    await makeConsulte(req, res);
    return res.json({response: 'success'});
});

app.get("/newSearch/api", async (req, res) => {
    const results = await searchWeb(req, res);
    res.status(200).json(results);
    return res;
});

app.get("/api", async (req, res) => {
    await crawlTask(req, res);
    return res.json({response: 'success'});
});

app.get('/api/web', async (req, res) => {
    const results = await crawlTaskResults(req, res);
    return res.status(200).json(results);
});

app.listen(3001);