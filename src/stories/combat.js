import Player from '../engine/Player'
import { randomNumberBetween } from '../engine/StoryUtilities'

let Stats = Player.State.stats

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
    _value: 10,
    get value () {
      return this._value
    },
    set value (val) {
      this._value = val
    }
  },
  health: {
    _value: 1,
    get value () {
      return this._value
    },
    set value (val) {
      this._value = val
    }
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
    win: {
      text: [
        `You stand over the defeated gnome and take his beans`
      ],
      events (playerState) {
        playerState.inventory.beans += 5
      }
    },
    lose: {
      text: [
        `The gnome has bested you, he takes some beans`
      ],
      events (playerState) {
        playerState.inventory.beans -= 3
      }
    }
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
          }
        }
      ]
    }
  ],

  loseState () {
    return Stats.health.value <= 0
  }
}

const itemData = {
  beans: {
    text: 'some nice beans'
  }
}

Player.Setup({}, itemData, statData, config.startScreenId)

exports.screenData = screenData

exports.textData = {}

exports.statData = statData

exports.itemData = itemData

exports.npcData = npcData

exports.combatData = combatData

exports.config = config
