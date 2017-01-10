// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Player from './engine/Player'

let Story = require('./stories/thydungeon.js')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App :Story="Story" :Player="Player"></App>',
  components: { App },
  data: {
    Story: Story,
    Player: Player
  }
})
