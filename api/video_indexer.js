const router = require("express").Router();
const bodyParser = require('body-parser');  // body parser
var jsonParser = bodyParser.json();
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
const querystring = require('querystring');
const fetch = require('node-fetch');

let https = require('https');

let location = "trial";
let accountId = "785bbbcf-cd54-41f8-842b-c5ce906c61e0";
let host = 'videoindexer.ai';
let path = "/" + location + "/Accounts/" + accountId + "/Videos";
let query = '?subscription-key=Primary-a13f3b183cfd487e8e491df78562dfd8&pageSize=25&skip=0&accessToken=eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50SWQiOiI3ODViYmJjZi1jZDU0LTQxZjgtODQyYi1jNWNlOTA2YzYxZTAiLCJBbGxvd0VkaXQiOiJUcnVlIiwiRXh0ZXJuYWxVc2VySWQiOiIzYTkzZTExNTI1NmNmZGY3IiwiVXNlclR5cGUiOiJNaWNyb3NvZnQiLCJJc3N1ZXJMb2NhdGlvbiI6IlRyaWFsIiwibmJmIjoxNTg4MDYzNTM0LCJleHAiOjE1ODgwNjc0MzQsImlzcyI6Imh0dHBzOi8vYXBpLnZpZGVvaW5kZXhlci5haS8iLCJhdWQiOiJodHRwczovL2FwaS52aWRlb2luZGV4ZXIuYWkvIn0.18BbI0yW6eOmdNQevIrdy5J6WaTRVJ2uGIYWgW2tUak';


let video_request = function () {
    let params = {
        method: 'GET',
        hostname: host,
        path: path + query
    }

    let req = https.request(params, response_handler);
    req.end();
}

let response_handler = function (response) {
    let body = '';
    response.on('data', function (d) {
        body += d;
    });

    response.on('end', function () {
        let body_ = JSON.parse(body);
        let body__ = JSON.stringify(body_, null, '  ');
        console.log(body__);
    });
    response.on('error', function (e) {
        console.log('Error: ' + e.message);
    });
};

// environment variables
const baseUrl = "https://api.videoindexer.ai";

router.get('/', function (req, res) {

    let location = "trial";
    let accountId = "785bbbcf-cd54-41f8-842b-c5ce906c61e0";
    let key = "Primary-a13f3b183cfd487e8e491df78562dfd8";
    let accessToken = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50SWQiOiI3ODViYmJjZi1jZDU0LTQxZjgtODQyYi1jNWNlOTA2YzYxZTAiLCJBbGxvd0VkaXQiOiJUcnVlIiwiRXh0ZXJuYWxVc2VySWQiOiIzYTkzZTExNTI1NmNmZGY3IiwiVXNlclR5cGUiOiJNaWNyb3NvZnQiLCJJc3N1ZXJMb2NhdGlvbiI6IlRyaWFsIiwibmJmIjoxNTg4MDU5Njg1LCJleHAiOjE1ODgwNjM1ODUsImlzcyI6Imh0dHBzOi8vYXBpLnZpZGVvaW5kZXhlci5haS8iLCJhdWQiOiJodHRwczovL2FwaS52aWRlb2luZGV4ZXIuYWkvIn0.CCJK-ep8crk_YgF6I1ndjRFqOsRKF8184_nh6OZsp30";
    const query = querystring.stringify({
        "pageSize": 25,
        "skip": 0,
        "subscription-key": key,
        "accessToken": accessToken
    });


    let p_url = `${baseUrl}/` + location + `/Accounts/` + accountId + `/Videos?subscription-key=Primary-a13f3b183cfd487e8e491df78562dfd8&pageSize=25&skip=0&accessToken=eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50SWQiOiI3ODViYmJjZi1jZDU0LTQxZjgtODQyYi1jNWNlOTA2YzYxZTAiLCJBbGxvd0VkaXQiOiJUcnVlIiwiRXh0ZXJuYWxVc2VySWQiOiIzYTkzZTExNTI1NmNmZGY3IiwiVXNlclR5cGUiOiJNaWNyb3NvZnQiLCJJc3N1ZXJMb2NhdGlvbiI6IlRyaWFsIiwibmJmIjoxNTg4MDk2NDY3LCJleHAiOjE1ODgxMDAzNjcsImlzcyI6Imh0dHBzOi8vYXBpLnZpZGVvaW5kZXhlci5haS8iLCJhdWQiOiJodHRwczovL2FwaS52aWRlb2luZGV4ZXIuYWkvIn0._JdQZ8ofMAFEajEMSN1QY0v6HbYmSFr5l-ynMMga4W4`;

    let url = `${baseUrl}/${location}/Accounts/${accountId}/Videos?` + query;
    console.log(url);

    // `${baseUrl}/${location}/Accounts/${accountId}/Videos?`


    fetch(p_url).then((response) => {


        let body = '';
    response.on('data', function (d) {
        body += d;
    });

    // response.on('end', function () {
    //     let body_ = JSON.parse(body);
    //     let body__ = JSON.stringify(body_, null, '  ');
    //     console.log(body__);
    //     res.send(body__);
    // });

        console.log(response.body);

        let jsonResponse = JSON.stringify(JSON.parse(response.body), null, '  ');
        let body_ = JSON.parse(response.body);
        console.log('json paresed');
        console.log(body_);
        // let body__ = JSON.stringify(body_, null, '  ');
        // console.log(body__);
        // res.send(body__);
        // // res.render('employee', { data: json });
    }).catch(err => {
        console.log(err);
    })
})



module.exports = router;