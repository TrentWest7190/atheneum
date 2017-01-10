function getFinalParagraphArray (inputArray, storyText, additionalParagraphs, paragraphOverride) {
  const paragraphs = paragraphOverride.length > 0 ? paragraphOverride.concat(additionalParagraphs) : inputArray.concat(additionalParagraphs)
  return paragraphs.map(paragraphObj => {
    if (typeof paragraphObj.condition !== 'undefined') {
      const conditionResult = paragraphObj.condition()
      const conditionType = typeof conditionResult
      if (conditionType === 'string') {
        if (typeof storyText[conditionResult] !== 'undefined') {
          return preparedParagraphToArray(storyText[conditionResult])
        } else {
          return preparedParagraphToArray({textContent () { return conditionResult }})
        }
      } else if (conditionType === 'object') {
        return preparedParagraphToArray(conditionResult)
      } else if (conditionType === 'boolean') {
        return conditionResult ? preparedParagraphToArray(storyText[paragraphObj.name]) : undefined
      }
    } else if (typeof paragraphObj === 'object') {
      return preparedParagraphToArray(paragraphObj)
    } else if (typeof paragraphObj === 'string') {
      if (typeof storyText[paragraphObj] !== 'undefined') {
        return preparedParagraphToArray(storyText[paragraphObj])
      } else {
        return preparedParagraphToArray({textContent () { return paragraphObj }})
      }
    }
  }, this).filter(paragraph => typeof paragraph !== 'undefined')
}

function preparedParagraphToArray (paragraph) {
  let returnArray = []
  let styleRegex = /(\*.+?\*|\/.+?\/)|\w+?|\W+?/g
  let results
  let nonstyledCollector = ''

  /* eslint-disable no-cond-assign */
  while (results = styleRegex.exec(paragraph.textContent())) {
    if (typeof results[1] === 'undefined') {
      nonstyledCollector += results[0]
    } else {
      returnArray.push({content: nonstyledCollector, style: 'none'})
      nonstyledCollector = ''
      returnArray.push({content: results[1].substring(1, results[1].length - 1), style: results[1][0] === '*' ? 'bold' : 'italic'})
    }
  }
  if (returnArray.length === 0) {
    returnArray.push({content: nonstyledCollector, style: 'none'})
  }
  return returnArray
}

export default getFinalParagraphArray
