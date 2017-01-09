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
    this._CurrentLocation = value
  },
  additionalParagraphs: [],
  buttonOverride: []
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
  Vue.set(Player.State.stats[statName], 'value', statValue)
}

Player.Functions.setStatDirect = function (statName, statValue) {
  Vue.set(Player.State.stats[statName], '_value', statValue)
}

Player.Setup = function (flagData, itemData, statData, moveTo) {
  for (let [key, value] of Object.entries(flagData)) {
    Player.Functions.setFlag(key, value)
  }

  for (let [key, value] of Object.entries(itemData)) {
    Player.Functions.getItem(key, value.initAmount || 0)
  }

  for (let [key, value] of Object.entries(statData)) {
    Vue.set(Player.State.stats, key, value)
  }

  Vue.set(Player, 'additionalParagraphs', [])
  Vue.set(Player, 'CurrentLocation', moveTo)
}

export default Player
