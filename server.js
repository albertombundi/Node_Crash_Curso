const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const package = require('./package.json');

const port = process.env.port || process.env.PORT || 5000;
const apiRoot = '/api';

const app = express();
//configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: /http:\/\/localhost/ }));
//app.options('*', cors());


//configure routes
const router = express.Router();
router.get('/', (req, res) => {
   res.send(`${package.description} - v${package.version}`);
});

// Register all routes
app.use(apiRoot, router);

app.listen(port, () => {
    console.log('Server up!!');
});
