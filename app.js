const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(bodyParser.json({ extended: true, limit: '30mb' }));

const item = require('./routes/item');
const cart = require('./routes/cart');
const best = require('./routes/best');
app.use(item);
app.use(cart);
app.use(best);

app.listen(port, () => {
    console.log(`Item view recommendation system is now running on port ${port}`);
})