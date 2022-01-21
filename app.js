const express = require('express');
const app = express();
const morgan = require ('morgan');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', function(req, res, next) {
  res.send('hello world');
})

const port = 3000;
app.listen(port, () => {
  console.log(`Listening in on http://localhost:${port}`);
});
