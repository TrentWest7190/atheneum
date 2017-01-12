import Player from '../engine/Player'
import CombatEngine from '../engine/CombatEngine'
import { randomNumberBetween } from '../engine/StoryUtilities'

let Stats = Player.State.stats
let Inventory = Player.State.inventory

const screenData = {
  pre_fight: {
    paragraphs: [
      `press the button and fight a thing`
    ],

    buttons: [
      {
        text: 'gnome',
        events () {
          console.log(npcData.gnome.stats)
          CombatEngine(npcData.gnome, combatData)
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
  startScreenId: 'pre_fight',
  storyName: 'Combat Debug'
}

const combatFormulas = {
  punch (punchitude) {
    return randomNumberBetween(punchitude / 2, punchitude * 2)
  }
}

const npcData = {
  gnome: {
    stats: {
      health: 100
    },
    mainText: [
      {
        textContent () {
          return `You're fighting a gnome. He looks pretty pissed and has fists full of gravel. ${this.replacements.gnomeState.call(Player.currentEnemy)}`
        },
        replacements: {
          gnomeState () {
            if (this.stats.health >= 80) {
              return `The gnome seems to be in perfect health.`
            } else if (this.stats.health >= 50) {
              return `The gnome seems slightly injured.`
            } else if (this.stats.health >= 20) {
              return `The gnome is hurtin.`
            } else {
              return `The gnome won't be gnomin' much longer.`
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
        `The gnome crumples to the ground. You stand over the defeated gnome.`
      ],
      buttons: [
        {
          text: 'Take his beans',
          events () {
            Inventory.beans += 5
            Player.CurrentLocation = 'pre_fight'
            Player.currentEnemy = {}
          }
        }
      ]
    },
    lose: {
      text: [
        `The gnome has bested you, he takes some beans.`
      ],
      buttons: [
        {
          text: 'Next',
          events () {
            Inventory.beans -= 3
            Player.CurrentLocation = 'pre_fight'
            Player.currentEnemy = {}
          }
        }
      ]
    },
    winState () {
      return this.stats.health <= 0
    }
  }
}

const combatData = {
  defaultButtons: [
    {
      text: 'Attack',
      children: [
        {
          text: 'Punch',
          events () {
            const damage = combatFormulas.punch(Stats.punchitude.value)
            Player.currentEnemy.stats.health -= damage
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
