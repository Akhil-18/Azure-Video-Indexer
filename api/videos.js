var request = require('request');
const router = require("express").Router();
const querystring = require('querystring');
const bodyParser = require('body-parser');  // body parser
var jsonParser = bodyParser.json();
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
require('dotenv').config();

// env variables
// secrets
// const location = secrets.location;
// const accountId = secrets.accountId;
// let Primarykey = secrets.Primarykey;
// let key = secrets.key;


const location = process.env.LOCATION;
const accountId = process.env.ACCOUNT_ID;
let Primarykey = process.env.PRIMARY_KEY;
let key = process.env.KEY;


// base url
const baseUrl = "https://api.videoindexer.ai";

router.get('/', function (req, res) {

    token = req.headers['authorization'];
    console.log(req.headers['authorization']);
    console.log('in get call');
    // console.log(this.accessToken);
    const query = querystring.stringify({
        "pageSize": 25,
        "skip": 0,
        "subscription-key": Primarykey,
        "accessToken": token
    });

    let url = `${baseUrl}/` + location + `/Accounts/` + accountId + `/Videos?${query}`;

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body) // Print the google web page.
            let body_ = JSON.parse(body);
            // console.log(body_);
            res.send(body_);
        }
        else {
            // console.log('err');
            // console.log(response);
            res.send(error);
        }
    })

})

router.get('/index/:id', function (req, res) {
    console.log(req.params.id);
    let videoId = req.params.id;
    token = req.headers['authorization'];
    console.log(req.headers['authorization']);
    console.log('in get call');
    // console.log(this.accessToken);
    const query = querystring.stringify({
        "reTranslate": false,
        "subscription-key": Primarykey,
        "accessToken": token
    });

    let url = `${baseUrl}/` + location + `/Accounts/` + accountId + `/Videos/` + videoId + `/Index?${query}`;
    console.log(url);
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body) // Print the google web page.
            let body_ = JSON.parse(body);
            // console.log(body_);
            res.send(body_);
        }
        else {
            // console.log('err');
            // console.log(response);
            res.send(error);
        }
    })

})

router.get('/access-token', function (req, res) {

    const query = querystring.stringify({
        "allowEdit": true,
        "subscription-key": key
    });

    let token_url = `${baseUrl}/Auth/` + location + `/Accounts/` + accountId + `/AccessToken?${query}`;
    // console.log(token_url);

    request(token_url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(JSON.parse(body));
        }
        else {
            console.log('err');
            console.log(response);
            res.send(error);
        }
    })
})

module.exports = router;