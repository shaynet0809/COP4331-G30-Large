const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const urlMain = 'mongodb+srv://Group30:<password>@cop4331-g30-large.knq6z.mongodb.net/mainDB?retryWrites=true&w=majority';

const client = new MongoClient(urlMain);
client.connect();

// login endpoint
app.post('/api/login', async (req, res, next) => {
    var error = '';

    const { login, password } = req.body;

    const db = client.db();
    const results = await db.collection('users').find({Login:login,Password:password}).toArray();

    var id = -1;
    var fn = '';
    var ln = '';

    if( results.length > 0 )
    {
        id = results[0].UserId;
        fn = results[0].FirstName;
        ln = results[0].LastName;
    }

    var ret = { id:id, firstName:fn, lastName:ln, error:''};
    res.status(200).json(ret);
});

// register endpoint
app.post('/api/register', async (req, res, next) => {
    const { first, last, username, phone, email, password } = req.body;

    const newUser = {FirstName: first, LastName: last, Username: username, Phone: phone, Email: email, Password: password};
    var error = '';

    try
    {
        const db = client.db();
        const result = db.collection('users').insertOne(newUser);
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = { error: error };
    res.status(200).json(ret);
});
