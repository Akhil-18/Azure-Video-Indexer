const app = require('express')();
var swaggerUi = require('swagger-ui-express'); // swagger
swaggerDocument = require('./swagger.json');


// swagger document
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes
var video = require('./api/videos');
app.use('/api/v1/video',video);


// starting the app
app.listen(3000, function () {
    console.log('app started and listening on port 3000');
});