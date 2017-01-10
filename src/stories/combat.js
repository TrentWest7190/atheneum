import Player from '../engine/Player'
import { randomNumberBetween, returnToTopLevelButtons } from '../engine/StoryUtilities'

const Stats = Player.State.stats

const screenData = {
  pre_fight: {
    paragraphs: [
      `press the button and fight a thing`
    ],

    buttons: [
      {
        text: 'gnome',
        events () {
          Player.currentEnemy = npcData.gnome
        }
      }
    ]
  }
}

const statData = {
  punchitude: {
    value: 10
  },
  health: {
    value: 10000
  }
}

const config = {
  startScreenId: 'pre_fight'
}

const combatFormulas = {
  punch (punchitude) {
    return randomNumberBetween(punchitude / 2, punchitude * 2)
  }
}

const npcData = {
  gnome: {
    health: 100,
    mainText: [
      {
        textContent () {
          return `You're fighting a gnome. He looks pretty pissed and has fists full of gravel. ${this.replacements.gnomeState()}`
        },
        replacements: {
          gnomeState () {
            if (Player.currentEnemy.health >= 80) {
              return `The gnome seems to be in perfect health`
            } else if (Player.currentEnemy.health >= 50) {
              return `The gnome seems slightly injured`
            } else if (Player.currentEnemy.health >= 20) {
              return `The gnome is hurtin`
            } else {
              return `The gnome won't be gnomin' much longer`
            }
          }
        }
      }
    ],
    attacks: {
      throwRocks () {
        Stats.health.value -= 10
        Player.additionalParagraphs.push(`The gnome tosses a rock at you. You take 10 damage. Owies.`)
      }
    },
    winText: [
      {
        textContent () {
          return `You stand over the defeated gnome and steal some gems`
        }
      }
    ]
  }
}

const combatData = {
  buttons: [
    {
      text: 'Attack',
      children: [
        {
          text: 'Punch',
          events () {
            const damage = combatFormulas.punch(Stats.punchitude.value)
            Player.currentEnemy.health -= damage
            Player.additionalParagraphs.push(`You throw a mean right hook and do ${damage} damage.`)
            returnToTopLevelButtons()
          }
        }
      ]
    }
  ]
}

Player.Setup({}, {}, statData, config.startScreenId)

exports.screenData = screenData

exports.textData = {}

exports.statData = statData

exports.combatData = combatData

exports.config = config
