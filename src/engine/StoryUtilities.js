import Player from './Player'

export const returnToTopLevelButtons = function (parent) {
  if (parent) {
    if (parent._parent) {
      returnToTopLevelButtons(parent._parent)
    } else {
      Player.buttonOverride = parent
    }
  } else if (Player.buttonOverride._parent) {
    returnToTopLevelButtons(Player.buttonOverride._parent)
  }
}

export const randomNumberBetween = function (min, max) {
  return Math.floor(Math.random() * max) + min
}

export const reset = function (flagData = {}, itemData = {}, statData = {}, startScreenId) {
  Player.paragraphOverride = []
  Player.buttonOverride = []
  Player.Setup(flagData, itemData, statData, startScreenId)
}
