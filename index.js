const express = require('express');
const path = require('path');
const connectToDb = require('./DBConnet');
const urlRoute = require('./routes/urlRouter');
const URL = require('./models/urlModel');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());

app.get('/test', async (req, res) => {
  const allUrls = await URL.find({});
  return res.render('home', { urls: allUrls });
});


app.use('/url', urlRoute);

connectToDb('mongodb://127.0.0.1:27017/sort-url').then(() => {
  console.log('bd connected ');
});

app.get('/:shortid', async (req, res) => {
  const shortId = req.params.shortid;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (!entry) {
    return res.status(404).json({ msg: 'URL not found' });
  }

  res.redirect(entry.redirectUrl);
});

// app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
