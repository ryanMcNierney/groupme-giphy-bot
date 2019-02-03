const { getGif, postGif } = require('./utils')

const checkMessage = async (message) => {
  const messageText = message.text
  const giphyRegex = /^\/giphy /

  // Check if the GroupMe message has content and if the regex pattern is true
  if (messageText && giphyRegex.test(messageText)) {
    const gifUrl = await getGif(messageText) // get a gif

    // if there is a gifUrl post it
    if (gifUrl) {
      postGif(gifUrl)
    }

  }
}

module.exports = checkMessage
