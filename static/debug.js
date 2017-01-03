const textData = {
  paragraph_1: {
    textContent (playerState) {
      return `this just a test ${this.replacements.chunkert(playerState)}`
    },

    replacements: {
      chunkert (playerState) {
        return 'hoo hoo'
      }
    }
  }
}

const screenData = {
  screen_1: {
    paragraphs: ['paragraph_1']
  },

  screen_2: {
    paragraphs: ['paragraph_2']
  }
}

const config = {
  startScreenId: 'screen_1'
}

exports.textData = textData

exports.screenData = screenData

exports.config = config