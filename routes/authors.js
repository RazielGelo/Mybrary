// Import frameworks
const express = require('express')
// Setup router variable
const router = express.Router()

/* Routes */

// Display authors index page
router.get('/', (req, res) => {
	res.render('authors/index') 
})

// Display  authors new page 
router.get('/new', (req, res) => {
	res.render('authors/new') 
})

// Create author route
router.post('/', (req, res) => {
	res.send('Create')
})

// Export router - this is needed for server.js to use this
module.exports = router