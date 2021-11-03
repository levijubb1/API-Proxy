const express = require('express')
const router = express.Router()
const needle = require('needle')
const url = require('url')

// * env vars
const OWMurl = process.env.OWM_BASE_URL
const name = process.env.OWM_KEY_NAME
const value = process.env.OWM_KEY_VALUE

router.get('/', async (req, res) => {
  try {
    const params = new URLSearchParams({
      [name]: value,
      ...url.parse(req.url, true).query // Spreading any query params into the call (very scalable)
    })

    // Making actual req
    const weatherRes = await needle('get', `${OWMurl}?${params}`)
    const data = weatherRes.body

    // Logging req if in developer mode
    if (process.env.NODE_ENV !== 'production') {
      console.log(`REQUEST: ${OWMurl}?${params}`);
      
    }

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router