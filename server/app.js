const express = require('express')
const app = express()
const http = require('http').createServer(app)
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const database = require('./configs/database.config')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const fs = require('fs')
const path = require('path');
const serveStatic = require('serve-static');
const rateLimit = require('express-rate-limit')
require('dotenv').config({path: './.env'})

global.__basedir = __dirname

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit : '50mb' }));
app.use(bodyParser.json({ limit : '50mb' }))
app.use(session({
    secret: process.env.SESSION_SECRET_TOKEN,
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 , secure : false },
    resave: false,
    store: MongoStore.create({
        mongoUrl: process.env.PROD_MONGODB
    })
}))

// app.use(helmet({
    // crossOriginEmbedderPolicy: false,
    // contentSecurityPolicy: {
    //     directives: {
    //       defaultSrc: ["'self'", 'google.com', 'youtube.com'],
    //       styleSrc: ["'self'", 'google.com', 'youtube.com', "'unsafe-inline'"],
    //       scriptSrc: ["'self'", 'google.com', 'youtube.com', "'unsafe-inline'"],
    //       imgSrc: ["'self'", 'google.com', 'youtube.com', 'data:', 'blob:', 'instagram.com'],
    //       connectSrc: ["'self'", 'google.com', 'youtube.com', 'ws:', 'wss:'],
    //       frameSrc: ["'self'", 'google.com', 'youtube.com'],
    //       frameAncestors: ["'self'", 'google.com', 'youtube.com'],
    //       mediaSrc: ["'self'", 'google.com', 'youtube.com', 'data:', 'blob:'],
    //     },
    // }
// }))

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))

database.connect()

app.use(require('./middlewares/guard.middleware'))
app.use(serveStatic("../client/dist"));
app.get('*(?!(api|rss|sitemap)\w+)', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
app.use("/public", express.static(path.join(__dirname, 'public')));
fs.readdir('./routes/', (err, files) => {
    files.forEach(file => {
        app.use(`/api/${file.split('.')[0]}`,require(`./routes/${file}`))
    })
})
http.listen(process.env.APP_PORT, () => {
    console.log(`Server running on port : ${process.env.APP_PORT}`);
})