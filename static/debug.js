const statData = {
  testStat: {
    defaultValue: 0,
    onSet (value, PlayerState) {
      if (PlayerState.flags.testFlag) {
        return value + 100
      } else {
        return value
      }
    },
    onGet (value, PlayerState) {
      if (PlayerState.flags.testFlag) {
        return value * 2
      } else {
        return value
      }
    }
  }
}

const textData = {
  paragraph_1: {
    textContent (playerState) {
      return `this just a test ${this.replacements.chunkert(playerState)}
      ${this.replacements.statTest(playerState)}`
    },

    replacements: {
      chunkert (playerState) {
        return playerState.flags.testFlag ? 'hoo hoo' : 'haa haa'
      },

      statTest (playerState) {
        if (statData.testStat.onGet(playerState.stats.testStat, playerState) > 100) {
          return 'stat is over 100'
        } else {
          return 'stat is under 100'
        }
      }
    }
  },

  paragraph_2: {
    textContent () {
      return `the second text`
    }
  },

  paragraph_3: {
    textContent () {
      return `this shows up if testFlag is true`
    }
  },

  paragraph_4: {
    textContent (playerState) {
      return `${playerState.flags.testString}`
    }
  },

  paragraph_5: {
    textContent () {
      return `the horn room part deux`
    }
  }
}

const buttonData = {
  button_1: {
    text: 'test',
    events: [
      {
        name: 'loadScreen',
        target: 'screen_2'
      }
    ]
  },
  button_2: {
    text: 'set testFlag true',
    events: [
      {
        name: 'setFlag',
        target: {
          flagName: 'testFlag',
          operation: 'set',
          flagValue: true
        }
      }
    ]
  },
  button_2_plus: {
    text: 'plus',
    events: [
      {
        name: 'setFlag',
        target: {
          flagName: 'testNumber',
          operation: 'plus',
          flagValue: 1
        }
      }
    ]
  },
  button_2_minus: {
    text: 'minus',
    events: [
      {
        name: 'setFlag',
        target: {
          flagName: 'testNumber',
          operation: 'minus',
          flagValue: 1
        }
      }
    ]
  },
  button_2_toggle: {
    text: 'toggle',
    events: [
      {
        name: 'setFlag',
        target: {
          flagName: 'testFlag',
          operation: 'toggle'
        }
      }
    ]
  },
  button_3: {
    text: 'add a new paragraph',
    event: 'appendText',
    target: 'paragraph_2'
  },
  get_horn: {
    text: 'get a horn',
    events: [
      {
        name: 'getItem',
        target: {
          itemName: 'horn',
          amount: 1
        }
      }
    ]
  },
  addStat: {
    text: 'add stat',
    events: [
      {
        name: 'setStat',
        target: {
          statName: 'testState',
          operation: 'plus',
          statValue: 10
        }
      }
    ]
  }
}

const screenData = {
  screen_1: {
    paragraphs: [
      'paragraph_1',
      {
        name: 'paragraph_3',
        condition (playerState) {
          return playerState.flags.testFlag
        }
      },
      'paragraph_4'
    ],
    buttons: ['button_1', 'button_2', 'button_2_minus', 'button_2_plus', 'button_2_toggle', 'addStat']
  },

  screen_2: {
    paragraphs: ['paragraph_5'],
    buttons: ['get_horn']
  }
}

const flagData = {
  testFlag: false,
  testString: "grunk",
  testNumber: 100
}

const itemData = {
  horn: {
    text: 'A funny horn'
  }
}

const config = {
  startScreenId: 'screen_1'
}

exports.textData = textData

exports.buttonData = buttonData

exports.screenData = screenData

exports.flagData = flagData

exports.itemData = itemData

exports.statData = statData

exports.config = config