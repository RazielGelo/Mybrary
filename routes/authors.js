// Import frameworks
const express = require('express')
const Author = require('../models/author')
// Setup router variable
const router = express.Router()


/* Routes */

// Display authors index page
router.get('/', async (req, res) => {
	try {
		const authors = await Author.find({})
		res.render('authors/index', {authors: authors})
	} catch {
		res.redirect('/')
	}
	 
})

// Display  authors new page 
router.get('/new', (req, res) => {
	res.render('authors/new', { author: new Author() }) 
})

// Create author route
router.post('/', async (req, res) => {
	const author = new Author({
		name: req.body.name
	})
	try {
		const newAuthor = await author.save()
		// res.redirect(`authors/${newAuthor.id}`)
		res.redirect('authors')
	} catch {
		res.render('authors/new', {
			author: author,
			errorMessage: "Error creating Author"
		})
	}
})

// Export router - this is needed for server.js to use this
module.exports = router