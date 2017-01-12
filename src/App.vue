<template>
  <div v-if="launchScreen" id="launch-screen" class="full-height col-flex">
    <h1>{{Story.config.storyName}}</h1>
    <button id="start-button" @click="launchScreen = false">Start</button>
  </div>
  <div v-else id="app-container" class="full-height row-flex">
    <div class="bordered-box full-height col-md-3">
      <debug-view class=" bordered-box full-height game-panel padding-container" :Story="Story" :Player="Player"></debug-view>
    </div>
    <div class="bordered-box col-flex full-height col-md-6">
      <text-view class="bordered-box col-md-8 text-view game-panel" :textArray="paragraphs" :hasMoreParagraphs="Player.additionalParagraphs.length > 0"></text-view>
      <button-view v-if="buttons" class="bordered-box col-md-4" :buttonArray="buttons" :inCombat="inCombat" @replaceButtons="replaceButtons"></button-view>
      <input v-else class="bordered-box col-md-4 main-input" placeholder="Click here to type" @keyup.enter="scene.input.callback($event.target.value)">
    </div>
    <div class="bordered-box full-height col-md-3">
      <inventory-view class="bordered-box full-height game-panel" :Story="Story" :Player="Player"></inventory-view>
    </div>
  </div>
</template>

<script>
import TextView from './components/TextView'
import ButtonView from './components/ButtonView'
import DebugView from './components/DebugView'
import InventoryView from './components/InventoryView'

import TextEngine from './engine/TextEngine'
import ButtonEngine from './engine/ButtonEngine'

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
      launchScreen: true
    }
  },

  computed: {
    scene () {
      if (typeof this.Player.CurrentLocation === 'string') {
        return this.Story.screenData[this.Player.CurrentLocation]
      } else if (typeof this.Player.CurrentLocation === 'object') {
        return this.Player.CurrentLocation
      }
    },
    paragraphs () {
      return TextEngine(this.scene.paragraphs, this.Story.textData, this.Player.additionalParagraphs, this.Player.paragraphOverride)
    },

    buttons () {
      if (this.scene.buttons) {
        return ButtonEngine(this.scene.buttons, this.Story.buttonData, this.Player.buttonOverride)
      }
    },

    inCombat () {
      return this.Player.inCombat
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
