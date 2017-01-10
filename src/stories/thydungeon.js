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
  },

  south: {
    paragraphs: [
      {
        textContent () {
          return `You head south to an enbankment. Or maybe a chasm. You can't decide which. ${this.replacements.hasTrinket()}Obvious exits are NORTH.`
        },

        replacements: {
          hasTrinket () {
            if (!Flags.hasTrinket) {
              return 'Anyway, ye spies a TRINKET. '
            }
            return ''
          }
        }
      }
    ],

    buttons: [
      {
        text: 'Look',
        events () {
          if (!Flags.hasTrinket) {
            Player.paragraphOverride = [`Ye stand yeself close to a yet-unnamed escarpment. Nonetheless, ye spies a TRINKET. Obvious exits are NORTH.`]
          } else if (Flags.hasTrinket && !Flags.getTrinketTwice) {
            Player.paragraphOverride = [`Ye stand high above a canyon-like depression. Obvious exits are NORTH.`]
          } else {
            Player.paragraphOverride = [`Thou hangeth out at an overlook. Obvious exits are NORTH. I shouldn't have to tell ye there is no TRINKET.`]
          }
        },
        children: [
          {
            text: 'Trinket',
            events () {
              if (!Flags.hasTrinket) {
                Player.paragraphOverride = [`Quit looking! Just get it already.`]
              } else {
                Player.paragraphOverride = [`Just a bulge in thou pouchel at thist point`]
              }
            }
          }
        ]
      },
      {
        text: 'Get',
        children: [
          {
            text: 'Trinket',
            events () {
              if (!Flags.hasTrinket) {
                Player.paragraphOverride = [`Ye getsts yon TRINKET and discover it to be a bauble. You rejoice at your good fortune. You shove the TRINKET in your pouchel. It kinda hurts.`]
                Flags.hasTrinket = true
              } else {
                Player.paragraphOverride = [`Sigh. The trinket is in thou pouchel. Recallest thou?`]
                Flags.getTrinketTwice = true
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
              Player.CurrentLocation = 'dungeon'
            }
          }
        ]
      }
    ]
  },

  dennis: {
    paragraphs: [
      `Ye arrive at Dennis. He wears a sporty frock coat and a long jimberjam. He paces about nervously. Obvious exits are NOT DENNIS.`
    ],

    buttons: [
      {
        text: 'Talk',
        events () {
          Player.paragraphOverride = [`You engage Dennis in leisurely discussion. Ye learns that his jimberjam was purchased on sale at a discount market and that he enjoys pacing about nervously. You become bored and begin thinking about parapets.`]
        }
      },
      {
        text: 'Look',
        children: [
          {
            text: 'Dennis',
            events () {
              Player.paragraphOverride = [`That jimberjam really makes the outfit.`]
            }
          },
          {
            text: 'Jimberjam',
            events () {
              Player.paragraphOverride = [`Man, that art a nice jimberjam.`]
            }
          }
        ]
      },
      {
        text: 'Give',
        children: [
          {
            text: 'Trinket',
            events () {
              if (Flags.hasTrinket) {
                Player.paragraphOverride = [`A novel idea! You givst the TRINKET to Dennis and he happily agrees to tell you what parapets are. With this new knowledge, ye escapes from yon dungeon in order to search for new dungeons and to remain... THY DUNGEONMAN!! You hath won! Congraturation!!`,
                  `Play again?`]
                Player.buttonOverride = loseButtons
              } else {
                Player.paragraphOverride = [`Thou don'tst have a trinket to give. Go back to your tiny life.`]
              }
            }
          }
        ]
      },
      {
        text: 'Go',
        children: [
          {
            text: 'Not Dennis',
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
  flaskAttempts: 0,
  hasTrinket: false,
  getTrinketTwice: false
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
