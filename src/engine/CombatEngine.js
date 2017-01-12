import Player from './Player'
import { randomNumberBetween } from './StoryUtilities'
import cloneDeep from 'lodash.clonedeep'

function startCombat (npc, combatData) {
  Player.inCombat = true
  Player.currentEnemy = cloneDeep(npc)
  Player.CurrentLocation = createCombatScene(Player.currentEnemy, combatData)
}

function createCombatScene (npc, combatData) {
  const paragraphs = npc.mainText
  const buttons = createCombatButtons(npc, combatData, combatData.defaultButtons)
  return {
    paragraphs,
    buttons
  }
}

function createCombatButtons (npc, combatData, buttons) {
  return buttons.map(button => {
    let newButton = {}
    if (button.children) {
      newButton.children = createCombatButtons(npc, combatData, button.children)
    }
    if (button.events) {
      newButton.events = () => {
        Player.additionalParagraphs = []
        button.events()
        Player.buttonOverride = []
        enemyTurn(npc, combatData)
      }
    }
    newButton.text = button.text
    return newButton
  })
}

function enemyTurn (npc, combatData) {
  if (npc.winState()) {
    Player.additionalParagraphs = Player.additionalParagraphs.concat(npc.win.text)
    Player.CurrentLocation.buttons = npc.win.buttons
  } else {
    const enemyAttacks = Object.keys(npc.attacks)
    const selectedAttack = enemyAttacks[randomNumberBetween(0, enemyAttacks.length)]
    npc.attacks[selectedAttack]()
  }
  if (combatData.loseState()) {
    Player.additionalParagraphs = Player.additionalParagraphs.concat(npc.lose.text)
    Player.CurrentLocation.buttons = npc.lose.buttons
  }
}

export default startCombat
