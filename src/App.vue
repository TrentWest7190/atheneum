<template>
  <div id="app-container" class="full-height row-flex">
    <div class="bordered-box full-height col-md-3">
      <debug-view class=" bordered-box full-height" :Player="Player"></debug-view>
    </div>
    <div class="bordered-box col-flex full-height col-md-6">
      <text-view class="bordered-box col-md-8" :textArray="paragraphs"></text-view>
      <button-view class="bordered-box col-md-4" :buttonArray="buttons" @doEvents="EventEngine.delegateEvents"></button-view>
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
import Player from './engine/Player'
import EventEngine from './engine/EventEngine'

export default {
  name: 'app',
  props: ['Story', 'Player'],
  components: {
    TextView,
    ButtonView,
    DebugView,
    InventoryView
  },

  data () {
    return {
      EventEngine: EventEngine
    }
  },

  computed: {
    paragraphs () {
      let paragraphs = this.Story.screenData[this.Player.CurrentLocation].paragraphs.concat(this.Player.additionalParagraphs)
      return paragraphs.map(paragraphObj => {
        if (typeof paragraphObj === 'string') {
          return TextEngine(this.Story.textData[paragraphObj])
        } else if (paragraphObj.condition(Player.State)) {
          return TextEngine(this.Story.textData[paragraphObj.name])
        }
      }, this).filter(paragraph => typeof paragraph !== 'undefined')
    },

    /* eslint-disable brace-style */
    buttons () {
      return this.Story.screenData[this.Player.CurrentLocation].buttons.map(buttonObj => {
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
      }, this)
    }
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Space+Mono);
body, html {
  height: 100vh;
  margin: 0px;
  font-family: 'Space Mono';
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
