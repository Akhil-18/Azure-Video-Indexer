var request = require('request');
const router = require("express").Router();
const querystring = require('querystring');
const secrets = require('./secrets');
const bodyParser = require('body-parser');  // body parser
var jsonParser = bodyParser.json();
var urlEncodedParser = bodyParser.urlencoded({ extended: false });


// env variables
// secrets
const location = secrets.location;
const accountId = secrets.accountId;
const baseUrl = "https://api.videoindexer.ai";
let key = secrets.Primarykey;


router.get('/', function (req, res) {

    token = req.headers['authorization'];
    console.log(req.headers['authorization']);
    console.log('in get call');
    // console.log(this.accessToken);
    const query = querystring.stringify({
        "pageSize": 25,
        "skip": 0,
        "subscription-key": key,
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
        "subscription-key": key,
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
        "subscription-key": secrets.Key
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