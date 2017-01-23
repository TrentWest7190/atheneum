<template>
  <div v-if="launchScreen" id="launch-screen" class="full-height col-flex">
    <h1>{{storyName}}</h1>
    <button id="start-button" @click="launchScreen = false">Start</button>
  </div>
  <div v-else id="app-container" class="full-height row-flex">
    <button id="options-button" @click="showOptionModal = !showOptionModal">Options</button>
    <div class="bordered-box full-height col-md-3">
      <debug-view
        class=" bordered-box full-height game-panel padding-container"
        :Player="Player"
        :CurrentLocation="CurrentLocation"
        :debug="debug"
        @debugMove="loadLocation"
        @debug="debugFunction"></debug-view>
    </div>
    <div class="bordered-box col-flex full-height col-md-6">
      <text-view
        class="bordered-box col-md-8 text-view game-panel" 
        :textArray="DisplayedText" 
        :hasMoreParagraphs="AdditionalText.length > 0">
      </text-view>
      <button-view
        v-if="true" 
        class="bordered-box col-md-4" 
        :buttonArray="DisplayedButtons" 
        :inTree="TreeTraversal.length > 0" 
        @doEvent="doEvent" 
        @traverseUp="traverseUp"></button-view>
      <input
        v-else 
        class="bordered-box col-md-4 main-input" 
        placeholder="Click here to type" 
        @keyup.enter="scene.input.callback($event.target.value)">
    </div>
    <div class="bordered-box full-height col-md-3">
      <inventory-view class="bordered-box full-height game-panel" :Player="Player"></inventory-view>
    </div>
    <div id="option-modal" v-if="showOptionModal">
      <button @click="saveGame">Save Game</button>
      <button @click="loadGame">Load Game</button>
    </div>
  </div>
</template>

<script>
import TextView from './components/TextView'
import ButtonView from './components/ButtonView'
import DebugView from './components/DebugView'
import InventoryView from './components/InventoryView'

import _ from 'lodash'

const Story = require('./stories/debug/Story.js')

export default {
  name: 'app',
  components: {
    TextView,
    ButtonView,
    DebugView,
    InventoryView
  },

  data () {
    return {
      storyName: Story.storyName,
      launchScreen: false,
      Player: require('./stories/debug/Player.js'),
      CurrentLocation: {},
      AdditionalText: [],
      TreeTraversal: [],
      debug: {
        screenData: Story.screenData
      },
      showOptionModal: false
    }
  },

  computed: {
    DisplayedText () {
      return this.loadText(this.CurrentLocation.text)
    },
    DisplayedButtons () {
      return this.loadButtons(this.CurrentLocation.buttons)
    }
  },

  created () {
    this.loadLocation(Story.startScreen)
  },

  methods: {
    loadText (textToLoad) {
      let loadedText
      if (typeof textToLoad === 'function') {
        loadedText = textToLoad.call(this)
      } else {
        loadedText = textToLoad
      }
      return _.compact(loadedText.concat(this.AdditionalText).map(text => {
        return typeof text === 'function' ? text.call(this) : text
      }, this))
    },
    loadButtons (buttonsToLoad) {
      let returnArray = []
      if (typeof buttonsToLoad === 'function') {
        returnArray = buttonsToLoad.call(this)
      } else if (Array.isArray(buttonsToLoad)) {
        returnArray = buttonsToLoad
      }
      return _.compact(returnArray)
    },
    doEvent (events) {
      const returnButtons = events.call(this)
      if (Array.isArray(returnButtons)) {
        this.TreeTraversal.push(this.DisplayedButtons)
        this.CurrentLocation.buttons = () => {
          return returnButtons
        }
      } else if (typeof returnButtons === 'function') {
        this.TreeTraversal.push(this.DisplayedButtons)
        this.CurrentLocation.buttons = returnButtons
      }
    },
    loadLocation (location) {
      this.CurrentLocation = _.cloneDeep(location)
      this.AdditionalText = []
      this.TreeTraversal = []
    },
    traverseUp () {
      this.CurrentLocation.buttons = () => {
        return this.TreeTraversal.pop()
      }
    },
    debugFunction ({type, name, value, isNumber}) {
      if (type === 'inventory') {
        this.Player.Inventory[name].amount = parseInt(value)
      } else if (type === 'flags') {
        this.Player.Flags[name] = isNumber ? parseInt(value) : value
      } else if (type === 'stats') {
        this.Player.Stats[name]._value = parseInt(value)
      }
    },
    saveGame () {
      /* eslint-disable no-undef */
      localStorage.setItem('athenum_' + this.storyName + '_player', JSON.stringify(this.Player))
      localStorage.setItem('athenum_' + this.storyName + '_player', JSON.stringify(this.Player))
      // Window.localStorage.athenum[this.storyName].Player = this.Player
    },
    loadGame () {
      this.Player = JSON.parse(localStorage.getItem('athenum_' + this.storyName))
      /* eslint-enable no-undef */
    }
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Inconsolata);

:root {
  --darkest: #313638;
  --primary1: #424874;
  --primary2: #6BA292;
  --lighter: #E0DFD5;
  --lightest: #E8E9EB;
}

body, html {
  height: 100vh;
  margin: 0px;
  font-family: 'Inconsolata', monospace;
  color: var(--lightest);
  background-color: var(--primary1);
}

#options-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

#option-modal {
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  background-color: var(--lighter);
}

.main-input {
  color: var(--lightest);
  background-color: var(--primary1);
  font-size: 25px;
  font-family: 'Inconsolata', monospace;
}

#app-container {
  box-sizing: border-box;
  padding: 50px;
}

#start-button {
  font-family: 'Inconsolata', monospace;
  background-color: var(--primary2);
  border: none;
  width: 150px;
  height: 50px;
}

#launch-screen {
  justify-content: center;
  align-items: center;
}

.game-panel {
  background-color: var(--primary2);
  border-radius: 20px;
}

.text-view {
  overflow-y: auto;
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
  border: 1px solid var(--primary1);
  box-sizing: border-box;
}

.full-height {
  height: 100%;
}

.padding-container {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
