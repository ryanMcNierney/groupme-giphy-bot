const rp = require('request-promise')

// takes in messageText
// calls giphy random api
// return a gif url
const getGif = (messageText) => {
  try {
    return new Promise((resolve, reject) => {
      const tag = messageText.slice(7)

      // call giphy api
      const options = {
        uri: 'https://api.giphy.com/v1/gifs/random',
        qs: {
          api_key: process.env.GIPHY_KEY,
          tag,
          rating: 'pg-13'
        },
        json: true
      }

      rp(options)
        .then(res => {
          const gifUrl = res.data.image_url
          if (gifUrl) {
            resolve(gifUrl)
          }
        })
        .catch(err => {
          reject(err)
          console.log('error in request-promise call', err)
        })

    })

  } catch (err) {
    console.log('error getting gif', err)
  }

}

// post gif to groupme
const postGif = (gifUrl) => {
  try {
    return new Promise((resolve, reject) => {

      const options = {
        method: 'POST',
        uri: 'https://api.groupme.com/v3/bots/post',
        qs: {
          bot_id: process.env.GROUPME_BOT_ID,
          text: gifUrl
        }
      }

      rp(options)
        .then(() => {
          console.log('POST succedded')
          resolve()
        })
        .catch(err => {
          console.log('POST unsuccessful')
          reject(err)
        })

    })
  } catch (err) {
    console.log('error posting gif', err)
  }
}

module.exports = { getGif, postGif }
