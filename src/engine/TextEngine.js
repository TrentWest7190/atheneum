function parseParagraph (paragraphObj) {
  let preparedParagraph = rawParagraphToPreparedParagraph(paragraphObj)
  let returnParagraph = preparedParagraphToArray(preparedParagraph)
  return returnParagraph
}

function rawParagraphToPreparedParagraph (raw) {
  return raw
}

function preparedParagraphToArray (paragraph) {
  let returnArray = []
  let styleRegex = /(\*.+?\*|\/.+?\/)|\w+?|\s+?/g
  let results
  let nonstyledCollector = ''

  /* eslint-disable no-cond-assign */
  while (results = styleRegex.exec(paragraph)) {
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

export default parseParagraph
