const express = require('express');
const connectToDb = require('./DBConnet');
const urlRoute = require('./routes/urlRouter');
const URL = require('./models/urlModel');
const app = express();
const port = 3000;

app.use(express.json());
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
