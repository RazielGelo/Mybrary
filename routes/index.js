// Import frameworks
const express = require('express')
// Setup router variable
const router = express.Router()

/* Routes */

// Get 
router.get('/', (req, res) => {
	res.render('index') // this points to views index.ejs
})

// Export router - this is needed for server.js to use this
module.exports = router