var express = require('express');
var app = express();
var path = require('path');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(3000, () => console.log(`Server is listening on port 3000`));
