// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Player from './engine/Player'

let Story = require('../static/debug.js')

for (let flag in Story.flagData) {
  Player.Functions.setFlag(flag, Story.flagData[flag])
}

for (let item in Story.itemData) {
  Player.Functions.getItem(item, typeof Story.itemData[item].initAmount !== 'undefined' ? Story.itemData[item].initAmount : 0)
}

for (let stat in Story.statData) {
  Player.Functions.setStat(stat, Story.statData[stat].defaultValue)
  Object.defineProperty(Player.State.stats[stat], '_onSet', {value: Story.statData[stat].onSet})
  Object.defineProperty(Player.State.stats[stat], '_onGet', {value: Story.statData[stat].onGet})
}

Player.Functions.movePlayer(Story.config.startScreenId)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App :Story="Story"></App>',
  components: { App },
  data: {
    Story: Story
  }
})
