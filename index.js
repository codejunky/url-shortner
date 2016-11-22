var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://fcc:Password1!@ds161487.mlab.com:61487/url-shortner');

app.get('/', (req, res) => {
    res.json({
      message: "Hello world"
    });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App running on port ${process.env.PORT || 3000}`)
});
