import Player from '../engine/Player'

/* eslint-disable no-unused-vars */
let Flags = Player.State.flags
let Inventory = Player.State.inventory
let Stats = Player.State.stats

const textData = {
  paragraph_1: {
    textContent () {
      return `The first test string.`
    }
  },

  paragraph_2: {
    textContent () {
      return `${this.replacements.isTestFlagTrue()}`
    },
    replacements: {
      isTestFlagTrue () {
        return Flags.testFlag ? 'the flag is true' : 'the flag is false'
      }
    }
  },

  paragraph_3: {
    textContent () {
      return `funt`
    }
  },

  paragraph_4: {
    textContent () {
      return `the horn room`
    }
  },

  paragraph_5: {
    textContent () {
      return `dodooooooot`
    }
  },

  paragraph_6: {
    textContent () {
      return `a input box go here eventually`
    }
  },

  paragraph_7: {
    textContent () {
      return `${Flags.favColor}`
    }
  }
}

const buttonData = {
  button_1: {
    text: 'go forward',
    events () {
      Player.CurrentLocation = 'screen_2'
    }
  },

  button_2: {
    text: 'go back',
    events () {
      Player.CurrentLocation = 'screen_1'
    }
  },

  button_3: {
    text: 'activate flag',
    events () {
      Flags.testFlag = true
    }
  },

  button_4: {
    text: 'show up'
  },

  button_5: {
    text: 'counter is equal'
  },

  button_6: {
    text: 'counter is less'
  },

  button_7: {
    text: 'counter is greater'
  },

  button_8: {
    text: '3rd screen',
    events () {
      Player.CurrentLocation = 'screen_3'
    }
  },

  button_9: {
    text: 'increase counter by 1',
    events () {
      Flags.testCounter += 1
    }
  },

  button_10: {
    text: 'decrease counter by 1',
    events () {
      Flags.testCounter -= 1
    }
  },

  button_11: {
    text: 'pick up horn',
    events () {
      Inventory.horn += 1
    }
  },

  button_12: {
    text: 'play horn',
    events () {
      Player.additionalParagraphs.push('paragraph_5')
    }
  },

  button_13: {
    text: 'drop horn',
    events () {
      Inventory.horn = 0
    }
  },

  button_16: {
    text: 'bash horn',
    events () {
      Inventory.horn -= 1
      Player.additionalParagraphs.push('You pound out the horn into a fine mist')
    }
  }
}

const screenData = {
  screen_1: {
    paragraphs: [
      'paragraph_1'
    ],
    buttons: [
      'button_1',
      'button_3'
    ]
  },

  screen_2: {
    paragraphs: ['paragraph_2'],
    buttons: [
      'button_2',
      {
        name: 'button_4',
        condition () {
          return Flags.testFlag
        }
      },
      'button_8'
    ]
  },

  screen_3: {
    paragraphs: [
      {
        name: 'paragraph_3',
        condition () {
          return Flags.testCounter > 8 && Flags.testCounter < 12
        }
      }
    ],
    buttons: [
      {
        name: 'button_5',
        condition () {
          return Flags.testCounter === 10
        }
      },
      'button_9',
      'button_10'
    ]
  },

  screen_4: {
    paragraphs: [
      'paragraph_4'
    ],
    buttons: [
      'button_11',
      {
        name: 'button_12',
        condition () {
          return Inventory.horn > 0
        }
      },
      {
        name: 'button_13',
        condition () {
          return Inventory.horn > 0
        }
      },
      {
        name: 'button_16',
        condition () {
          return Inventory.horn > 0
        }
      }
    ]
  }
}

const flagData = {
  testFlag: false,
  testString: 'grunk',
  testCounter: 10
}

const itemData = {
  horn: {
    text: 'A funny horn'
  }
}

const statData = {
  testStat: {
    _value: 0,
    get value () {
      if (Flags.testFlag) {
        return this._value + 100
      }
      return this._value
    },
    set value (newValue) {
      if (Flags.testFlag) {
        this._value + newValue + 10
      } else {
        this._value + newValue
      }
    }
  }
}

const config = {
  startScreenId: 'screen_1'
}

Player.Setup(flagData, itemData, statData, config.startScreenId)

exports.textData = textData

exports.buttonData = buttonData

exports.screenData = screenData

exports.flagData = flagData

exports.itemData = itemData

exports.statData = statData

exports.config = config
