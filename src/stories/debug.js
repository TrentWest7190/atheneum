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
  },

  button_tree: {
    paragraphs: [
      'all button types'
    ],
    buttons: [
      {
        name: 'button_17',
        condition () {
          return true
        }
      },
      {
        text: 'boolean true fullobj',
        condition () {
          return true
        }
      },
      {
        condition () {
          return 'button_18'
        }
      },
      {
        condition () {
          return { text: 'return object' }
        }
      },
      {
        text: 'raw button'
      },
      'button_19',
      {
        text: 'look',
        children: [
          {
            text: 'dont show',
            condition () {
              return false
            }
          }
        ]
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
  },

  input_box: {
    paragraphs: [
      'tell me your favorite color'
    ],

    input: {
      callback (input) {
        Flags.favColor = input
        Player.CurrentLocation = 'input_box_2'
      }
    }
  },

  input_box_2: {
    paragraphs: [
      {
        textContent () {
          return `your favorite color is ${Flags.favColor}`
        }
      }
    ],

    buttons: [
      {
        text: 'go back',
        events () {
          Player.CurrentLocation = 'input_box'
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
    text: 'A funny horn',
    categories: ['usable']
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
  startScreenId: 'input_box'
}

Player.Setup(flagData, itemData, statData, config.startScreenId)

exports.textData = textData

exports.buttonData = buttonData

exports.screenData = screenData

exports.flagData = flagData

exports.itemData = itemData

exports.statData = statData

exports.config = config
