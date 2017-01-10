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

  computed: {
    scene () {
      return this.Story.screenData[this.Player.CurrentLocation]
    },
    /* eslint-disable brace-style */
    paragraphs () {
      return TextEngine(this.scene.paragraphs, this.Story.textData, this.Player.additionalParagraphs)
    },

    buttons () {
      return ButtonEngine(this.scene.buttons, this.Story.buttonData, this.Player.buttonOverride)
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
