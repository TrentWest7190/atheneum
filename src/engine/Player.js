import Vue from 'vue'

let Player = {
  State: {},
  Functions: {},
  CurrentLocation: '',
  additionalParagraphs: []
}

Vue.set(Player.State, 'flags', {})
Vue.set(Player.State, 'inventory', {})
Vue.set(Player.State, 'stats', {})

Player.Functions.setFlag = function (flagName, flagValue) {
  Vue.set(Player.State.flags, flagName, flagValue)
}

Player.Functions.getItem = function (itemName, amount) {
  Vue.set(Player.State.inventory, itemName, amount)
}

Player.Functions.setStat = function (statName, statValue) {
  Vue.set(Player.State.stats, statName, {value: statValue})
}

Player.Functions.movePlayer = function (moveTo) {
  Vue.set(Player, 'additionalParagraphs', [])
  Vue.set(Player, 'CurrentLocation', moveTo)
}

export default Player
