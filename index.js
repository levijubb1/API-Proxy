// * Nodemon in the package.json runs node but with live reload

const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()
const PORT = process.env.PORT || 5001

// Setting app
const app = express()

// Rate limiting
const limit = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  // ^ each user can make only 5 requests every 10 minutes
})
app.use(limit)

app.get('/', (req, res) => {
  res.json('hello')
})

app.get('/getData', (req, res) => {
	res.json('hello');
});

app.set('tust proxy', 1) // Need this to allow X-Forwarded-* header fields to be trusted.

// Routes
app.use('/weather', require('./routes/openWeatherMap'))


app.use(cors)
app.listen(PORT, () => {console.log(`Server running on port: ${PORT}`)})
