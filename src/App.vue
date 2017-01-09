<template>
  <div id="app-container" class="full-height row-flex">
    <div class="bordered-box full-height col-md-3">
      <debug-view class=" bordered-box full-height" :Story="Story" :Player="Player"></debug-view>
    </div>
    <div class="bordered-box col-flex full-height col-md-6">
      <text-view class="bordered-box col-md-8" :textArray="paragraphs"></text-view>
      <button-view class="bordered-box col-md-4" :buttonArray="buttons" @replaceButtons="replaceButtons"></button-view>
    </div>
    <div class="bordered-box full-height col-md-3">
      <inventory-view class="bordered-box full-height" :Story="Story" :Player="Player"></inventory-view>
    </div>
  </div>
</template>

<script>
import TextView from './components/TextView'
import ButtonView from './components/ButtonView'
import DebugView from './components/DebugView'
import InventoryView from './components/InventoryView'

import TextEngine from './engine/TextEngine'

export default {
  name: 'app',
  props: ['Story', 'Player'],
  components: {
    TextView,
    ButtonView,
    DebugView,
    InventoryView
  },

  computed: {
    scene () {
      return this.Story.screenData[this.Player.CurrentLocation]
    },
    /* eslint-disable brace-style */
    paragraphs () {
      const paragraphs = this.scene.paragraphs.concat(this.Player.additionalParagraphs)
      return paragraphs.map(paragraphObj => {
        // Case 1: paragraph is an object with a condition
        if (typeof paragraphObj.condition !== 'undefined') {
          const conditionType = typeof paragraphObj.condition()
          // Case 1-1: condition returns a string
          if (conditionType === 'string') {
            const conditionVal = paragraphObj.condition()
            // Case 1-1-1: returned string is the name of a paragraph
            if (typeof this.Story.textData[conditionVal] !== 'undefined') {
              return TextEngine(this.Story.textData[conditionVal])
            }
            // Case 1-1-2: returned string is just a simple paragraph
            else {
              return TextEngine({textContent () { return conditionVal }})
            }
          }
          // Case 1-2: condition returns an object
          else if (conditionType === 'object') {
            return TextEngine(paragraphObj.condition())
          }
          // Case 1-3: condition returns a boolean
          else if (conditionType === 'boolean') {
            return paragraphObj.condition() ? TextEngine(this.Story.textData[paragraphObj.name]) : undefined
          }
        }
        // Case 2: paragraph is an object with no condition
        else if (typeof paragraphObj === 'object') {
          return TextEngine(paragraphObj)
        }
        // Case 3: paragraph is a string
        else if (typeof paragraphObj === 'string') {
          // Case 3-1: string is the name of a paragraph
          if (typeof this.Story.textData[paragraphObj] !== 'undefined') {
            return TextEngine(this.Story.textData[paragraphObj])
          }
          // Case 3-2: returned string is just a simple paragraph
          else {
            return TextEngine({textContent () { return paragraphObj }})
          }
        }
      }, this).filter(paragraph => typeof paragraph !== 'undefined')
    },

    buttons () {
      const buttons = this.Player.buttonOverride.length > 0 ? this.Player.buttonOverride : this.scene.buttons
      const finalButtons = buttons.map(buttonObj => {
        // Case 1: button is an object with a condition
        if (typeof buttonObj.condition !== 'undefined') {
          const conditionType = typeof buttonObj.condition()
          // Case 1-1: button is an object with a condition that returns the name of a button
          if (conditionType === 'string') {
            return this.Story.buttonData[buttonObj.condition()] // Use the reference to return the button
          }
          // Case 1-2: button is an object with a condition that returns an actual button object (hopefully)
          else if (conditionType === 'object') {
            return buttonObj.condition() // Use the returned button itself
          }
          // Case 1-3: button is an object with a condition that returns a boolean
          else if (conditionType === 'boolean') {
            return buttonObj.condition() ? this.Story.buttonData[buttonObj.name] : undefined // Use the reference to the button if condition passes
          }
        }
        // Case 2: button is an object with no condition
        else if (typeof buttonObj === 'object') {
          return buttonObj // Use the object
        }
        // Case 3: button is a string
        else if (typeof buttonObj === 'string') {
          return this.Story.buttonData[buttonObj] // Use the reference to the object
        }
      }, this).filter(button => typeof button !== 'undefined')

      if (buttons._parent) {
        Object.defineProperty(finalButtons, '_parent', {value: buttons._parent})
      }

      return finalButtons
    }
  },

  methods: {
    replaceButtons (children, orig) {
      let newButtons = children
      if (!newButtons._parent) {
        Object.defineProperty(newButtons, '_parent', {value: orig})
      }
      this.Player.buttonOverride = newButtons
    }
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Inconsolata);
body, html {
  height: 100vh;
  margin: 0px;
  font-family: 'Inconsolata', monospace;
}

#app-container {
  box-sizing: border-box;
  padding: 50px;
}

.row-flex {
  flex-direction: row;
  display: flex;
}

.col-flex {
  flex-direction: column;
  display: flex;
}

.col-md-8 {
  flex-basis: 66.66%;
}

.col-md-7 {
  flex-basis: 58.33%;
}

.col-md-6 {
  flex-basis: 50%;
}

.col-md-4 {
  flex-basis: 33.33%
}

.col-md-3 {
  flex-basis: 25%;
}

.bordered-box {
  border: 1px solid red;
  box-sizing: border-box;
}

.full-height {
  height: 100%;
}
</style>
