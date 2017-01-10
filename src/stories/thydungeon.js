import Player from '../engine/Player'

/* eslint-disable no-unused-vars */
let Flags = Player.State.flags
let Inventory = Player.State.inventory
let Stats = Player.State.stats

const screenData = {
  dungeon: {
    paragraphs: [
      'Ye find yeself in yon dungeon. Ye see a SCROLL. Behind ye scroll is a FLASK. Obvious exits are NORTH, SOUTH and DENNIS.'
    ],

    buttons: [
      {
        text: 'Look',
        children: [
          {
            text: 'Scroll',
            events () {
              if (Flags.scrollThere) {
                Player.paragraphOverride = [`Parchment, definitely parchment. I'd recognize it anywhere.`]
              } else {
                Player.paragraphOverride = [`Ye seeth nothing wheretofore it went ZAP.`]
              }
            }
          },
          {
            text: 'Flask',
            events () {
              Player.paragraphOverride = [`Looks like you could quaff some serious mead out of that thing`]
            }
          }
        ]
      },
      {
        text: 'Get',
        children: [
          {
            text: 'Scroll',
            events () {
              if (Flags.scrollThere) {
                Player.paragraphOverride = [`Ye takes the scroll and reads of it. It doth say: BEWARE, READER OF THE SCROLL, DANGER AWAITS TO THE- The SCROLL disappears in thy hands with ye olde ZAP!`]
                Flags.scrollThere = false
              } else {
                Player.paragraphOverride = [`Ye doth suffer from memory loss. YE SCROLL is no more. Honestly`]
              }
            },
            condition () {
              return Flags.scrollThere
            }
          },
          {
            text: 'Flask',
            events () {
              if (Flags.flaskAttempts < 2) {
                Player.paragraphOverride = [`Ye cannot get the FLASK. It is firmly bolted to a wall which is bolted to the rest of the dungeon which is probably bolted to a castle. Never you mind.`]
                Flags.flaskAttempts += 1
              } else {
                Player.paragraphOverride = [`Okay, okay. You unbolt yon FLASK and hold it aloft. A great shaking begins. The dungeon ceiling collapses down on you, crushing you in twain. Apparently, this was a load-bearing FLASK. Play again?`]
                Player.buttonOverride = loseButtons
              }
            }
          }
        ]
      },
      {
        text: 'Go',
        children: [
          {
            text: 'North',
            events () {
              Player.CurrentLocation = 'north'
            }
          },
          {
            text: 'South',
            events () {
              Player.CurrentLocation = 'south'
            }
          },
          {
            text: 'Dennis',
            events () {
              Player.CurrentLocation = 'dennis'
            }
          }
        ]
      }
    ]
  },

  north: {
    paragraphs: [
      `You go NORTH through yon corridor. You arrive at parapets. Ye see a ROPE. Obvious exists are SOUTH`
    ],

    buttons: [
      {
        text: 'Look',
        children: [
          {
            text: 'Parapets',
            events () {
              Player.paragraphOverride = [`Well, they're parapets. This much we know for sure.`]
            }
          },
          {
            text: 'Rope',
            events () {
              Player.paragraphOverride = [`It looks okay. You've seen better`]
            }
          }
        ]
      },
      {
        text: 'Get',
        children: [
          {
            text: 'Rope',
            events () {
              Player.paragraphOverride = [`You attempt to take ye ROPE but alas it is enchanted! It glows a mustard red and smells like a public privy. The ROPE wraps round your neck and hangs you from parapets. With your last breath, you wonder what parapets are. GAME OVER. Play again?`]
              Player.buttonOverride = loseButtons
            }
          }
        ]
      },
      {
        text: 'Go',
        children: [
          {
            text: 'South',
            events () {
              Player.CurrentLocation = 'dungeon'
            }
          }
        ]
      }
    ]
  }
}

const textData = {}

const flagData = {
  scrollThere: true,
  flaskAttempts: 0
}

const itemData = {}

const statData = {}

const config = {
  startScreenId: 'dungeon'
}

const reset = () => {
  Player.paragraphOverride = []
  Player.buttonOverride = []
  Player.Setup(flagData, itemData, statData, config.startScreenId)
}

const loseButtons = [
  {
    text: 'Yes',
    events () {
      reset()
    }
  },
  {
    text: 'No',
    events () {
      Player.additionalParagraphs.push(`Then close thy tab, yon dorke`)
    }
  }
]

reset()

exports.screenData = screenData

exports.textData = textData

exports.flagData = flagData

exports.config = config
