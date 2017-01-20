/* eslint-disable no-unused-vars */
const textData = {
  paragraph_1 () {
    return `The first test string.`
  },
  paragraph_2 () {
    return this.Player.Flags.testFlag ? 'the flag is true' : 'the flag is false'
  },
  paragraph_3 () {
    return `funt`
  },
  paragraph_4 () {
    return `the horn room`
  },
  paragraph_5 () {
    return `dodooooooot`
  },
  paragraph_6 () {
    return `a input box go here eventually`
  },
  paragraph_7 () {
    return `${this.Player.Flags.favColor}`
  }
}

const buttonData = {
  button_1: {
    text: 'go forward',
    events () {
      this.loadLocation(screenData.screen_2)
    }
  },

  button_2: {
    text: 'go back',
    events () {
      this.loadLocation(screenData.screen_1)
    }
  },

  button_3: {
    text: 'activate flag',
    events () {
      this.Player.Flags.testFlag = true
    }
  },

  button_4: {
    text: 'show up'
  },

  button_5: {
    text: 'counter is equal',
    events () {}
  },

  button_6: {
    text: 'counter is less',
    events () {}
  },

  button_7: {
    text: 'counter is greater',
    events () {}
  },

  button_8: {
    text: '3rd screen',
    events () {
      this.loadLocation(screenData.screen_3)
    }
  },

  button_9: {
    text: 'increase counter by 1',
    events () {
      this.Player.Flags.testCounter += 1
    }
  },

  button_10: {
    text: 'decrease counter by 1',
    events () {
      this.Player.Flags.testCounter -= 1
    }
  },

  button_11: {
    text: 'pick up horn',
    events () {
      this.Player.Inventory.horn += 1
    }
  },

  button_12: {
    text: 'play horn',
    events () {
      this.AdditionalText.push(textData.paragraph_5)
    }
  },

  button_13: {
    text: 'drop horn',
    events () {
      this.Player.Inventory.horn = 0
    }
  },

  button_16: {
    text: 'bash horn',
    events () {
      this.Player.Inventory.horn -= 1
      this.AdditionalText.push('You pound out the horn into a fine mist')
    }
  },

  button_17: {
    text: 'boolean true'
  },

  button_18: {
    text: 'return string'
  },

  button_19: {
    text: 'raw string'
  }
}

const screenData = {
  screen_1: {
    text: [
      textData.paragraph_1
    ],
    buttons: [
      buttonData.button_1,
      buttonData.button_3
    ]
  },

  screen_2: {
    text: [textData.paragraph_2],
    buttons () {
      return [
        buttonData.button_2,
        this.Player.Flags.testFlag ? buttonData.button_4 : null,
        buttonData.button_8
      ]
    }
  },

  screen_3: {
    text () {
      let returnArray = []
      if (this.Player.Flags.testCounter > 8 && this.Player.Flags.testCounter < 12) {
        returnArray.push(textData.paragraph_3)
      }
      return returnArray
    },
    buttons () {
      let returnArray = []
      if (this.Player.Flags.testCounter === 10) {
        returnArray.push(buttonData.button_5)
      }
      if (this.Player.Flags.testCounter < 10) {
        returnArray.push(buttonData.button_6)
      }
      if (this.Player.Flags.testCounter > 10) {
        returnArray.push(buttonData.button_7)
      }
      returnArray.push(buttonData.button_9)
      returnArray.push(buttonData.button_10)
      return returnArray
    }
  },

  screen_4: {
    text: [
      textData.paragraph_4
    ],
    buttons () {
      let returnArray = []
      returnArray.push(buttonData.button_11)
      if (this.Player.Inventory.horn > 0) {
        returnArray.push(buttonData.button_12)
        returnArray.push(buttonData.button_13)
        returnArray.push(buttonData.button_16)
      }
      return returnArray
    }
  },

  button_tree: {
    text: [
      'all button types'
    ],
    buttons: [
      'button_19',
      {
        text: 'look',
        events () {
          return [
            {
              text: 'dont show',
              events () {
              }
            }
          ]
        }
      },
      {
        text: 'dubfdf',
        children: [
          {
            text: 'hey',
            children: [
              {
                text: 'hi'
              },
              {
                text: 'nonoshow',
                children: [
                  {
                    text: 'noshow',
                    condition () {
                      return false
                    }
                  }
                ]
              }
            ]
          },
          {
            text: 'ddd',
            children: [
              {
                condition () {
                  return false
                }
              }
            ]
          }
        ]
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
    text: 'A funny horn',
    amount: 0
  }
}

const statData = {
  testStat: {
    _value: 0,
    get value () {
      if (this.Player.Flags.testFlag) {
        return this._value + 100
      }
      return this._value
    },
    set value (newValue) {
      if (this.Player.Flags.testFlag) {
        this._value + newValue + 10
      } else {
        this._value + newValue
      }
    }
  }
}

const config = {
  storyName: 'debug',
  startScreen: screenData.screen_4,
  flagData,
  itemData
}

module.exports = config
