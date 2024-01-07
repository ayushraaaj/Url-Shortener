const express = require('express');
const port = 8001;
const path = require('path');
const cookieParser = require('cookie-parser');

const {connectMongoDB} = require('./connection');
const {
    restrictToLoggedInUserOnly,
    checkAuth
} = require('./middlewares/auth');

const url_Route = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const user_Route = require('./routes/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

connectMongoDB('mongodb://127.0.0.1:27017/url-shortner')
.then(() => {
    console.log('Connected to MongoDB');
});

app.use(express.urlencoded());
app.use(cookieParser());

app.use('/url', restrictToLoggedInUserOnly, url_Route);
app.use('/', checkAuth, staticRoute);
app.use('/user', user_Route);


app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
});