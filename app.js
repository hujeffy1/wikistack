const express = require('express');
const app = express();
const morgan = require ('morgan');
const { db,Page,User } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users');
// ...
app.use('/wiki', wikiRouter);
// or, in one line: app.use('/wiki', require('./routes/wiki'));

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', function(req, res, next) {
  res.redirect("/wiki");
})

async function danMachi() {
await db.sync({force: true});
}

danMachi()

const port = 3000;
app.listen(port, () => {
  console.log(`Listening in on http://localhost:${port}`);
});
