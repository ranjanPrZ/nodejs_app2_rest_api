const express = require('express')
const app = express()
const path = require('path')

// Binding express urlencoded with express
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// binding path for views directory
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const comments = [
        { id: 1, username: 'Todd', comment: 'lol that is so funny!' },
        { id: 2, username: 'Skyler', comment: 'I like to go birdwatching with my dog' },
        { id: 3, username: 'Sk8erBoi', comment: 'Please delete your account, Todd' },
        { id: 4, username: 'Onlysayswoof', comment: 'woof woof woof!' }
      ]

// List all the comments
app.get('/comments', (req, res) => {
  res.render('comments/index', {comments})
})

// Add new comment
app.get('/comments/new', (req, res) => {
  res.render('comments/new')
})

app.post('/comments', (req, res) => {
  const {username, comment} = req.body;
  comments.push({username, comment})
  res.redirect('/comments')
})

// Get comment details
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  console.log(req.params.id)
  const comment = comments.find(c => c.id === parseInt(id))
  res.render('comments/show', {comment})
})

// Running express server on port 3000
app.listen(3000, ()=>{
  console.log('Listening to port 3000!')
})