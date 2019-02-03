const express = require('express')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 3000
require('dotenv').config()
const lt = require('localtunnel')

const checkMessage = require('./lib/checkMessage')

app.use(morgan('dev')); //logging middleware
app.use(express.urlencoded({ extended: true })); //body parsing
app.use(express.json()); //body parsing

app.get('/', (req, res, next) => {
  res.send('App is listening to quests').status(200)
})

app.post('/', (req, res, next) => {
  try {
    const message = req.body // get the incoming message
    if (message) {
      checkMessage(message)
    }

  } catch (err) {
    console.log('error =', err)
  }
})

app.listen(`${port}`, () => {
  console.log(`listening on port ${port}`)

  // Check if the `--dev` flag was passed
  const devMode = process.argv[2] === '--dev'

  if (devMode) {
    // set up localtunnel
    const opt = {
      subdomain: process.env.LT_SUBDOMAIN
    }
    const localTunnel = lt(port, opt, (err, tunnel) => {
      if (err) {
        console.log('Error setting up local tunnel')
      } else {
        console.log(`local tunnel running on ${tunnel.url}`)
      }

      localTunnel.on('close', () => {
        console.log('local tunnel closed')
      })

    })

  }

})
