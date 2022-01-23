// Establish connection to database through the use of dotenv (using .config instead of .load or .parse) - Phase 3
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

// Initialize Frameworks - Phase 1
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts') // npm i express ejs express-ejs-layouts
const bodyParser = require('body-parser')

// Import router - Phase 2
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

// Set view engine - Phase 1
app.set('view engine', 'ejs') // setup to use ejs as view engine
app.set('views', __dirname + '/views') // set directory
app.set('layout', 'layouts/layout' ) // this is underneath views directory
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

// Database setup - Phase 3
const mongoose = require('mongoose') // import from npm i mongoose
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

// Informs user if connected to database or not - Phase 3
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Mongoose database'))

// Use router - Phase 2
app.use('/', indexRouter) // call on router in router/index.js
app.use('/authors', authorRouter)


// Listen - Phase 1
app.listen(process.env.PORT || 3000, () => {
	console.log(`Listening on port ${process.env.PORT || 3000}`)
})