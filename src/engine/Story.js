let Story = {
  loadStory (storyName) {
    Object.assign(this, require('../../static/' + storyName + '.js'))
    this.loadedScreen = this.screenData[this.config.startScreenId]
    return this
  },

  loadScreen (screenId) {
    this.loadedScreen = this.screenData[screenId]
    console.log(this.loadedScreen)
  },

  loadedScreen: {}
}

export default Story
