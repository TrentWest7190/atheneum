<template>
  <div class="col-flex">
    <h2>Flags</h2>
    <div class="row-flex debug-row" v-for="(flag, flagName) in Player.State.flags">
      <span>{{ flagName }}</span>
      <input class="debug-input" v-if="typeof flag === 'string'" :value="flag"  @blur="updatePlayer('flags', flagName, $event.target.value)">
      <input class="debug-input" v-if="typeof flag === 'boolean'" type="checkbox" :checked="flag" @click="updatePlayer('flags', flagName, $event.target.checked)">
      <input class="debug-input" v-if="typeof flag === 'number'" type="number" :value="flag" @blur="updatePlayer('flags', flagName, $event.target.value, true)">
    </div>
    <h2>Inventory</h2>
    <div class="row-flex debug-row" v-for="(item, itemName) in Player.State.inventory">
      <span>{{ itemName }}</span>
      <input class="debug-input" type="number" :value="item" @blur="updatePlayer('inventory', itemName, $event.target.value, true)">
    </div>
    <h2>Stats</h2>
    <div class="row-flex debug-row" v-for="(stat, statName) in Player.State.stats">
      <span>{{ statName }}</span>
      <input class="debug-input" type="number" :value="stat._value" @blur="updatePlayer('stats', statName, $event.target.value, true)">
      <span>True: {{ stat.value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'debug-view',

  props: ['Player'],

  methods: {
    updatePlayer (attributeName, flagName, flagValue, isNumber) {
      if (attributeName !== 'stats') {
        this.Player.State[attributeName][flagName] = isNumber ? parseInt(flagValue) : flagValue
      } else {
        this.Player.State.stats[flagName]._value = parseInt(flagValue)
      }
    }
  }
}
</script>

<style>
.debug-input {
  width: 100px
}

.debug-row > * {
  flex-basis: 33%;
}
</style>
