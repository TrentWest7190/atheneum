import Vue from 'vue'

let Player = {
  State: {},
  Functions: {},
  _CurrentLocation: '',
  get  CurrentLocation () {
    return this._CurrentLocation
  },
  set CurrentLocation (value) {
    this.buttonOverride = []
    this.additionalParagraphs = []
    this.paragraphOverride = []
    this._CurrentLocation = value
  },
  additionalParagraphs: [],
  buttonOverride: [],
  paragarphOverride: [],
  currentEnemy: {},
  inCombat: false
}

Vue.set(Player.State, 'flags', {})
Vue.set(Player.State, 'inventory', {})
Vue.set(Player.State, 'stats', {})

Player.Setup = function (flagData, itemData, statData, moveTo) {
  for (let [key, value] of Object.entries(flagData)) {
    Vue.set(Player.State.flags, key, value)
  }

  for (let [key, value] of Object.entries(itemData)) {
    Vue.set(Player.State.inventory, key, value.initAmount || 0)
  }

  for (let [key, value] of Object.entries(statData)) {
    Vue.set(Player.State.stats, key, value)
  }

  Vue.set(Player, 'additionalParagraphs', [])
  Vue.set(Player, 'CurrentLocation', moveTo)
  Vue.set(Player, 'currentEnemy', {})
}

export default Player
