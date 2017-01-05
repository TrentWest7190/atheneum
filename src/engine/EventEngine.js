import Player from './Player'

let EventEngine = {}

EventEngine.loadScreen = function (screenName) {
  Player.Functions.movePlayer(screenName)
}

EventEngine.setFlag = function (target) {
  let newValue = operations[target.operation](Player.State.flags[target.flagName], target.flagValue)
  Player.Functions.setFlag(target.flagName, newValue)
}

EventEngine.getItem = function (target) {
  Player.Functions.getItem(target.itemName, Player.State.inventory[target.itemName] + target.amount)
}

EventEngine.setStat = function (target) {
  Player.Functions.setStat(target.statName, target.statValue)
}

EventEngine.appendText = function (paragraphId) {
  Player.additionalParagraphs.push(paragraphId)
}

EventEngine.delegateEvents = function (eventArray) {
  eventArray.forEach(event => {
    if (typeof event.condition === 'undefined' || event.condition()) {
      EventEngine[event.name](event.target)
    }
  }, this)
}

const operations = {
  plus: (value, op) => value + op,
  minus: (value, op) => value - op,
  toggle: (value) => !value,
  set: (value, op) => op
}

export default EventEngine
