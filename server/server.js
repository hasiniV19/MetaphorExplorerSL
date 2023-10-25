const { Client } = require('@elastic/elasticsearch');
const client = require('./elasticsearch/client');
const express = require('express');
const cors = require('cors');

const app = express();

const data = require('./data_management/retrieve_and_ingest_data');

app.use('/ingest_data', data);

app.use(cors());

app.get('/results', (req, res) => {
  const searchValue = req.query.searchValue;

  async function sendESRequest() {
    const body = await client.search({
      index: 'poems',
      body: {
        "query": {
            "bool": {
              "must": [
                {
                  "multi_match": {
                    "query": searchValue,
                    "fields": ["Poem Book^3", "Year", "Poet", "Poem Name^3", "Line^2", "Metaphor present", "Metaphorical terms^3", "Meaning^2", "Source^2", "Target^2"],
                    "type": "best_fields",
                    "operator": "or",
                    "analyzer": "sinhala_analyzer"
                  }
                }
              ],
              "should": [
                {
                  "multi_match": {
                    "query": searchValue,
                    "fields": ["Poem Book^3", "Year", "Poet", "Poem Name^3", "Line^2", "Metaphor present", "Metaphorical terms^3", "Meaning^2", "Source^2", "Target^2"],
                    "type": "best_fields",
                    "operator": "or",
                    "analyzer": "sinhala_analyzer"
                  }
                }
              ],
                "should": [
                    { "match": { "Poem Book": searchValue }},
                    { "match": { "Year": searchValue }},
                    { "match": { "Poet": searchValue }},
                    { "match": { "Poem Name": searchValue }},
                    { "match": { "Line": searchValue }},
                    { "match": { "Metaphor present": searchValue }},
                    { "match": { "Metaphorical terms": searchValue }},
                    { "match": { "Meaning": searchValue }},
                    { "match": { "Source": searchValue }},
                    { "match": { "Target": searchValue }}
                ],
                "minimum_should_match": 1
            }
          }
      },
    });
    res.json(body.hits.hits);
  }
  sendESRequest();
});

app.get('/resultsByFields', (req, res) => {
    const source = req.query.source;
    const target = req.query.target;
    const poem = req.query.poem;

    async function sendESRequest() {
        const body = await client.search({
            index: 'poems',
            body: {
                "query": {
                    "bool": {
                        // "must": [
                        //     { "match": { "Source": source }},
                        //     { "match": { "Target": target }},
                        //     { "match": { "Line": poem }}
                        // ],
                        "should": [
                            { "match": { "Source": source}},
                            { "match": { "Target": target}},
                            { "match": { "Line": poem}}
                        ],
                        "minimum_should_match": 1
                    }
                  }
            },
        });
        res.json(body.hits.hits);
    }
    sendESRequest();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.group(`Server started on ${PORT}`));