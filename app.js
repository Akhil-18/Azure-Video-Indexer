const app = require('express')();
var swaggerUi = require('swagger-ui-express'); // swagger
swaggerDocument = require('./swagger.json');


// var employeeApi = require('./apis/employee');
var routes = require('./api/video_indexer');

// swagger document
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var video = require('./api/videos');
app.use('/api/v1/video',video);

app.use('/video-indexer',routes);

let https = require('https');

let location = "trial";
let accountId = "785bbbcf-cd54-41f8-842b-c5ce906c61e0";
let host = 'api.videoindexer.ai';
let path = "/" + location + "/Accounts/" + accountId + "/Videos";
let query = '?subscription-key=Primary-a13f3b183cfd487e8e491df78562dfd8&pageSize=25&skip=0&accessToken=eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50SWQiOiI3ODViYmJjZi1jZDU0LTQxZjgtODQyYi1jNWNlOTA2YzYxZTAiLCJBbGxvd0VkaXQiOiJUcnVlIiwiRXh0ZXJuYWxVc2VySWQiOiIzYTkzZTExNTI1NmNmZGY3IiwiVXNlclR5cGUiOiJNaWNyb3NvZnQiLCJJc3N1ZXJMb2NhdGlvbiI6IlRyaWFsIiwibmJmIjoxNTg4MDk2NDY3LCJleHAiOjE1ODgxMDAzNjcsImlzcyI6Imh0dHBzOi8vYXBpLnZpZGVvaW5kZXhlci5haS8iLCJhdWQiOiJodHRwczovL2FwaS52aWRlb2luZGV4ZXIuYWkvIn0._JdQZ8ofMAFEajEMSN1QY0v6HbYmSFr5l-ynMMga4W4';

let video_request = function () {
    let params = {
        method: 'GET',
        hostname: host,
        path: path + query
    }

    let req = https.request(params, response_handler);
    req.end();
    return req;
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
        return  body__;
    });
    response.on('error', function (e) {
        console.log('Error: ' + e.message);
    });
};

app.get('/',function(req,res){
    video_request().then(data => {

    })
})
// starting the app
app.listen(3000, function () {
    console.log('app started and listening on port 3000');
});