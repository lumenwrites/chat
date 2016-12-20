/* Set path to frontend files */
const path = require('path');
const frontendFilesPath = path.join(__dirname, '../frontend');

/* Create express app */
var express = require('express');
var app = express();

/* Configure middleware to serve frontend files */
app.use(express.static(frontendFilesPath));




/* Set port for heroku. Use 3000 by default. */
const port = process.env.PORT || 3000;
/* Start server */
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
