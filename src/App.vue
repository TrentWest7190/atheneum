<template>
  <div id="app-container" class="full-height row-flex">
    <div class="bordered-box full-height col-md-3">
      <debug-view class=" bordered-box full-height" :Story="Story" :Player="Player"></debug-view>
    </div>
    <div class="bordered-box col-flex full-height col-md-6">
      <text-view class="bordered-box col-md-8 text-view" :textArray="paragraphs" :hasMoreParagraphs="Player.additionalParagraphs.length > 0"></text-view>
      <button-view v-if="buttons" class="bordered-box col-md-4" :buttonArray="buttons" :inCombat="inCombat" @replaceButtons="replaceButtons" @enemyTurn="enemyTurn" @clearAddtParas="Player.additionalParagraphs = []"></button-view>
      <input v-else class="bordered-box col-md-4 main-input" placeholder="Click here to type" @keyup.enter="scene.input.callback($event.target.value)">
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
import { randomNumberBetween, returnToTopLevelButtons } from './engine/StoryUtilities'

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
    paragraphs () {
      if (!this.inCombat) {
        return TextEngine(this.scene.paragraphs, this.Story.textData, this.Player.additionalParagraphs, this.Player.paragraphOverride)
      } else if (this.inCombat) {
        return TextEngine(this.Player.currentEnemy.mainText, this.Story.textData, this.Player.additionalParagraphs, this.Player.paragraphOverride)
      }
    },

    buttons () {
      if (!this.inCombat && this.scene.buttons) {
        return ButtonEngine(this.scene.buttons, this.Story.buttonData, this.Player.buttonOverride)
      } else if (this.inCombat) {
        return ButtonEngine(this.Story.combatData.buttons, this.Story.buttonData, this.Player.buttonOverride)
      }
    },

    inCombat () {
      return Object.keys(this.Player.currentEnemy).length !== 0
    }
  },

  methods: {
    replaceButtons (children, orig) {
      let newButtons = children
      if (!newButtons._parent) {
        Object.defineProperty(newButtons, '_parent', {value: orig})
      }
      this.Player.buttonOverride = newButtons
    },

    enemyTurn () {
      if (this.Player.currentEnemy.health <= 0) {
        this.Player.additionalParagraphs = this.Player.additionalParagraphs.concat(this.Player.currentEnemy.win.text)
        this.Player.buttonOverride = [{
          text: 'Next',
          events: this.Player.currentEnemy.win.events
        }]
      } else {
        returnToTopLevelButtons()
        const enemyAttacks = Object.keys(this.Player.currentEnemy.attacks)
        const selectedAttack = enemyAttacks[randomNumberBetween(0, enemyAttacks.length)]
        this.Player.currentEnemy.attacks[selectedAttack]()
        if (this.Story.combatData.loseState()) {
          this.Player.additionalParagraphs = this.Player.additionalParagraphs.concat(this.Player.currentEnemy.lose.text)
          this.Player.buttonOverride = [{
            text: 'Next',
            events: this.Player.currentEnemy.lose.events
          }]
        }
      }
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
  background-color: var(--primary1)
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
</style>
