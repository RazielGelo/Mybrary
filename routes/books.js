// Import frameworks
const express = require('express')

// Imported from Models
const Book = require('../models/book')
const Author = require('../models/author')

// Use Multer (Used for file upload) - require to use "Path"
const path = require('path') // path framework
const fs = require('fs') // file system framework
const multer = require('multer') // multer framework
const uploadPath = path.join('public', Book.coverImageBasePath)
const imageMimeType = ['image/jpeg', 'image/png', 'image/gif'] // This is for the file types
const upload = multer({
	dest: uploadPath,
	fileFilter: (req, file, callback) => {
		callback(null, imageMimeType.includes(file.mimetype))
	}
})

// Setup router variable
const router = express.Router()


/* Routes */

// All Books Route
router.get('/', async (req, res) => {
	 res.send('All Books')
})

// New Book Route
router.get('/new', async (req, res) => {
	renderNewPage(res, new Book())
})

// Create Book route
router.post('/', upload.single('cover'), async (req, res) => {
	// variable for filename
	const fileName = req.file != null ? req.file.filename : null
	const book = new Book({
		title: req.body.title,
		author: req.body.author,
		publishDate: new Date(req.body.publishDate),
		pageCount: req.body.pageCount,
		coverImageName: fileName,
		description: req.body.description
	})

	try {
		const newBook = await book.save()
		// res.redirect(`books/${newBook.id}`)
		res.redirect(`books`)
	} catch (error) {
		if (book.coverImageName != null) {
			removeBookCover(book.coverImageName)
		}		
		renderNewPage(res, book, true)		
	}
})

// Reusable function to render new book page
async function renderNewPage(res, book, hasError = false) {
	try {
		const authors = await Author.find({})
		const params = {
			authors: authors,
			book: book
		}
		if (hasError) params.errorMessage = 'Error Creating Book'
		res.render('books/new', params)
	} catch (error) {
		res.redirect('/books')
	}
}

// Remove Book Cover - This is for the instance that book creation failed but book cover file has still been created. 
function removeBookCover(fileName) {
	fs.unlink(path.join(uploadPath, fileName), err => {
		if (err) console.error(err)
	})
}

// Export router - this is needed for server.js to use this
module.exports = router