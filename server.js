const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://Group30:<password>@cop4331-g30-large.knq6z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(url);
client.connect();

// login endpoint