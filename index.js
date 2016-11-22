const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');

const Url = require('./models/Url');

const app = express();

mongoose.connect('mongodb://fcc:Password1!@ds161487.mlab.com:61487/url-shortner');

app.get('/new/:url(*)', (req, res) => {
  const url = req.params.url;
  const host = req.headers['host'];

  if (validator.isURL(url)) {
    const short = Math.random().toString(36).slice(-5);
    const newURL = new Url({original_url: url, short_url: short});

    newURL.save((err, u) => {
      return res.json({
        original_url: u.original_url,
        short_url: `${host}/${u.short_url}`
      });
    });
  } else {
    return res.json({error: "URL invalid"});
  }
});

app.get('/:short', (req, res) => {
  const short = req.params.short;

  Url.findOne({short_url: short}, (err, url) => {
    if (err || !url) {
      res.json({error: 'Short url not found or invalid'});
    } else {
      return res.redirect(url.original_url);
    }
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App running on port ${process.env.PORT || 3000}`)
});
