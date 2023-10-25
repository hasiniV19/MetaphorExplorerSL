const express = require("express");
const router = express.Router();
const client = require("../elasticsearch/client");
const csvtojson = require('csvtojson');

// settings of index
const indexSettings = {
  "analysis": {
    "analyzer": {
      "default": {
        "type": "standard"
      },
      "sinhala_analyzer": {
        "type": "custom",
        "tokenizer": "standard",
        "filter": ["synonym_sinhala", "stop_words"],
        "char_filter": ["dotFilter", "comma_delimited_filter"]
      },
      "betterFuzzy": {
        "type": "custom",
        "tokenizer": "standard",
        "filter": ["lowercase", "edgeNgram"]
      },
      "analyzer_with_synonym": {
        "filter": ["synonym_sinhala"],
        "tokenizer": "standard"
      }
    },
    "filter": {
      "edgeNgram": {
        "type": "edge_ngram",
        "min_gram": 2,
        "max_gram": 50,
        "side": "front"
      },
      "synonym_sinhala": {
        "type": "synonym",
        "synonyms": [
          "ගඟුල, ගඟ, නදී",
          "තඹර, පියුම්",
          "සඳ මඬල, පුර සඳ",
          "මව, අම්මා",
          "සයුර, මුහුද",
          "පෙම, ආදරය",
          "නුඹ කුස, අහස",
          "ගීතය, ගීය",
          "ඔබ, ඔයා, නුඹ",
          "පියවුරු, පූර්ණ පයෝ ධර",
          "ඉර, හිරු",
          "දෙනෙතෙ, ඇස්",
        ]
      },
      "stop_words": {
        "type": "stop",
        "stopwords": [
          "සමයි",
          "සම වේ",
          "සමා නයි ",
          "ලෙසට",
          "සමවෙයි",
          "නමති",
          "පරදයි",
          "වූ",
          "සම වූ",
          "ගත්කරු",
          "වා  ගේ",
          "රචකයා",
          "ලියන්නා",
          "ලියන",
          "ගැන",
          "රචිත",
          "ලියපු",
          "කව",
          "ලියව්ව",
          "රචනා",
          "රචක",
          "ලියන්",
          "ලිවූ",
          "කියවෙන",
          "ලියූ",
          "කියූ",
          "ලියවුණු",
          "වර්ගයේම",
          "කියව්ව",
          "කියපු",
          "කියවපු",
          "කළ",
          "වර්ගය",
          "වර්ගයේ",
          "වැනි",
          "නම් වූ",
          "නැමැති",
          "නැමති",
          "නමැති",
          "කවි",
          "කාව්‍ය",
          "කාව",
          "රූපක",
          "පිළිබඳ",
          "පිළිබඳව",
        ]
      }
    },
    "char_filter": {
      "dotFilter": {
        "type": "mapping",
        "mappings": ["\\u002E => \\u0020"]
      },
      "comma_delimited_filter": {
        "type": "pattern_replace",
        "pattern": ",",
        "replacement": " "
      }
    }
  }
};

// mappings of properties of data
const mappings = {
  "properties": {
    "ID": {
      "type": "keyword"
    },
    "Poem Book": {
      "type": "text",
      "analyzer": "sinhala_analyzer",
      "fields": {
        "keyword": {
          "type": "keyword"
        }
      }
    },
    "Year": {
      "type": "text",
      "analyzer": "sinhala_analyzer",
      "fields": {
        "keyword": {
          "type": "keyword"
        }
      }
    },
    "Poet": {
      "type": "text",
      "analyzer": "sinhala_analyzer",
      "fields": {
        "keyword": {
          "type": "keyword"
        }
      }
    },
    "Poem Name": {
      "type": "text",
      "analyzer": "sinhala_analyzer",
      "fields": {
        "keyword": {
          "type": "keyword"
        }
      }
    },
    "Poem Number": {
      "type": "integer"
    },
    "Line": {
      "type": "text",
      "analyzer": "sinhala_analyzer"
    },
    "Metaphor present": {
      "type": "text"
    },
    "Count of the metaphors": {
      "type": "integer"
    },
    "Metaphorical terms": {
      "type": "text",
      "analyzer": "sinhala_analyzer",
      "fields": {
        "keyword": {
          "type": "keyword"
        }
      }
    },
    "Meaning": {
      "type": "text",
      "analyzer": "sinhala_analyzer",
      "fields": {
        "keyword": {
          "type": "keyword"
        }
      }
    },
    "Source": {
      "type": "text",
      "analyzer": "sinhala_analyzer",
      "fields": {
        "keyword": {
          "type": "keyword"
        }
      }
    },
    "Target": {
      "type": "text",
      "analyzer": "sinhala_analyzer",
      "fields": {
        "keyword": {
          "type": "keyword"
        }
      }
    },
  }
};

// Create an index with the custom analyzer and mappings
async function createIndex() {
  await client.indices.create({
    "index": "poems",
    "body": {
      "settings": indexSettings,
      "mappings": mappings
    }
  });
}

router.get("/poems", async function (req, res) {
  console.log("App loading...");
  res.json("App running...");

  indexData = async () => {
    try {
      console.log("Getting data from csv file...");

      const records = await csvtojson().fromFile(__dirname + '/../../corpus/poems.csv');

      console.log(records);

      console.log("Data loaded successfully!");

      console.log(
        "Creating the Elasticsearch index with mappings and custom analyzers"
      );
      await createIndex();

      console.log("Indexing data...");

      for (const record of records) {
        await client.index({
          "index": "poems",
          "body": record
        });
      }

      console.log("Data has been indexed successfully!");
    } catch (err) {
      console.log(err);
    }
  };
  indexData();
});

module.exports = router;
