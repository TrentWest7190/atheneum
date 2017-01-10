const getFinalButtonArray = function (inputArray, storyButtons, player) {
  let finalButtons = player.buttonOverride.length > 0 ? player.buttonOverride : inputArray
  finalButtons = checkConditions(finalButtons, storyButtons)
  return finalButtons
}

const checkConditions = function (inputArray, storyButtons) {
  let returnButtons = inputArray.map(button => {
    let returnButton
    if (button.condition) {
      const conditionResult = button.condition()
      const conditionType = typeof conditionResult
      if (conditionType === 'boolean') {
        if (conditionResult && button.name) {
          returnButton = storyButtons[button.name]
        } else if (conditionResult) {
          returnButton = button
        }
      } else if (conditionType === 'string') {
        returnButton = storyButtons[conditionResult]
      } else if (conditionType === 'object') {
        returnButton = conditionResult
      }
    } else if (typeof button === 'object') {
      returnButton = button
    } else if (typeof button === 'string') {
      returnButton = storyButtons[button]
    }

    if (typeof returnButton !== 'undefined' && returnButton.children) {
      returnButton.children = checkConditions(returnButton.children)
      if (returnButton.children.length === 0) {
        returnButton = undefined
      }
    }
    return returnButton
  }).filter(button => typeof button !== 'undefined')

  if (inputArray._parent) {
    Object.defineProperty(returnButtons, '_parent', { value: inputArray._parent })
  }
  return returnButtons
}

export default getFinalButtonArray
